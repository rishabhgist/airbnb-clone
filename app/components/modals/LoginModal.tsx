"use client";
import axios from "axios";
import { signIn } from "next-auth/react";

import { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const loginModel = useLoginModal();
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { email: "", password: "" } });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModel.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  const toggle = useCallback(() => {
    loginModel.onClose();
    registerModal.onOpen();
  }, [loginModel, registerModal]);

  const bodyContent = (
    <div className=" flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to you account!"
      />
      <Input
        register={register}
        id="email"
        label="Email"
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        register={register}
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>First time using Airbnb?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModel.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
