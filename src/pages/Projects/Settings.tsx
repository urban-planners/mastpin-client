import "./Settings.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiSave, FiUser, FiMail } from "react-icons/fi";

const SERVER = process.env.REACT_APP_SERVER_URL;

interface SettingsProps {
  user: {
    firstname: string;
    lastname: string;
    email: string;
  } | null;
  onUpdate: (user: any) => void;
}

export const Settings = ({ user, onUpdate }: SettingsProps) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${SERVER}/auth/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          firstname,
          lastname,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.message);

      onUpdate(data.data);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="settings-loading">Loading settings...</div>;

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Account Settings</h2>
        <p>Manage your profile information</p>
      </div>

      <div className="settings-content">
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-section">
            <h3>Profile Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="Enter first name"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper disabled">
                <FiMail className="input-icon" />
                <input type="email" value={user.email} disabled />
              </div>
              <small className="helper-text">
                Email address cannot be changed
              </small>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={loading}>
              <FiSave />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
