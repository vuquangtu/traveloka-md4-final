import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../../style/scss/base/_reset.scss";
import "../../style/scss/auth/_login.scss";
import app from "../../firebase/config";
import { getAuth } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

import BackButton from "../../components/buttons/BackButton";

import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const [passwordShow, setPasswordShow] = useState(false);
  const navigate = useNavigate();
  const { signUpWithGmail, signUpWithFacebook } = useContext(AuthContext);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const auth = getAuth(app);

  const togglePasswordVisiblity = () => {
    setPasswordShow(passwordShow ? false : true);
  };
  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((result) => {
        navigate(from, { replace: true }); // Navigate after addUser completes
      })
      .catch((err) => {
        setError("Mật khẩu không chính xác");
      });
  };
  const handleSignInbyGoogle = async (e) => {
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
    <>
      <BackButton home={true} />
      <div className="flexbox">
        <div className="container">
          <div className="card">
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg"
              alt=""
              style={{ margin: "auto", display: "flex" }}
            />
            <div className="card-body">
              <h3 className="card-title">Chào mừng bạn đã quay trở lại</h3>
              <p className="card-text">
                Đăng nhập ngay để quản lý đặt phòng và kiểm tra tình trạng phòng
                trống, cùng đặt vé máy bay một cách thuận lợi!
              </p>
              <form onSubmit={handleSubmit}>
                <div className="login-form">
                  <span className="form-label">
                    Email/Số điện thoại di động
                  </span>
                  <div className="relative">
                    <input
                      className="form-input pl-10"
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChangeInput}
                      placeholder="Điền email hoặc số điện thoại của bạn ở đây"
                    ></input>
                    <img
                      src="https://icon-library.com/images/email-icon-vector-png/email-icon-vector-png-14.jpg"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    />
                  </div>
                  <div className="input-wrapper">
                    <span className="form-label">Mật khẩu</span>
                    <div style={{ position: "relative" }}>
                      <input
                        className="form-input pl-10"
                        type={passwordShow ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChangeInput}
                        placeholder="Điền mật khẩu của bạn ở đây"
                      ></input>
                      {error && <p className="error-message">{error}</p>}
                      <img
                        src="https://icon-library.com/images/password-icon-png/password-icon-png-19.jpg"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4"
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
                  </div>
                  <Link
                    to="/forgetpass"
                    className="login-form-forgot"
                    href="/#"
                  >
                    Bạn quên mật khẩu ?
                  </Link>
                  <button id="btn-login" type="submit">
                    Đăng nhập
                  </button>
                </div>
              </form>
              <div className="line-spacing"></div>
              <p>
                Bạn chưa có tài khoản ?<Link to="/register">Đăng ký ngay</Link>
              </p>
              <div className="login-with">
                <div onClick={handleSignInbyGoogle}>
                  <img
                    src="https://icones.pro/wp-content/uploads/2021/02/google-icone-symbole-png-logo-orange-300x300.png"
                    width={20}
                    height={20}
                  />
                  <a style={{ textDecoration: "none" }}>
                    Đăng nhập bằng Google
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
                    Đăng nhập bằng facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
