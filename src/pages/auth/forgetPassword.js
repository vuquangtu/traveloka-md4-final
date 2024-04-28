import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../style/scss/auth/_forgetPass.scss";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";


import { useFetchusersQuery } from "../../redux/features/usersApi";
import { replace } from "formik";

function ForgetPass() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState(true);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { resetPassword } = useContext(AuthContext);

  const { data: users } = useFetchusersQuery();
  const userExits = users?.find((user) => user.email == email);

  const checkEmail = async () => {
    try {
      if (userExits) {
        setError("");
        setButtonState(false);
      } else {
        setButtonState(true);
        setError("Email chưa được đăng ký");
      }
    } catch (error) {
      console.error("Error handling forget pass:", error.message);
      setError("");
      setButtonState(false);
    }
  };

  const sendCode = async () => {
    try {
      localStorage.setItem("email", email);
      await resetPassword(email);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error sending code:", error.message);
    }
  };

  return (
    <div className="flexbox">
      <div className="container">
        <div className="container-card">
          <img
            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg"
            alt=""
            style={{ margin: "auto", display: "flex", paddingBottom: "30px" }}
          />
          <div className="card-body">
            <p className="card-title">Bạn quên mật khẩu?</p>

            <p className="card-text">
              Quên mật khẩu? Đừng lo, chỉ cần nhập email dưới đây, chúng tôi sẽ
              gửi mã xác nhận cho bạn ngay thôi!
            </p>
            <div className="reg-form">
              <span className="form-label">Email</span>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={checkEmail}
                  placeholder="Nhập email của bạn ở đây"
                ></input>
                <img
                  src="https://icon-library.com/images/email-icon-vector-png/email-icon-vector-png-14.jpg"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
                />
              </div>
              <p className="error-message">{error}</p>

              <button
                id="btn-next"
                onClick={sendCode}
                disabled={buttonState}
                style={{
                  backgroundColor: buttonState ? "gray" : "#ff5e1f",
                }}
              >
                Gửi Email
              </button>
            </div>
            <div className="line-spacing"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPass;
