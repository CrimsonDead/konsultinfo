enum loginEnum {
  FULL_NAME_TITLE = 'ФИО',
  FULL_NAME_TYPE = 'text',
  FULL_NAME_NAME = 'fullName',
  FULL_NAME_ID = 'fullNameId',
  FULL_NAME_PLACEHOLDER = 'Введите ФИО',
  PHONE_TITLE = 'Номер телефона',
  PHONE_TYPE = 'text',
  PHONE_NAME = 'phoneNumber',
  PHONE_PLACEHOLDER = 'Введите номер телефона',
  PHONE_ID = 'phoneId',
}

export const loginFields = [
  {
    title: loginEnum.FULL_NAME_TITLE,
    type: loginEnum.FULL_NAME_TYPE,
    placeholder: loginEnum.FULL_NAME_PLACEHOLDER,
    name: loginEnum.FULL_NAME_NAME,
    id: loginEnum.FULL_NAME_ID,
    rules: {
      required: 'ФИО не должно быть пустым',
      minLength: {
        value: 4,
        message: 'ФИО не может содержать менее 4 символов',
      },
    },
  },
  {
    title: loginEnum.PHONE_TITLE,
    type: loginEnum.PHONE_TYPE,
    placeholder: loginEnum.PHONE_PLACEHOLDER,
    name: loginEnum.PHONE_NAME,
    id: loginEnum.PHONE_ID,
    rules: {
      required: 'Поле с номером телефона не должно быть пустым',
      rules: {
        required: 'Номер телефона должен присутствовать',
        pattern: {
          message: 'Номер должен быть настоящим',
          value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        },
      },
    },
  },
];
