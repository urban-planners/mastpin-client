import { FormEvent, useState } from "react";
import AuthTemplate, { AuthButton, AuthInput } from "../Template/AuthTemplate";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const SERVER = process.env.REACT_APP_SERVER_URL;

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) return toast.error("Password is required");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      setLoading(true);
      const response = await fetch(`${SERVER}/auth/reset-password/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
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

  return (
    <AuthTemplate
      className="auth__reset-password"
      title="Reset Password"
      description="Enter your new password"
      onSubmit={handleSubmit}
      footerText="Remember your password?"
      footerLink="/auth/login"
      footerLinkText="Sign In"
    >
      <AuthInput
        label="New Password"
        name="password"
        value={password}
        type="password"
        placeholder="Enter new password"
        icon={<FaLock />}
        onChange={(e) => setPassword(e.target.value)}
      />
      <AuthInput
        label="Confirm Password"
        name="confirmPassword"
        value={confirmPassword}
        type="password"
        placeholder="Confirm new password"
        icon={<FaLock />}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <AuthButton disabled={loading}>Reset Password</AuthButton>
    </AuthTemplate>
  );
};
