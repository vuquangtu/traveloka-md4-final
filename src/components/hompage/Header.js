import React from "react";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
function Header() {
  const { currentUser: user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Đăng xuất thành công");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Đăng xuất thất bại");
    }
    window.location.href = "/";
  };

  return (
    <header className="homepage-header">
      <div className="homepage-header-container">
        <div className="homepage-header-container-row">
          <div className="homepage-header-container-row-logo">
            <Link to="/" className="hover:cursor-pointer">
              <img
                src="https://e-magazine.asiamedia.vn/wp-content/uploads/2022/02/86afd0785f5505dd6d584971576dea27.svg"
                alt="logo"
              />
            </Link>
          </div>
          <div className="homepage-header-container-row-menu">
            <ul>
              <li>
                <Link
                  to={"/tera"}
                  className="hover:text-blue-200 hover:translate-y-[-1px] bg-transparent"
                >
                  Hợp tác với chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to={"/hotels"}
                  className="hover:text-blue-200 hover:translate-y-[-1px] bg-transparent"
                >
                  Khách sạn
                </Link>
              </li>
              <li>
                <Link
                  to={"/search"}
                  className="hover:text-blue-200 hover:translate-y-[-1px] bg-transparent"
                >
                  Vé máy bay
                </Link>
              </li>

              <li>
                <Link
                  to={"/combo"}
                  className="hover:text-blue-200 hover:translate-y-[-1px] bg-transparent"
                >
                  Combo tiết kiệm
                </Link>
              </li>
              {user ? (
                <>
                  <li className="auth-link-login">
                    <Link to={"/profile"}>
                      <span className="hover:text-blue-200  hover:cursor-pointer hover:translate-y-[-1px] bg-transparent text-white">
                        {user?.email || user?.displayName}
                      </span>
                    </Link>
                  </li>
                  <li className="auth-link-login">
                    <button
                      onClick={handleLogout}
                      className="hover:text-blue-200 hover:translate-y-[-1px] bg-transparent  text-white"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="auth-link-login">
                    <Link
                      to={"/login"}
                      className="hover:text-blue-200 hover:translate-y-[-1px] bg-transparent"
                    >
                      Đăng nhập
                    </Link>
                  </li>
                  <li className="auth-link-register">
                    <Link
                      to={"/register"}
                      className="hover:text-blue-200 hover:translate-y-[-1px] bg-transparent"
                    >
                      Đăng ký
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
