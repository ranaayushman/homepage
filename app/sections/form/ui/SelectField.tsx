"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues, Path, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>; // Ensure name is a valid path in the form schema
  placeholder: string;
  options: Option[];
  label?: string;
  control?: Control<T>; // Strongly type the control prop
  className?: {
    trigger?: string;
    content?: string;
    item?: string;
    formItem?: string;
  };
}

export function SelectField<T extends FieldValues>({
  name,
  placeholder,
  options,
  label,
  control,
  className = {},
}: SelectFieldProps<T>) {
  const formContext = useFormContext<T>();
  const formControl = control || formContext.control;
  const {
    formState: { errors },
  } = formContext;

  // Function to get nested errors from dot notation path
  const getNestedError = (path: string) => {
    const parts = path.split(".");
    let current: any = errors;

    for (const part of parts) {
      if (!current || !current[part]) return undefined;
      current = current[part];
    }

    return current.message;
  };

  const error = getNestedError(name as string);

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className.formItem)}>
          {label && (
            <label
              htmlFor={name as string}
              className="text-sm md:text-md text-black mb-1"
            >
              {label}
            </label>
          )}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                className={cn(
                  "rounded-md border-gray-300 border-b h-12",
                  error && "border-red-500 ring-red-500",
                  className.trigger
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className={cn(className.content)}>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className={cn(className.item)}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          <FormMessage className="text-sm text-red-500" />
        </FormItem>
      )}
    />
  );
}
