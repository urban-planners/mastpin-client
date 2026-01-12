import { FormEvent, useState } from "react";
import AuthTemplate, { AuthButton, AuthInput } from "../Template/AuthTemplate";
import { toast } from "react-toastify";
import { FaEnvelope } from "react-icons/fa";

const SERVER = process.env.REACT_APP_SERVER_URL;

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    try {
      setLoading(true);
      const response = await fetch(`${SERVER}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.message);

      setLoading(false);
      toast.success(data.message);
      setEmail("");
    } catch (err: any) {
      setLoading(false);
      if (/failed to fetch|network *error/i.test(err.message))
        return toast.error(
          "Please check your internet connection and try again",
        );
      toast.error(err.message);
    }
  };

  return (
    <AuthTemplate
      className="auth__forgot-password-page"
      title="Forgot Password"
      description="Enter your email to receive a reset link"
      onSubmit={handleSubmit}
      footerText="Remember your password?"
      footerLink="/auth/login"
      footerLinkText="Sign In"
    >
      <AuthInput
        label="Email Address"
        name="email"
        value={email}
        placeholder="name@example.com"
        icon={<FaEnvelope />}
        onChange={(e) => setEmail(e.target.value)}
      />
      <AuthButton disabled={loading}>Send Reset Link</AuthButton>
    </AuthTemplate>
  );
};
