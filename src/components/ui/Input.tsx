import { useState } from "react";
import type { ChangeEvent, FocusEvent, InputHTMLAttributes } from "react";

export default function Input({
  className = "",
  onBlur,
  onChange,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const [validation, setValidation] = useState<"untouched" | "valid" | "invalid">("untouched");
  const updateValidation = (event: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) => {
    setValidation(event.currentTarget.checkValidity() ? "valid" : "invalid");
  };

  return (
    <input
      {...props}
      onChange={(event) => {
        if (event.currentTarget.value || validation !== "untouched") {
          updateValidation(event);
        }
        onChange?.(event);
      }}
      onBlur={(event) => {
        updateValidation(event);
        onBlur?.(event);
      }}
      className={`w-full rounded-[14px] border bg-white px-3 py-2 text-sm text-ink outline-none placeholder:text-slate-400 transition-colors duration-200 hover:border-slate-300 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-soft disabled:text-muted ${
        validation === "invalid"
          ? "border-red-500 focus:border-red-500 focus:ring-red-100"
          : validation === "valid"
            ? "border-webzark focus:border-webzark focus:ring-blue-100"
            : "border-slate-200 focus:border-webzark focus:ring-blue-100"
      } ${className}`}
    />
  );
}