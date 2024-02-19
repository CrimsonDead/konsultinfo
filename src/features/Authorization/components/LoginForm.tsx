"use client";

import React, { FC, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ILoginAdmin } from "../types";
import { AuthService } from "@/services/auth";
import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { IoEyeOutline } from "react-icons/io5";
import { loginFields } from "../constants/loginFormConstants";

export const LoginForm: FC = () => {
  const {
    handleSubmit,
    formState: { isValid },
    reset,
    control,
  } = useForm<ILoginAdmin>({ mode: "onChange" });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ILoginAdmin> = async (data) => {
    console.log({ data });
    const { email: userName, password } = data;
    if (!userName || !password) return;
    await AuthService.login({
      userName,
      password,
      onSuccess: () => router.push(ROUTES.ADMIN),
      onFailed: (details) => setErrorMessage(details),
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 shrink">
      {errorMessage && (
        <div className="mt-1 block text-red-500">Неверный логин или пароль</div>
      )}
      {loginFields.map((fieldData) => (
        <Controller
          key={fieldData.id}
          control={control}
          name={fieldData.name as "email" | "password"}
          // rules={fieldData.rules}
          render={({ field, fieldState: { error } }) => (
            <div className="mb-4">
              <label
                htmlFor={fieldData.id}
                className="mb-2 block text-base/normal font-semibold text-black/60"
              >
                {fieldData.title}
              </label>
              {fieldData.type !== "password" && (
                <input
                  className="form-password block w-full rounded-s border border-black/10 bg-transparent px-4 py-2.5 text-black/60 focus:border-black/25 focus:ring-transparent"
                  type={fieldData.type}
                  {...field}
                  id={fieldData.id}
                  placeholder={fieldData.placeholder}
                />
              )}
              {fieldData.type === "password" && (
                <div className="flex">
                  <input
                    className="form-password block w-full rounded-s border border-black/10 bg-transparent px-4 py-2.5 text-black/60 focus:border-black/25 focus:ring-transparent"
                    type={isPasswordVisible ? "text" : "password"}
                    {...field}
                    id={fieldData.id}
                    placeholder={fieldData.placeholder}
                  />
                  <button
                    type="button"
                    id="password-addon"
                    className="password-toggle -ms-px inline-flex items-center justify-center rounded-e border border-black/10 bg-transparent px-4 py-2.5"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <IoEyeOutline size={24} />
                  </button>
                </div>
              )}
              {error && (
                <div className="mt-1 block text-red-500">{error.message}</div>
              )}
            </div>
          )}
        />
      ))}
      <div className="mb-6 text-center">
        <button
          type="submit"
          className="group mt-5 inline-flex w-full items-center justify-center rounded bg-blue-600 px-6 py-2.5 text-white backdrop-blur-2xl transition-all duration-500 hover:bg-blue-400 hover:text-white"
          disabled={false}
        >
          Войти
        </button>
      </div>
    </form>
  );
};
