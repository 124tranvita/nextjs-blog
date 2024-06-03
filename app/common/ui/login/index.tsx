// app/[lang]/login/components/log-in.tsx
"use client";

import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams, redirect } from "next/navigation";
import { login } from "@/actions";
import useDictionary from "@/app/common/hooks/useDictionary";
import useLoader from "@/app/common/hooks/useLoader";
import useToastMsg from "@/app/common/hooks/useToastMsg";
import { Button } from "../../components/common/button";
import { Container, Form } from "../../components/common/container";
import Input from "../../components/react-hook-form/input";

/**
 * Declare react-hook-form type
 */
type FormDataProps = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const { d } = useDictionary();
  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToastMsg();
  const searchParams = useSearchParams();
  const prevLink = searchParams.get("prev");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormDataProps>();

  const [response, setResponse] = useState<any>(null);

  /**
   * Handle submit login
   */
  const onSubmit: SubmitHandler<FormDataProps> = async (data) => {
    showLoader(d("loader.authentication"));

    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await login(formData, prevLink);

    setResponse(result);
  };

  /** Handle check response from Api */
  useEffect(() => {
    if (response) {
      hideLoader();
      // If api return errors
      if (response.error) {
        showToast("error", response.error);
        return;
      }

      showToast("success", d("login.successs"));
      redirect("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

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
