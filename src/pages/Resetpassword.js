import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { updatePassword } from "../features/auth/authSlice";
import vyamLoginPage from "../imgs/vyam.png";


const Resetpassword = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleUpdatePassword = () => {
    // Check if the new password and confirm password match
    if (newPassword === confirmPassword) {
      // Dispatch the updatePassword action with the new password
      dispatch(updatePassword(newPassword))
        .then(() => {
          // Password updated successfully, you can handle success here
          alert("Password updated successfully");
          // You can also redirect the user to another page if needed
          // history.push("/dashboard");
        })
        .catch((error) => {
          // Handle the error (e.g., display an error message to the user)
          alert(`Password update failed: ${error.message}`);
        });
    } else {
      // Passwords do not match, handle accordingly (e.g., display an error message)
      alert("Passwords do not match");
    }
  };
  

  return (
    <div className="login-container"
      style={{
        backgroundImage: `url(${vyamLoginPage})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        minHeight: "100vh",
        backgroundColor: "#1E1E1E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <div className="loginForm rounded-3 mx-auto p-4">
      <h3 className="text-center title">Reset Password</h3>
      <p className="text-center">Please Enter your new password.</p>
      <CustomInput
        type="password"
        label="New Password"
        id="newPassword"
        value={newPassword}
        onChng={(e) => setNewPassword(e.target.value)}
      />
      <CustomInput
        type="password"
        label="Confirm Password"
        id="confirmPassword"
        value={confirmPassword}
        onChng={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        className="btn btn-primary"
        style={{ marginTop: "1rem" }}
        type="submit"
        onClick={handleUpdatePassword}
      >
        Update Password
      </button>
    </div>
    </div>
  );
};

export default Resetpassword;
