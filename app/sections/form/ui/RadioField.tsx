"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioFieldProps {
  name: string;
  label: string;
  options: RadioOption[];
}

const RadioField: React.FC<RadioFieldProps> = ({ name, label, options }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="relative space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <RadioGroup
        {...register(name)}
        className={cn("space-y-1", error && "text-red-500")}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
              className={cn(error && "border-red-500 text-red-500")}
            />
            <Label
              htmlFor={`${name}-${option.value}`}
              className={cn("text-sm font-normal", error && "text-red-500")}
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default RadioField;
