"use client";
import { Button, Spinner } from "@nextui-org/react";
import React from "react";

const ButtonSubmit = ({ children, isSubmit }) => {
  return (
    <div className="flex flex-grow justify-end">
      <Button
        type="submit"
        className="bg-[#275090] text-white hover:shadow-md hover:shadow-[#00BD00] hover:opacity-100 px-2">
        {isSubmit ? (
          <div className="flex items-center">
            <Spinner />
            <p className="pl-1">Processing..</p>
          </div>
        ) : (
          children
        )}
      </Button>
    </div>
  );
};

export default ButtonSubmit;
