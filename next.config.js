/** @type {import('next').NextConfig} */
const nextConfig = () => {
  const isDev = process.env.ENV === 'dev';

  const env = {
    ENV: (() => {
      if (isDev) return 'dev';
      // throw new Error('ENV not configured');
    })(),
    IS_DEV: isDev,
    DEFAULT_DOMAIN: (() => process.env.DEFAULT_DOMAIN)(),
    LOGIN_URL: (() => '/login')(),
    API_URL: 'http://crimssondead-001-site4.ftempurl.com/api',
  };

  return {
    env,
    publicRuntimeConfig: {
      ...env,
    },
  };
};

module.exports = nextConfig;
