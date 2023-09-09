import React from "react";
import CustomInput from "../components/CustomInput";
import vyamLoginPage from "../imgs/vyam.png";


const Forgotpassword = () => {
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
      <div className="loginForm rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">
          Please Enter your register email to get reset password mail.
        </p>
        <form action="">
          <CustomInput type="password" label="Email Address" id="email" />

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
