import "./Register.css";
import { FormEvent, useState } from "react";
import AuthTemplate, { AuthButton, AuthInput } from "../Template/AuthTemplate";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const SERVER = process.env.REACT_APP_SERVER_URL;

export const Register = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const [error, message] = verifyInput();
    try {
      if (error) throw new Error(message as string);
      setLoading(true);
      const response = await fetch(`${SERVER}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      setLoading(false);
      toast.success(data.message);
      navigate("/auth/login");
    } catch (err: any) {
      setLoading(false);
      if (/failed to fetch|network *error/i.test(err.message))
        return toast.error(
          "Please check your internet connection and try again",
        );
      toast.error(err.message);
    }
  };

  const verifyInput = () => {
    let error = [false, ""];
    if (!firstname) return [true, "First Name is required"];
    if (!lastname) return [true, "Last Name is required"];
    if (!email) return [true, "Email is required"];
    if (!password) return [true, "Password is required"];
    if (password !== confirmPassword) return [true, "Passwords do not match"];
    if (!agree) return [true, "You must agree to the terms of service"];
    return error;
  };

  return (
    <AuthTemplate
      className="auth__register"
      description="Start your journey with us"
      title="Create Account"
      footerText="Already have an account?"
      footerLink="/auth/login"
      footerLinkText="Sign In"
      onSubmit={handleSubmit}
    >
      <div className="auth__row">
        <AuthInput
          label="First Name"
          name="firstname"
          value={firstname}
          placeholder="John"
          icon={<FaUser />}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <AuthInput
          label="Last Name"
          name="lastname"
          value={lastname}
          placeholder="Doe"
          icon={<FaUser />}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <AuthInput
        label="Email Address"
        name="email"
        value={email}
        type="email"
        placeholder="name@example.com"
        icon={<FaEnvelope />}
        onChange={(e) => setEmail(e.target.value)}
      />
      <AuthInput
        label="Password"
        name="password"
        value={password}
        placeholder="Create a password"
        type="password"
        icon={<FaLock />}
        onChange={(e) => setPassword(e.target.value)}
      />
      <AuthInput
        label="Confirm Password"
        name="confirm_password"
        value={confirmPassword}
        placeholder="Confirm your password"
        type="password"
        icon={<FaLock />}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <label className="auth__input__label terms__label">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <span>
          I agree to the <Link to={"/legal/terms"}>Terms of Service</Link> and{" "}
          <Link to={"/legal/privacy"}>Privacy Policy</Link>
        </span>
      </label>
      <AuthButton disabled={!agree || loading}>Create Account</AuthButton>
    </AuthTemplate>
  );
};
