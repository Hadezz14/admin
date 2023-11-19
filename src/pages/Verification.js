import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { otpresend, verify } from "../features/auth/authSlice";
import vyamLoginPage from "../imgs/vyam.png";

let schema = yup.object().shape({
  otp: yup.string().required("OPT is Required"),
});
const Verification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state);
  const { user, isError, isSuccess, isLoading, isverified, isLoadingResend, message } =
    authState.auth;
  const formik = useFormik({
    initialValues: {
      otp: "",
      email: user.email,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(verify(values));
    },
  });

  function resendOTP() {
    dispatch(otpresend({ email: user.email }));
  }

  useEffect(() => {
    if (isverified) {
      navigate("/admin");
    } else {
      navigate("");
    }
  }, [user, isError, isverified, isSuccess, isLoading]);
  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${vyamLoginPage})`,
        backgroundSize: "contain", // Adjust this property
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        minHeight: "100vh",
        backgroundColor: "#1E1E1E",
      }}
    >
      {" "}
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="loginForm rounded-3 mx-auto p-4">
        <h3 className="text-center title">OTP Verification </h3>
        <p className="text-center">Verify OTP sent your email to Login </p>
        <div className="error text-center">
          {message === "Request failed with status code 401"
            ? "Invalid Credentails"
            : ""}
          {message === "Request failed with status code 403"
            ? "Not Authorized"
            : ""}
          {message === "Request failed with status code 500"
            ? "User Not Found"
            : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="OTP"
            id="OTP"
            name="otp"
            onChng={formik.handleChange("otp")}
            onBlr={formik.handleBlur("otp")}
            val={formik.values.otp}
          />
          <div className="error mt-2">
            {formik.touched.otp && formik.errors.otp}
          </div>
          <div className="mb-3 text-end">
            <Link onClick={resendOTP} disabled={isLoading || isLoadingResend}>
              {isLoadingResend ? (
                <div className="loading-text">Resending OTP</div>
              ) : (
                "Resend OTP"
              )}
            </Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
            disabled={isLoading || isLoadingResend}
          >
            {isLoading ? (
              <div className="loading-text">Verifying OTP</div>
            ):(
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
