import Image from "next/image";
import React from "react";

import bgImage from "../../assets/auth/Background Auth Page.jpg";

const Auth = ({ children, titleForm, submitFunction }) => {
  return (
    <>
      <Image
        src={bgImage}
        className="object-cover object-center h-screen w-screen"
        alt="Background Auth Page"
      />
      <div className="absolute top-0 h-screen w-screen">
        <div className="flex justify-center items-center h-full w-full">
          <div className="max-w-screen-xl w-full h-full">
            <div className="h-full w-full flex items-center justify-center">
              <form
                className={`${
                  titleForm == "Daftar Akun" ? "lg:w-3/5" : "lg:w-1/3"
                } md:w-1/2 sm:w-full sm:mx-5 bg-transparent py-7 px-5 rounded-2xl gap-3 flex flex-col backdrop-blur-md shadow-sm shadow-white transition ease-in-out duration-200`}
                onSubmit={submitFunction}>
                <h2 className="text-white text-2xl text-center mt-3 mb-5 font-semibold">
                  {titleForm}
                </h2>
                {children}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
