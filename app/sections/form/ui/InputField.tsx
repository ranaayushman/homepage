"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface InputFieldProps {
  label?: string;
  name: string;
  placeholder: string;
  type?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  className,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="relative space-y-2">
      {label && (
        <label htmlFor={name} className="text-md text-black">
          {label}
        </label>
      )}
      <Input
        {...register(name)}
        type={type}
        placeholder={error ? (error as string) : placeholder}
        className={cn(
          "border rounded-md h-12 bg-transparent px-0 p-2 focus:border-green-500 focus:ring-0 placeholder:text-sm",
          error &&
            "border-red-500 focus:border-red-500 placeholder:text-red-500",
          className
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
