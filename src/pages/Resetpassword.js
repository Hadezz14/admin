import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../features/auth/authSlice";


const Resetpassword = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleUpdatePassword = () => {
    console.log(newPassword)
    console.log(confirmPassword)
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
  console.log(newPassword)
  

  return (
    <div className="login-container">
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
  );
};

export default Resetpassword;
