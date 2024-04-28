import React, { useState } from "react";
import axios from "../../config/privateAxios";
import { useNavigate } from "react-router-dom";
import "../../style/scss/auth/_forgetPass.scss";
function ValidateCode({ action, validateUrl }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateCode = async () => {
    try {
      const email = localStorage.getItem("email");
      const validateResponse = await axios.post(
        validateUrl,
        { code, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (validateResponse.status === 200) {
        setError("");
        if (action === "lấy lại mật khẩu") {
          navigate("/reset-password");
        } else {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } else {
        setError("Validate code fail");
      }
    } catch (error) {
      console.error(`Error validating code for ${action}:`, error.message);
      setError("Có lỗi xảy ra khi xác thực mã.");
    }
  };
  return (
    <div className="flexbox">
      <div className="container" style={{ marginBottom: "300px" }}>
        <div className="validate-code-container">
          <div className="card">
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg"
              alt=""
              style={{ margin: "auto", display: "flex", paddingBottom: "30px" }}
            />
            <div className="card-body">
              <h3>{`Nhập mã đã được gửi qua email để ${action}`}</h3>
              <div className="reg-form">
                <span className="form-label">Mã xác thực</span>
                <i className="fa fa-envelope icon"></i>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Nhập mã của bạn ở đây"
                />
                <p className="error-message">{error}</p>
                <button id="btn-next" onClick={validateCode}>
                  Xác thực mã
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValidateCode;
