import React, { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { IContactsForm } from '../../types';
import { contactInputFields, contactTeaxtAreaFields } from '../../constants';
import { formatDefaultMassage } from '@/utils';
import { AuthService } from '@/services/auth';

export const ContactsForm: FC = () => {
  const {
    handleSubmit,
    formState: { isValid },
    reset,
    control,
  } = useForm<IContactsForm>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IContactsForm> = async (data) => {
    const messageText = formatDefaultMassage({
      ...data,
    });
    await AuthService.registerUser({
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      phone: data.phone,
      message: messageText,
    });
    reset();
  };

  return (
    <form
      className="flex mt-[30px] flex-col"
      onSubmit={handleSubmit(onSubmit)}>
      <ul className="flex list-none flex-col md:flex-row">
        <li>
          {contactInputFields.map((fieldData) => (
            <Controller
              key={fieldData.id}
              control={control}
              name={
                fieldData.name as
                  | 'firstName'
                  | 'middleName'
                  | 'lastName'
                  | 'phone'
              }
              rules={fieldData.rules}
              render={({ field, fieldState: { error } }) => (
                <div className="mb-2">
                  <input
                    className="form-password focus:outline-none bg-white block w-[212px] bg-transparent px-4 py-1 text-black/60 focus:border-black/25"
                    type={fieldData.type}
                    {...field}
                    id={fieldData.id}
                    placeholder={fieldData.placeholder}
                  />
                  {error && (
                    <div className="mt-1 block text-red-500">
                      {error.message}
                    </div>
                  )}
                </div>
              )}
            />
          ))}
        </li>
        <li className="flex">
          {contactTeaxtAreaFields.map((fieldData) => (
            <Controller
              key={fieldData.id}
              control={control}
              name={fieldData.name as 'issue'}
              rules={fieldData.rules}
              render={({ field, fieldState: { error } }) => (
                <div className="md:ml-2">
                  <textarea
                    className="form-password focus:outline-none resize-none rounded-none block h-[152px] bg-white w-[212px] md:w-full bg-transparent px-4 py-2.5 text-black/60 focus:border-black/25 focus:ring-transparent"
                    {...field}
                    id={fieldData.id}
                    placeholder={fieldData.placeholder}
                  />
                  {error && (
                    <div className="mt-1 block text-red-500">
                      {error.message}
                    </div>
                  )}
                </div>
              )}
            />
          ))}
        </li>
      </ul>
      <button
        disabled={!isValid}
        type="submit"
        className="rounded-none border-[1px] mt-[5px] border-gray-400 p-[4px] bg-[bisque] w-[150px] md:ml-[293px]">
        Отправить
      </button>
    </form>
  );
};
