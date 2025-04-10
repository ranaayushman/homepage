"use client";

import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FileUploadFieldProps {
  name: string;
  placeholder: string;
  label?: string;
}

export function FileUploadField({
  name,
  placeholder,
  label,
}: FileUploadFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

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

  const error = getNestedError(name);

  const handleFileChange = (file: File | undefined) => {
    if (file) {
      setFileName(file.name);

      // Generate preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setFileName("");
      setPreview(null);
    }
  };

  const handleRemove = (onChange: (value: File | null) => void) => {
    setFileName("");
    setPreview(null);
    onChange(null);

    // Reset the input value
    const fileInput = document.querySelector(
      `input[name="${name}"]`
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  handleFileChange(file);
                  if (file) onChange(file);
                }}
                className="opacity-0 h-12 cursor-pointer"
              />
              <div
                className={`absolute inset-0 flex border rounded-md ${
                  error ? "border-red-500" : "border-slate-600"
                } items-center justify-between px-3 pointer-events-none`}
              >
                <span
                  className={`text-xs ${
                    error ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {fileName || placeholder}
                </span>
                <div className="flex items-center gap-2">
                  {fileName && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="pointer-events-auto h-8 w-8 p-0"
                      onClick={() => handleRemove(onChange)}
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </Button>
                  )}
                  <Upload
                    className={`h-5 w-5 ${
                      error ? "text-red-500" : "text-gray-500"
                    }`}
                  />
                </div>
              </div>
            </div>
          </FormControl>
          {preview && (
            <div className="mt-4 flex justify-center">
              <Image
                src={preview}
                alt="File preview"
                className="max-h-48 rounded-md object-contain"
                height={98}
                width={98}
              />
            </div>
          )}
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </FormItem>
      )}
    />
  );
}
