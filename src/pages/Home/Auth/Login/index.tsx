import "./Login.css";
import { FormEvent, useState } from "react";
import AuthTemplate, { AuthButton, AuthInput } from "../Template/AuthTemplate";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SERVER = process.env.REACT_APP_SERVER_URL;

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const [error, message] = verifyInput();
    try {
      if (error) throw new Error(message as string);
      setLoading(true);
      const response = await fetch(`${SERVER}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      setLoading(false);
      localStorage.setItem("token", data.data.token);
      toast.success("Login successful");
      navigate("/dashboard");
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
    if (!email) return [true, "Email is required"];
    if (!password) return [true, "Password is required"];
    return error;
  };

  return (
    <AuthTemplate
      className="auth__login"
      title="Login"
      description="Login to your account"
      onSubmit={handleSubmit}
      footerText="Don't have an account?"
      footerLink="/auth/register"
      footerLinkText="Register"
    >
      <AuthInput
        label="E-mail"
        name="email"
        value={email}
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <AuthInput
        label="Password"
        name="password"
        value={password}
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <AuthButton disabled={loading}>Login</AuthButton>
      <Link className="auth__forgot-password" to="/auth/forgot-password">
        Forgot password?
      </Link>
    </AuthTemplate>
  );
};
