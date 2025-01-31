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
import { Control, FieldValues, Path } from "react-hook-form";
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
  return (
    <FormField
      control={control}
      name={name} 
      render={({ field }) => (
        <FormItem className={cn(className.formItem)}>
          {label && (
            <label htmlFor={name} className="text-sm md:text-md text-black mb-1">
              {label}
            </label>
          )}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                className={cn(
                  "rounded-md border-gray-300 border-b h-12",
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
          <FormMessage className="text-sm text-red-500" />
        </FormItem>
      )}
    />
  );
}
