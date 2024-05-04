import axios from "../../config/privateAxios";
import React, { useState } from "react";



function ResetPassWord() {
  const [newPass, setNewPass] = useState("");
 
  const [passwordShow, setPasswordShow] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShow(passwordShow ? false : true);
  };
  const resetPassword = async () => {
    const email = localStorage.getItem("email");
    try {
      const resetResponse = await axios.post("/forgetPass/resetPass", {
        newPass,
        email,
      });
    } catch (error) {
      console.error("Error resetting password:", error.message);
    }
  };

  return (
    <div className="flexbox">
      <div className="container">
        <div className="card">
          <img
            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg"
            alt=""
            style={{ margin: "auto", display: "flex", paddingBottom: "30px" }}
          />
          <div className="card-body">
            <h3>{`Nhập mã đã được gửi qua email để`}</h3>
            <div className="reg-form">
              <div className="input-wrapper">
                <span className="form-label">Mật khẩu</span>
                <div style={{ position: "relative" }}>
                  <i className="fa fa-lock icon"></i>
                  <input
                    type={passwordShow ? "text" : "password"}
                    name="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Điền mật khẩu của bạn ở đây"
                  ></input>
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
              <button id="btn-next" onClick={resetPassword}>
                Đặt lại mật khẩu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassWord;
