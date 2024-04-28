import React from "react";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ForgetPass from "../pages/auth/forgetPassword";
import ResetPassWord from "../pages/auth/resetPassword";
import ValidateCode from "../pages/auth/validateCode";
import { Route, Routes } from "react-router-dom";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/register-validate-code"
        element={
          <ValidateCode
            action="đăng ký"
            validateUrl={'/register/validateCode'}
          />
        }
      />
      <Route path="/forgetpass" element={<ForgetPass />} />
      <Route
        path="/forget-pass-validate-code"
        element={
          <ValidateCode
            action="lấy lại mật khẩu"
            validateUrl={'forgetPass/validateCode'}
          />
        }
      />
      <Route path="/reset-password" element={<ResetPassWord />} />
    </Routes>
  );
}

export default AuthRoutes;
