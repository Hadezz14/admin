import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import vyamLoginPage from "../imgs/vyam.png";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;
  useEffect(() => {
    if (isSuccess) {
      navigate("/otp_verify");
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
        backgroundColor: "#1E1E1E",
      }}
    >
      {" "}
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="loginForm rounded-3 mx-auto p-4" >
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
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
            label="Email Address"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            label="Password"
            id="pass"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mb-3 text-end">
            <Link to="forgot-password" className="">
              Forgot Password?
            </Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? (
              <div className="loading-text">Logging in</div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
