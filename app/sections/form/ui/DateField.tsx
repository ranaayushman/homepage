import { format, parse, isValid } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface DateFieldProps {
  label?: string;
  name: string;
  placeholder: string;
  className?: {
    container?: string;
    label?: string;
    button?: string;
    input?: string;
  };
}

export function DateField({
  label,
  name,
  placeholder,
  className = {},
}: DateFieldProps) {
  const { control, setValue } = useFormContext();
  const fieldValue = useWatch({ control, name });

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (fieldValue && inputValue === "") {
      setInputValue(format(fieldValue, "dd/MM/yyyy"));
    }
  }, [fieldValue, inputValue]);

  const handleDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      const parsedDate = parse(value, "dd/MM/yyyy", new Date());

      if (
        isValid(parsedDate) &&
        parsedDate <= new Date() &&
        parsedDate >= new Date("1900-01-01")
      ) {
        setValue(name, parsedDate);
      }
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", className.container)}>
          {label && (
            <label
              htmlFor={name}
              className={cn("text-md text-black", className.label)}
            >
              {label}
            </label>
          )}
          <div className="flex">
            <Input
              value={inputValue}
              onChange={handleDateInput}
              placeholder={placeholder}
              className={cn("rounded-r-none border-r-0 h-12", className.input)}
            />
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("rounded-l-none px-3 h-12", className.button)}
                  type="button"
                  onClick={() => setIsOpen(true)}
                >
                  <CalendarIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    if (date) {
                      setInputValue(format(date, "dd/MM/yyyy"));
                    }
                    setIsOpen(false);
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                  components={{
                    IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                    IconRight: () => <ChevronRight className="h-4 w-4" />,
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
