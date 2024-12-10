import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../store/store';
import { updateProfile, clearError } from "../../store/slices/authSlice";

export default function EditProfile() {
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, error } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    description: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.username || "",
        password: "", // Password is left empty for security
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        description: user.description || ""
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('wd-', '')]: value
    }));
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSave = async () => {
    if (!user?.id) {
      console.error("No user ID found");
      return;
    }

    const updatedFields = {
      username: formData.userName,
      ...(formData.password && { password: formData.password }),
      firstName: formData.firstName,
      lastName: formData.lastName,
      description: formData.description
    };

    try {
      await dispatch(updateProfile({
        userId: user.id,
        updatedFields
      })).unwrap();
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(180deg, #000000 0%, #1a0000 100%)",
      color: "white",
      padding: "80px 20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "white",
    },
    heading: {
      color: "white",
      marginBottom: "30px",
    },
    errorMessage: {
      color: "#ff4444",
      marginBottom: "20px",
    }
  };

  // Add CSS for focus effect
  const styleTag = document.createElement("style");
  styleTag.textContent = `
    .form-control {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      background: rgba(0, 0, 0, 0.5) !important;
      border: 1px solid rgba(255, 0, 0, 0.2);
      border-radius: 4px;
      color: white !important;
      transition: all 0.3s ease;
      -webkit-text-fill-color: white !important;
    }
    .form-control:focus {
      box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
      outline: none;
      border-color: #E31837;
      background: rgba(0, 0, 0, 0.5) !important;
      color: white !important;
      -webkit-text-fill-color: white !important;
    }
    .form-control::placeholder {
      color: rgba(255, 255, 255, 0.7) !important;
    }
    .form-control:-webkit-autofill,
    .form-control:-webkit-autofill:hover,
    .form-control:-webkit-autofill:focus {
      -webkit-text-fill-color: white !important;
      -webkit-box-shadow: 0 0 0px 1000px black inset !important;
      transition: background-color 5000s ease-in-out 0s;
    }
    .custom-outline-btn {
      background: transparent;
      border: 2px solid #E31837;
      color: white;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .custom-outline-btn:hover {
      background: rgba(227, 24, 55, 0.1);
    }
    .custom-outline-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(styleTag);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Edit Profile</h1>
      {error && <div style={styles.errorMessage}>{error}</div>}
      
      <div>
        <label style={styles.label}>Username</label>
        <input
          id="wd-userName"
          className="form-control"
          onChange={handleInputChange}
          value={formData.userName}
          disabled={isLoading}
        />
      </div>

      <div>
        <label style={styles.label}>Password</label>
        <input
          id="wd-password"
          className="form-control"
          type="password"
          onChange={handleInputChange}
          value={formData.password}
          placeholder="Leave blank to keep current password"
          disabled={isLoading}
        />
      </div>

      <div>
        <label style={styles.label}>First Name</label>
        <input
          id="wd-firstName"
          className="form-control"
          onChange={handleInputChange}
          value={formData.firstName}
          disabled={isLoading}
        />
      </div>

      <div>
        <label style={styles.label}>Last Name</label>
        <input
          id="wd-lastName"
          className="form-control"
          onChange={handleInputChange}
          value={formData.lastName}
          disabled={isLoading}
        />
      </div>

      <div>
        <label style={styles.label}>Description</label>
        <input
          id="wd-description"
          className="form-control"
          onChange={handleInputChange}
          value={formData.description}
          disabled={isLoading}
        />
      </div>

      <div>
        <motion.button
          className="btn btn-danger float-right custom-outline-btn px-4"
          whileHover={{ scale: 1.05 }}
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </motion.button>
      </div>
    </div>
  );
}