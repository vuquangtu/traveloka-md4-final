import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/scss/flight/_header.scss";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, selectUser } from "../../redux/features/userSlice";

function Header() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      dispatch(removeUser());
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <header>
        <div className="flight-container">
          <div className="row">
            <div className="logo">
              <Link to="/" className="hover:cursor-pointer">
                <img
                  src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="menu">
              <ul>
                <li>
                  <Link to={""}>Khuyến mãi</Link>
                </li>
                <li>
                  <Link to={""}>Hỗ trợ</Link>
                </li>
                <li>
                  <Link to={"/tera"}>Hợp tác với chúng tôi</Link>
                </li>
                <li>
                  <Link to={"/bookingTicket"}> Đặt chỗ của tôi</Link>
                </li>
                {user && user.user ? (
                  <>
                    <li>
                      <Link
                        to={"/profile"}
                        className="hover:text-blue-500  hover:cursor-pointer hover:translate-y-[-1px] bg-transparent text-black"
                      >
                        {user.user.name}
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="hover:text-blue-500 hover:translate-y-[-1px] bg-transparent  text-black"
                      >
                        Đăng xuất
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <Link to={"/login"} className="pr-5">
                      <li className="auth-link-login">Đăng nhập</li>
                    </Link>
                    <li className="auth-link-register">
                      <Link href="#">Đăng ký</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="header-nav">
          <div className="header-nav-container">
            <Link to={"/hotels"}>
              <p>Khách sạn</p>
            </Link>
            <Link to={"/search"}>
              <p>Vé máy bay</p>
            </Link>
            <Link to={"/combo"}>
              <p>Combo tiết kiệm</p>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
