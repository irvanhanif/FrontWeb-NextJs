"use client";
import auth from "@/action/client/auth";
import ButtonSubmit from "@/components/form/buttonSubmit";
import InputForm from "@/components/form/inputForm";
import { inputClassNames } from "@/components/form/styleInput";
import errorToast from "@/components/helper/errorToast";
import { getErrorValidate } from "@/components/helper/errorValidate";
import Auth from "@/components/layout/auth";
import { DatePicker, Select, SelectItem } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const navigate = useRouter();

  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const [isFocusPassword, setFocusPassword] = useState(false);
  const [isMoveInPassword, setMoveInPassword] = useState(false);

  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [born, setBorn] = useState(null);
  const [gender, setGender] = useState(null);

  const [errorValidate, setErrorValidate] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password == confirmPassword && password != "") {
      setIsSubmit(true);

      let bornToDate;
      if (born != null) {
        bornToDate = new Date(
          born.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone)
        );

        bornToDate = moment(bornToDate).format("YYYY-MM-DD");
      }

      const formData = {
        fullname,
        username,
        email,
        password,
        born: bornToDate,
        gender,
      };

      const { result, error } = await auth(formData, "register");
      if (Array.isArray(error)) {
        setErrorValidate(error);
      } else {
        setErrorValidate([]);
        errorToast(error);
      }

      setIsSubmit(false);
      if (result) navigate.push("/");
    } else {
      if (password !== confirmPassword)
        setErrorValidate([
          { field: "ConfirmPassword", message: "Kata sandi tidak sama" },
        ]);
      else
        setErrorValidate([
          { field: "Password", message: "Kolom ini wajib diisi" },
          { field: "ConfirmPassword", message: "Kolom ini wajib diisi" },
        ]);
    }
  };

  return (
    <Auth
      titleForm={"Daftar Akun"}
      submitFunction={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1">
          <InputForm
            label={"Nama Lengkap"}
            type={"text"}
            value={fullname}
            setValue={setFullName}
            labelPlace={"outside"}
            placeholder={true}
            isInvalid={getErrorValidate("Fullname", errorValidate).isError}
            errorMessage={
              getErrorValidate("Fullname", errorValidate).errorMessage
            }
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <InputForm
              label={"Nama User"}
              type={"text"}
              value={username}
              setValue={setUsername}
              description={"Nama harus unik dan tidak dipisah spasi"}
              labelPlace={"outside"}
              placeholder={true}
              isInvalid={getErrorValidate("Username", errorValidate).isError}
              errorMessage={
                getErrorValidate("Username", errorValidate).errorMessage
              }
              required
            />
          </div>
          <div>
            <InputForm
              label={"Alamat Email"}
              type={"text"}
              value={email}
              setValue={setEmail}
              labelPlace={"outside"}
              placeholder={true}
              isInvalid={getErrorValidate("Email", errorValidate).isError}
              errorMessage={
                getErrorValidate("Email", errorValidate).errorMessage
              }
              required
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div
          onMouseMove={() => setMoveInPassword(true)}
          onMouseOut={() => setMoveInPassword(false)}>
          <InputForm
            label={"Kata Sandi"}
            type={"password"}
            required
            changeVisibility={isVisiblePassword}
            labelPlace={"outside"}
            placeholder={true}
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
        <div>
          <InputForm
            label={"Kata Sandi (Ketik ulang)"}
            type={"password"}
            labelPlace={"outside"}
            placeholder={"Masukkan Kata Sandi"}
            value={confirmPassword}
            setValue={setConfirmPassword}
            isInvalid={
              getErrorValidate("ConfirmPassword", errorValidate).isError
            }
            errorMessage={
              getErrorValidate("ConfirmPassword", errorValidate).errorMessage
            }
            required
          />
        </div>
        <div>
          <DatePicker
            showMonthAndYearPickers
            label="Tanggal Lahir"
            placeholder="Masukkan Tanggal Lahir"
            labelPlacement="outside"
            dateInputClassNames={inputClassNames}
            onChange={(e) => setBorn(e)}
            value={born}
            isInvalid={getErrorValidate("Born", errorValidate).isError}
            errorMessage={getErrorValidate("Born", errorValidate).errorMessage}
          />
        </div>
        <div>
          <Select
            label="Jenis Kelamin"
            placeholder="Pilih Jenis Kelamin"
            labelPlacement={"outside"}
            className="text-default-100"
            classNames={inputClassNames}
            onChange={(e) => setGender(e.target.value)}
            selectedKeys={[gender]}
            isInvalid={getErrorValidate("Gender", errorValidate).isError}
            errorMessage={
              getErrorValidate("Gender", errorValidate).errorMessage
            }>
            <SelectItem key={false}>Perempuan</SelectItem>
            <SelectItem key={true}>Laki-laki</SelectItem>
          </Select>
        </div>
      </div>
      <div className="justify-between flex flex-wrap gap-2">
        <div className="text-sm text-white flex items-center flex-wrap">
          Sudah memiliki akun?
          <Link
            href={"/login"}
            className="mx-2 text-white/90 hover:text-[#00BD00] hover:drop-shadow-md hover:shadow-white underline">
            Klik ini
          </Link>
        </div>
        <ButtonSubmit isSubmit={isSubmit}>Daftar</ButtonSubmit>
      </div>
    </Auth>
  );
};

export default Register;
