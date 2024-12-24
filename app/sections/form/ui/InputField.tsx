"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

interface InputFieldProps {
  name: string;
  placeholder: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  type = "text",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="mb-4">
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`w-full text-base p-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded focus:outline-none focus:ring-1 focus:ring-[#98B14F]`}
      />
      <div className="h-5">
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default InputField;
