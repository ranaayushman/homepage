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
    <div className="space-y-2">
      <Input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={cn(
          "focus:ring-2 focus:ring-green-500",
          error && "border-red-500 focus:ring-red-500"
        )}
      />
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
