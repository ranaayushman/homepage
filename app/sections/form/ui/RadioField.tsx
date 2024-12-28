"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useController, useFormContext } from "react-hook-form";
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
  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="relative space-y-2">
      <Label className="text-sm md:text-md">{label}</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className={cn("space-y-1", error && "text-red-500")}
      >
        {/* Add responsive grid classes */}
        <div className="grid grid-cols-1 sm:flex gap-4">
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
        </div>
      </RadioGroup>
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default RadioField;
