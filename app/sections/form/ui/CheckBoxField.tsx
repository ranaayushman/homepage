// CheckboxField.tsx
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CheckboxFieldProps {
  name: string;
  label: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const CheckboxField = ({
  name,
  label,
  description,
  disabled = false,
  required = false,
  className = "",
}: CheckboxFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div className={cn("space-y-2", className)}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="flex items-start space-x-3">
            <Checkbox
              id={name}
              checked={value}
              disabled={disabled}
              onCheckedChange={onChange}
              className={cn("mt-1", error && "border-red-500")}
            />
            <div className="space-y-1">
              <Label
                htmlFor={name}
                className={cn(
                  "text-sm font-medium leading-none",
                  disabled && "cursor-not-allowed opacity-70",
                  error && "text-red-500"
                )}
              >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {description && (
                <p className="text-sm text-gray-500">{description}</p>
              )}
              {error && (
                <p className="text-sm font-medium text-red-500">
                  {error.message?.toString()}
                </p>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CheckboxField;
