// app/[lang]/login/components/log-in.tsx
"use client";

import { FC, useState } from "react";
import useDictionary from "@/app/hooks/useDictionary";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "@/app/actions";
import Input from "@/components/react-hook-form/input";
import { Button } from "@/app/ui/button";
import { Form } from "@/components/common";

/**
 * Declare react-hook-form type
 */
type FormDataProps = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const { d } = useDictionary();
  const [isMovingNext, setIsMovingNext] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormDataProps>();

  /**
   * Handle submit login
   */
  const onSubmit: SubmitHandler<FormDataProps> = (data) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);
    login(formData);

    setIsMovingNext(true);
  };

  return (
    <Form isMoveNext={isMovingNext}>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-3">
          <Input
            label={d("login.email")}
            placeholder={d("login.emailPlaceholder")}
            errors={errors}
            {...register("email", {
              required: d("errors.input"),
              maxLength: 128,
            })}
          />
        </div>
        <div className="mb-3">
          <Input
            label={d("login.password")}
            placeholder={d("login.passwordPlaceholder")}
            errors={errors}
            type="password"
            {...register("password", {
              required: d("errors.input"),
            })}
          />
        </div>
        <Button
          variant="primary"
          type="submit"
          label={d("login.loginBtn")}
          fullWidth
        />
        <Button
          variant="danger"
          type="button"
          label={d("login.backBtn")}
          fullWidth
        />
      </form>
    </Form>
  );
};

export default Login;
