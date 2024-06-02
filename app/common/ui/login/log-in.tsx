// app/[lang]/login/components/log-in.tsx
"use client";

import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { login } from "@/actions";
import useDictionary from "@/app/common/hooks/useDictionary";
import { Button } from "../../components/common/button";
import { Container, Form } from "../../components/common/container";
import Input from "../../components/react-hook-form/input";
import useLoader from "@/app/common/hooks/useLoader";

/**
 * Declare react-hook-form type
 */
type FormDataProps = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const { d } = useDictionary();
  const { showLoader } = useLoader();
  const searchParams = useSearchParams();
  const prevLink = searchParams.get("prev");
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

    login(formData, prevLink);
    showLoader(d("loader.processing"));
  };

  return (
    <Container>
      <Form>
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
    </Container>
  );
};

export default Login;
