"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

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
    <div className="relative space-y-2">
      <div className="relative">
        <Input
          {...register(name)}
          type={type}
          placeholder={error ? (error as string) : placeholder}
          className={cn(
            "border-0 border-b-2 rounded-none border-gray-700 h-12 bg-transparent px-0 py-2 focus:border-green-500 focus:ring-0 placeholder:text-sm",
            error &&
              "border-red-500 focus:border-red-500 placeholder:text-red-500"
          )}
        />
      </div>
    </div>
  );
};

export default InputField;
