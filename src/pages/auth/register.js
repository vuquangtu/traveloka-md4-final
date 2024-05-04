import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../../style/scss/base/_reset.scss";

import "../../style/scss/auth/_register.scss";
import BackButton from "../../components/buttons/BackButton";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useAdduserMutation } from "../../redux/features/usersApi";
import app from "../../firebase/config";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import { useFormik } from "formik";




import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Vui lòng nhập địa chỉ email hợp lệ.")
    .required("Trường này là bắt buộc."),
  username: Yup.string()
    .matches(
      /^[a-zA-Z][a-zA-Z0-9]+$/,
      "Tên tài khoản phải bắt đầu với các chữ cái và có ít nhất hai ký tự."
    )
    .required("Trường này là bắt buộc."),
  phone: Yup.string()
    .matches(/^0[0-9]{9}$/, "Vui lòng nhập số điện thoại hợp lệ.")
    .required("Trường này là bắt buộc."),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .required("Trường này là bắt buộc."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Xác nhận mật khẩu không khớp.")
    .required("Trường này là bắt buộc."),
});

function Register() {
  const [passwordShow, setPasswordShow] = useState(false);
  const [checkPasswordShow, setCheckPasswordShow] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [addUser] = useAdduserMutation();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signUpWithGmail, signUpWithFacebook } = useContext(AuthContext);

  const togglePasswordVisiblity = () => {
    setPasswordShow(!passwordShow);
  };
  const toogleCheckPasswordVisblity = () => {
    setCheckPasswordShow(!checkPasswordShow);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Xử lý submit form ở đây
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        const user = result.user;
        await addUser({ email: user.email, uid: user.uid }); // Await addUser
        navigate(from, { replace: true }); // Navigate after addUser completes
      } catch (error) {
        alert(error.message);
      }
    },
  });

  const handleSignUpwithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signUpWithGmail();
      navigate(from, { replace: true }); // Navigate after addUser completes
    } catch (error) {
      // Handle the error here, for example:
      console.error("An error occurred during sign up with Google:", error);
      // You can also display an error message to the user if needed.
    }
  };

  const handleSignInbyFacebook = async (e) => {
    e.preventDefault();

    try {
      await signUpWithFacebook();
      navigate(from, { replace: true }); // Navigate after addUser completes
    } catch (error) {
      // Handle the error here, for example:
      console.error("An error occurred during sign up with Google:", error);
      // You can also display an error message to the user if needed.
    }
  };

  return (
    <div className="flexbox">
      <BackButton home={true} />
      <div className="container">
        <div className="card">
          <img
            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg"
            alt=""
            style={{ margin: "auto", display: "flex" }}
          />{" "}
          <div className="card-body">
            <h5 className="card-title">Tạo tài khoản mới</h5>

            <p className="card-text">
              Đăng ký ngay tài khoản của bạn trên Traveloka và trải nghiệm sự
              thuận tiện khi đặt phòng khách sạn hoặc vé máy bay!
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className="reg-form">
                <span className="form-label">Email</span>
                <div className="relative">
                  <input
                    className={`form-input pl-10 ${
                      formik.errors.email ? "input-error" : ""
                    }`}
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Nhập email của bạn ở đây"
                  />

                  <img
                    alt=""
                    src="https://icon-library.com/images/email-icon-vector-png/email-icon-vector-png-14.jpg"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  />

                  {formik.touched.email && formik.errors.email && (
                    <p className="error-message">{formik.errors.email}</p>
                  )}
                </div>
                <span className="form-label">Username</span>
                <div className="relative">
                  <input
                    className={`form-input pl-10 ${
                      formik.errors.username ? "input-error" : ""
                    }`}
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Nhập username của bạn ở đây"
                  />
                  <img
                    alt=""
                    src="https://www.svgrepo.com/show/449441/user.svg"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  />
                </div>{" "}
                {formik.touched.username && formik.errors.username && (
                  <p className="error-message">{formik.errors.username}</p>
                )}
                <span className="form-label">Số điện thoại</span>
                <div className="relative">
                  <input
                    className={`form-input pl-10 ${
                      formik.errors.phone ? "input-error" : ""
                    }`}
                    type="text"
                    name="phone"
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Nhập số điện thoại của bạn ở đây"
                  />
                  <img
                    alt=""
                    src="https://cdn.iconscout.com/icon/free/png-512/free-phone-1540-460506.png?f=webp&w=256"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="error-message">{formik.errors.phone}</p>
                  )}
                </div>
                <div className="input-wrapper">
                  <span className="form-label">Mật khẩu</span>
                  <div style={{ position: "relative" }}>
                    <i className="fa fa-lock icon"></i>
                    <input
                      type={passwordShow ? "text" : "password"}
                      name="password"
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={`form-input pl-10 ${
                        formik.errors.password ? "input-error" : ""
                      }`}
                      placeholder="Điền mật khẩu của bạn ở đây"
                    ></input>
                    <img
                      alt=""
                      src="https://icon-library.com/images/password-icon-png/password-icon-png-19.jpg"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    />
                  </div>

                  <div className="eye-icon" onClick={togglePasswordVisiblity}>
                    {passwordShow ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <rect width="18" height="18"></rect>
                          <path
                            stroke="#0194F3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2,12 C4.66666667,7.33333333 8,5 12,5 C16,5 19.3333333,7.33333333 22,12 C19.3333333,16.6666667 16,19 12,19 C8,19 4.66666667,16.6666667 2,12 Z"
                          ></path>
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="#687176"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></circle>
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <rect width="18" height="18"></rect>
                          <path
                            stroke="#0194F3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2,12 C4.66666667,7.33333333 8,5 12,5 C16,5 19.3333333,7.33333333 22,12 C19.3333333,16.6666667 16,19 12,19 C8,19 4.66666667,16.6666667 2,12 Z"
                          ></path>
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="#687176"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></circle>
                          <path
                            stroke="#FFF"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3.5,21.5 L21.5,3.5 C21.7761424,3.22385763 21.7761424,2.77614237 21.5,2.5 L21.5,2.5 C21.2238576,2.22385763 20.7761424,2.22385763 20.5,2.5 L2.5,20.5 C2.22385763,20.7761424 2.22385763,21.2238576 2.5,21.5 L2.5,21.5 C2.77614237,21.7761424 3.22385763,21.7761424 3.5,21.5 Z"
                          ></path>
                          <path
                            stroke="#0194F3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3,21 L21,3"
                          ></path>
                        </g>
                      </svg>
                    )}
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="error-message">{formik.errors.password}</p>
                  )}
                </div>
                <div className="input-wrapper">
                  <span className="form-label"> Nhập lại mật khẩu</span>
                  <div style={{ position: "relative" }}>
                    <i className="fa fa-lock icon"></i>
                    <input
                      type={checkPasswordShow ? "text" : "password"}
                      name="confirmPassword"
                      className={
                        formik.errors.confirmPassword ? "input-error" : ""
                      }
                      value={formik.values.confirmPassword}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Điền mật khẩu của bạn ở đây"
                    />
                    <img
                      alt=""
                      src="https://icon-library.com/images/password-icon-png/password-icon-png-19.jpg"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    />
                  </div>

                  <div
                    className="eye-icon"
                    onClick={toogleCheckPasswordVisblity}
                  >
                    {checkPasswordShow ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <rect width="18" height="18"></rect>
                          <path
                            stroke="#0194F3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2,12 C4.66666667,7.33333333 8,5 12,5 C16,5 19.3333333,7.33333333 22,12 C19.3333333,16.6666667 16,19 12,19 C8,19 4.66666667,16.6666667 2,12 Z"
                          ></path>
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="#687176"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></circle>
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <rect width="18" height="18"></rect>
                          <path
                            stroke="#0194F3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2,12 C4.66666667,7.33333333 8,5 12,5 C16,5 19.3333333,7.33333333 22,12 C19.3333333,16.6666667 16,19 12,19 C8,19 4.66666667,16.6666667 2,12 Z"
                          ></path>
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="#687176"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></circle>
                          <path
                            stroke="#FFF"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3.5,21.5 L21.5,3.5 C21.7761424,3.22385763 21.7761424,2.77614237 21.5,2.5 L21.5,2.5 C21.2238576,2.22385763 20.7761424,2.22385763 20.5,2.5 L2.5,20.5 C2.22385763,20.7761424 2.22385763,21.2238576 2.5,21.5 L2.5,21.5 C2.77614237,21.7761424 3.22385763,21.7761424 3.5,21.5 Z"
                          ></path>
                          <path
                            stroke="#0194F3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3,21 L21,3"
                          ></path>
                        </g>
                      </svg>
                    )}
                  </div>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="error-message">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>
                <button id="btn-next" type="submit">
                  Register
                </button>
              </div>
            </form>
            <div className="line-spacing"></div>
            <p>
              Bạn đã có tài khoản?
              <Link
                to="/login"
                style={{ color: "rgb(88, 153, 214)", fontWeight: "600" }}
              >
                Đăng nhập ở đây
              </Link>
            </p>
            <div className="login-with">
              <div onClick={handleSignUpwithGoogle}>
                <img
                  alt=""
                  src="https://icones.pro/wp-content/uploads/2021/02/google-icone-symbole-png-logo-orange-300x300.png"
                  width={20}
                  height={20}
                />
                <a
                  href="http://localhost:8080/oauth2/authorization/google"
                  style={{ textDecoration: "none" }}
                >
                  Tiếp tục với Google
                </a>
              </div>
              <div onClick={handleSignInbyFacebook}>
                <img
                  src="https://www.freepnglogos.com/uploads/facebook-logo-icon/facebook-logo-icon-facebook-logo-png-transparent-svg-vector-bie-supply-15.png"
                  width={10}
                  height={8}
                />
                <a
                  href="http://localhost:8080/oauth2/authorization/facebook"
                  style={{ textDecoration: "none" }}
                >
                  Tiếp tục với Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
