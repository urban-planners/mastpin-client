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
    <div className={`auth__page ${className}`}>
      <div className="auth__card">
        <div className="auth__card__visual">
          <img
            src={previewImage}
            className="auth__visual__image"
            alt="Welcome"
          />
          <div className="auth__visual__overlay">
            <h2>Welcome to Mastpin</h2>
            <p>Connect and explore with our advanced mapping tools.</p>
          </div>
        </div>
        <div className="auth__card__form">
          <div className="auth__header">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>

          <form onSubmit={onSubmit} className="auth__form">
            {children}
          </form>

          <div className="auth__footer">
            <span>{footerText}</span>
            <Link to={footerLink || ""} className="auth__footer__link">
              {footerLinkText}
            </Link>
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
  icon,
}: {
  value?: string;
  placeholder?: string;
  label?: string;
  name?: string;
  type?: "text" | "email" | "password";
  onChange: (e: any) => void;
  icon?: ReactNode;
}) => {
  return (
    <div className="auth__input__group">
      {label && <label className="auth__input__label">{label}</label>}
      <div className="auth__input__wrapper">
        {icon && <span className="auth__input__icon">{icon}</span>}
        <input
          className="auth__input"
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
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
