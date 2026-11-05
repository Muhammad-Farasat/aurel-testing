import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { Icon } from "../Icon";
import "./form.css";

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p className="field__error t-small" id={`${id}-error`}>
      <Icon name="error" size={18} />
      <span>{message}</span>
    </p>
  );
}

export function describedBy(id: string, error?: string, helper?: ReactNode): string | undefined {
  const ids = [helper ? `${id}-help` : "", error ? `${id}-error` : ""].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

interface FieldShell {
  id: string;
  label: string;
  helper?: ReactNode;
  error?: string;
  className?: string;
  children: ReactNode;
  labelHidden?: boolean;
}

export function Field({ id, label, helper, error, className, children, labelHidden }: FieldShell) {
  return (
    <div className={["field", error ? "has-error" : "", className ?? ""].filter(Boolean).join(" ")}>
      <label className={labelHidden ? "visually-hidden" : "field__label t-label"} htmlFor={id}>
        {label}
      </label>
      {children}
      {helper ? (
        <p className="field__help t-small muted" id={`${id}-help`}>
          {helper}
        </p>
      ) : null}
      <FieldError id={id} message={error} />
    </div>
  );
}

type TextProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
  helper?: ReactNode;
  error?: string;
  fieldClass?: string;
};

export function TextField({ id, label, helper, error, fieldClass, className, ...rest }: TextProps) {
  return (
    <Field id={id} label={label} helper={helper} error={error} className={fieldClass}>
      <input
        id={id}
        className={["input", className ?? ""].join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, helper)}
        {...rest}
      />
    </Field>
  );
}

type AreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
  id: string;
  label: string;
  helper?: ReactNode;
  error?: string;
};

export function TextArea({ id, label, helper, error, className, ...rest }: AreaProps) {
  return (
    <Field id={id} label={label} helper={helper} error={error}>
      <textarea
        id={id}
        className={["input input--area", className ?? ""].join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, helper)}
        {...rest}
      />
    </Field>
  );
}
