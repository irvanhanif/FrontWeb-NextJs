"use client";
import auth from "@/action/client/auth";
import ButtonSubmit from "@/components/form/buttonSubmit";
import InputForm from "@/components/form/inputForm";
import errorToast from "@/components/helper/errorToast";
import { getErrorValidate } from "@/components/helper/errorValidate";
import Auth from "@/components/layout/auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const navigate = useRouter();

  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const [isFocusPassword, setFocusPassword] = useState(false);
  const [isMoveInPassword, setMoveInPassword] = useState(false);

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);
  const [errorValidate, setErrorValidate] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    const formData = {
      emailOrUsername,
      password,
    };

    const { result, error } = await auth(formData, "login");

    if (error) {
      if (Array.isArray(error)) {
        setErrorValidate(error);
      } else {
        setErrorValidate([]);
        errorToast(error);
      }
    }
    setIsSubmit(false);
    if (result) navigate.push("/");
    // console.log(result);
  };

  return (
    <Auth
      titleForm={"Masuk sebagai Akun"}
      submitFunction={handleSubmit}>
      <InputForm
        label={"Alamat Email atau Nama User"}
        type={"text"}
        value={emailOrUsername}
        setValue={setEmailOrUsername}
        required={true}
        isInvalid={getErrorValidate("EmailOrUsername", errorValidate).isError}
        errorMessage={
          getErrorValidate("EmailOrUsername", errorValidate).errorMessage
        }
      />
      <div
        onMouseMove={() => setMoveInPassword(true)}
        onMouseOut={() => setMoveInPassword(false)}>
        <InputForm
          label={"Kata Sandi"}
          type={"password"}
          required={true}
          changeVisibility={isVisiblePassword}
          value={password}
          setValue={setPassword}
          setFocus={setFocusPassword}
          isInvalid={getErrorValidate("Password", errorValidate).isError}
          errorMessage={
            getErrorValidate("Password", errorValidate).errorMessage
          }
          endContent={
            ((password != "" && isMoveInPassword) || isFocusPassword) && (
              <button
                type="button"
                onClick={() => {
                  setVisiblePassword(!isVisiblePassword);
                }}
                aria-label="toggle password visibility">
                {isVisiblePassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )
          }
        />
      </div>
      <div className="justify-between flex flex-wrap gap-2">
        <div className="text-sm text-white flex items-center flex-wrap">
          Belum punya akun?
          <Link
            href={"/register"}
            className="mx-2 text-white/90 hover:text-white/50 underline">
            Klik ini
          </Link>
        </div>
        <ButtonSubmit isSubmit={isSubmit}>Masuk</ButtonSubmit>
      </div>
    </Auth>
  );
};

export default Login;
