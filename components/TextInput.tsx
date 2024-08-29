import { ReactNode } from "react";
import clsx from "clsx";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { Input, Spinner, Tooltip } from "@nextui-org/react";

type TextInputProps = {
  label: string;
  input: string;
  placeholder: string;
  onSubmit: () => void;
  setInput: (value: string) => void;
  loading?: boolean;
  disabled?: boolean;
  endContent?: ReactNode;
};

export function TextInput({
  label,
  input,
  onSubmit,
  setInput,
  endContent,
  placeholder,
  loading = false,
  disabled = false,
}: TextInputProps) {
  return (
    <Input
      size="sm"
      label={label}
      value={input}
      isDisabled={disabled}
      onValueChange={setInput}
      placeholder={placeholder}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSubmit();
        }
      }}
      endContent={
        <div className="flex flex-row items-center h-full">
          {endContent}
          <Tooltip content="Send message">
            {loading ? (
              <Spinner size="sm" />
            ) : (
              <button
                type="submit"
                className="focus:outline-none"
                onClick={onSubmit}
                disabled={disabled}
              >
                <PaperPlaneRight
                  className={clsx("text-default-500", disabled && "opacity-50")}
                  size={24}
                />
              </button>
            )}
          </Tooltip>
        </div>
      }
    />
  );
}
