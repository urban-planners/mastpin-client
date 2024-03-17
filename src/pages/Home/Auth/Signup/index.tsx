import { FormEvent, useState } from "react";
import AuthTemplate, { AuthButton, AuthInput } from "../Template/AuthTemplate";
import "./Signup.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SERVER = process.env.REACT_APP_SERVER_URL;

export const Signup = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const [error, message] = verifyInput();
    try {
      if (error) throw new Error(message as string);
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
      toast.success(data.message);
      navigate("/auth/login");
    } catch (err: any) {
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
    return error;
  };

  return (
    <AuthTemplate title="Signup" onSubmit={handleSubmit}>
      <AuthInput
        label="First Name"
        name="firstname"
        value={firstname}
        placeholder="John"
        onChange={(e) => setFirstname(e.target.value)}
      />
      <AuthInput
        label="Last Name"
        name="lastname"
        value={lastname}
        placeholder="Doe"
        onChange={(e) => setLastname(e.target.value)}
      />
      <AuthInput
        label="E-mail"
        name="email"
        value={email}
        type="email"
        placeholder="info@mastpin.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <AuthInput
        label="Password"
        name="password"
        value={password}
        placeholder="*********"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <AuthInput
        label="Confirm Password"
        name="confirm_password"
        value={confirmPassword}
        placeholder="*********"
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <AuthButton>Create Account</AuthButton>
    </AuthTemplate>
  );
};
