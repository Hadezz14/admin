import React from "react";
import CustomInput from "../components/CustomInput";
import vyamLoginPage from "../imgs/vyam.png";


const Resetpassword = () => {
  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${vyamLoginPage})`,
        backgroundSize: "contain", // Adjust this property
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        minHeight: "100vh",
        backgroundColor: "#1E1E1E"
      }}
    > 
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title"> Reset Password</h3>
        <p className="text-center">Please Enter your new password.</p>
        <form action="">
          <CustomInput type="password" label="New Password" id="pass" />
          <CustomInput
            type="password"
            label="Confirm Password"
            id="confirmpass"
          />

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
