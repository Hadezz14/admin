import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import vyamLoginPage from "../imgs/vyam.png";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAdmin } from "../features/auth/authSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";



let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
});

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state);
  const { user, isError, isSuccess, isLoading, message } =
    authState.auth;
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(forgotPasswordAdmin({ email: values.email }));
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/otp_verify-forgetPaaword");
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading]);

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
          Please Enter your email to get OTP to reset password.
        </p>
        {isError && (
          <div className="error text-center">
            {message}
          </div>
        )}
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput type="text" label="Email Address"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
            disabled={isLoading}
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
