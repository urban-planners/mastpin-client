import "./AuthTemplate.css";
import { FormEvent, ReactNode, useEffect } from "react";
import previewImage from "../../../../assets/images/preview5.webp";
import { Link } from "react-router-dom";

const AuthTemplate = ({
  children,
  className = "",
  title,
  description,
  onSubmit,
  footerText,
  footerLink,
  footerLinkText,
}: {
  children?: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  onSubmit?: (e: FormEvent) => void;
  footerText?: string;
  footerLink?: string;
  footerLinkText?: string;
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={`auth__template ${className}`}>
      <div className="auth__template__image__container">
        <img
          src={previewImage}
          className="auth__template__image"
          alt="preview"
        />
      </div>
      <div className="auth__template__container">
        <div className="auth__template__content">
          <div className="auth__template__text">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div>
            <form onSubmit={onSubmit}>{children}</form>
          </div>
        </div>
        <div className="auth__footer">
          <span>{footerText}</span>
          <Link to={footerLink || ""}>
            <strong>{footerLinkText}</strong>
          </Link>
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
    <label className="auth__input__label">
      {label}
      <input
        className="auth__input"
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
  disabled = false,
}: {
  type?: "submit" | "reset" | "button" | undefined;
  children: string | ReactNode;
  disabled?: boolean;
}) => {
  return (
    <button className="auth__button" type={type} disabled={disabled}>
      {children}
    </button>
  );
};
