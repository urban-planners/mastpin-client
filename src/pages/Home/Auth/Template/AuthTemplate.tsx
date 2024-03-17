import { ChangeEvent, FormEvent, ReactNode } from "react";
import "./AuthTemplate.css";

const AuthTemplate = ({
  children,
  title,
  onSubmit,
}: {
  children?: ReactNode;
  title?: string;
  onSubmit?: (e: FormEvent) => void;
}) => {
  return (
    <div className="auth__template">
      <div className=""></div>
      <div className="auth__template__container">
        <div className="auth__template__content">
          <div>
            <h1>{title}</h1>
          </div>
          <div>
            <form onSubmit={onSubmit}>{children}</form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;

export const AuthInput = ({
  value,
  label,
  placeholder,
  name,
  type = "text",
  onChange,
}: {
  value?: string;
  placeholder?: string;
  label?: string;
  name?: string;
  type?: "text" | "email" | "password";
  onChange: (e: any) => void;
}) => {
  return (
    <label>
      {label}
      <input
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};

export const AuthButton = ({
  type = "submit",
  children,
}: {
  type?: "submit" | "reset" | "button" | undefined;
  children: string | ReactNode;
}) => {
  return <button type={type}>{children}</button>;
};
