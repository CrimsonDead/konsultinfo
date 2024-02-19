enum contactEnum {
  FIRST_NAME_TYPE = 'text',
  FIRST_NAME_NAME = 'firstName',
  FIRST_NAME_ID = 'firstNameId',
  FIRST_NAME_PLACEHOLDER = 'Имя',
  MIDDLE_NAME_TYPE = 'text',
  MIDDLE_NAME_NAME = 'middleName',
  MIDDLE_NAME_ID = 'middleNameId',
  MIDDLE_NAME_PLACEHOLDER = 'Отчество',
  LAST_NAME_TYPE = 'text',
  LAST_NAME_NAME = 'lastName',
  LAST_NAME_ID = 'lastNameId',
  LAST_NAME_PLACEHOLDER = 'Фамилия',
  PHONE_TYPE = 'text',
  PHONE_NAME = 'phone',
  PHONE_PLACEHOLDER = 'Телефон',
  PHONE_ID = 'phoneId',
  COMMENT_TYPE = 'textArea',
  COMMENT_NAME = 'issue',
  COMMENT_PLACEHOLDER = 'Ваша проблема',
  COMMENT_ID = 'issueId',
}

export const contactInputFields = [
  {
    type: contactEnum.FIRST_NAME_TYPE,
    placeholder: contactEnum.FIRST_NAME_PLACEHOLDER,
    name: contactEnum.FIRST_NAME_NAME,
    id: contactEnum.FIRST_NAME_ID,
    rules: {
      required: 'Фамилия не должно быть пустым',
    },
  },
  {
    type: contactEnum.LAST_NAME_TYPE,
    placeholder: contactEnum.LAST_NAME_PLACEHOLDER,
    name: contactEnum.LAST_NAME_NAME,
    id: contactEnum.LAST_NAME_ID,
    rules: {
      required: 'Отчество не должно быть пустым',
    },
  },
  {
    type: contactEnum.MIDDLE_NAME_TYPE,
    placeholder: contactEnum.MIDDLE_NAME_PLACEHOLDER,
    name: contactEnum.MIDDLE_NAME_NAME,
    id: contactEnum.MIDDLE_NAME_ID,
    rules: {
      required: 'Имя не должно быть пустым',
    },
  },
  {
    type: contactEnum.PHONE_TYPE,
    placeholder: contactEnum.PHONE_PLACEHOLDER,
    name: contactEnum.PHONE_NAME,
    id: contactEnum.PHONE_ID,
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

export const contactTeaxtAreaFields = [
  {
    type: contactEnum.COMMENT_TYPE,
    placeholder: contactEnum.COMMENT_PLACEHOLDER,
    name: contactEnum.COMMENT_NAME,
    id: contactEnum.COMMENT_ID,
    rules: {},
  },
];
