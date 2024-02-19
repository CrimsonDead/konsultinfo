import { AuthService } from './auth';

function RedirectToLogin() {
  AuthService.redirect(process.env.LOGIN_URL);
}

// TODO: rewrite this any type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function updateOptions(options: any, authEnabled: boolean) {
  if (!authEnabled) return options;
  const updatedOptions = {
    ...options,
  };
  if (!AuthService.hasRefreshToken()) {
    RedirectToLogin();
  }
  if (!AuthService.getAccessToken()) {
    await AuthService.refreshTokens();
  }
  updatedOptions.headers = {
    ...(updatedOptions.headers as object),
    Authorization: AuthService.getAccessToken(),
  };
  return updatedOptions;
}

async function fetchWithWrapper(url: string, options = {}, authEnabled = true) {
  const opts = await updateOptions(options, authEnabled);
  const headers = {
    'Content-Type': 'application/json',
    ...opts.headers,
  };
  return fetch(url, { ...opts, headers }).then((response) => response);
}

function createRequest(type: string, authEnabled: boolean = true) {
  return async (url: string, data = {}, options = {}, extraData: { [key: string]: unknown } = {}) => {
    const opts = await updateOptions(options, authEnabled);

    const isFormData = extraData?.isFormData ?? false;

    return fetch(url, {
      ...opts,
      method: type,
      body: isFormData ? data : JSON.stringify(data),
      headers: {
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...opts.headers,
      },
    }).then((response) => response);
  };
}

fetchWithWrapper.post = createRequest('POST');
fetchWithWrapper.delete = createRequest('DELETE');
fetchWithWrapper.put = createRequest('PUT');
fetchWithWrapper.patch = createRequest('PATCH');
fetchWithWrapper.regUser = createRequest('POST', false);

export default fetchWithWrapper;
