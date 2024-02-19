enum loginEnum {
  EMAIL_TITLE = 'Email',
  EMAIL_TYPE_OR_NAME = 'email',
  EMAIL_PLACEHOLDER = 'Введите email',
  EMAIL_ID = 'emailId',
  PASSWORD_TITLE = 'Пароль',
  PASSWORD_TYPE_OR_NAME = 'password',
  PASSWORD_PLACEHOLDER = 'Введите пароль',
  PASSWORD_ID = 'passwordId',
}

export const loginFields = [
  {
    title: loginEnum.EMAIL_TITLE,
    type: 'string',
    placeholder: loginEnum.EMAIL_PLACEHOLDER,
    name: loginEnum.EMAIL_TYPE_OR_NAME,
    id: loginEnum.EMAIL_ID,
    rules: {
      required: 'Email не должен быть пустым',
      pattern: { message: 'Email должен быть настоящим', value: /^\S+@\S+$/i },
    },
  },
  {
    title: loginEnum.PASSWORD_TITLE,
    type: loginEnum.PASSWORD_TYPE_OR_NAME,
    placeholder: loginEnum.PASSWORD_PLACEHOLDER,
    name: loginEnum.PASSWORD_TYPE_OR_NAME,
    id: loginEnum.PASSWORD_ID,
    rules: {
      required: 'Поле пароля не должно быть пустым',
      minLength: {
        value: 4,
        message: 'Пароль должен содержать не менее 4 символов',
      },
    },
  },
];
