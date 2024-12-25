import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface FileUploadFieldProps {
  name: string;
  placeholder: string;
}

export function FileUploadField({ name, placeholder }: FileUploadFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <FormItem>
          <FormControl>
            <Input
              type="file"
              placeholder={placeholder}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onChange(file);
              }}
              className="rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </FormControl>
          <FormMessage className="text-sm text-red-500" />
        </FormItem>
      )}
    />
  );
}
