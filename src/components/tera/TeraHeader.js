import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router";

function TeraHeader() {
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const checkUser = (user) => {
    if (user && user.user) {
      return user.user;
    }
    return null;
  };

  const currentUser = checkUser(user);

  const isPartner = currentUser?.authorities?.some(
    (auth) => auth.authority === "ROLE_PARTNER"
  );

  const handleRedirect = () => {
    navigate("/tera/service");
  };
  return (
    <div
      style={{
        fontFamily: "sans, Roboto, sans-serif, Helvetica Neue,Arial, ",
        color: "#373A3C",
      }}
    >
      <div
        className="w-full border-b border-solid border-slate-300"
        style={{ fontSize: "14px", backgroundColor: "#fff" }}
      >
        <div className="w-4/5 mx-auto px-2 py-4 flex items-center justify-between bg-white">
          <div className="flex">
            <img
              onClick={handleRedirect}
              src="https://play-lh.googleusercontent.com/TL1OSm_ODIMQ5RPF-Xp05Hf_KKB0zI3E9f1TelcTeXecptz62FniRuk-W5El_MRqfAuu"
              alt="Traveloka Tera Logo"
              style={{ maxWidth: "140px", height: "60px" }}
              className="hover:cursor-pointer hover:opacity-80"
            />
            <img
              onClick={() => navigate("/home")}
              src="https://static.ybox.vn/2019/2/1/1551099637244-Thi%E1%BA%BFt%20k%E1%BA%BF%20kh%C3%B4ng%20t%C3%AAn%20(26).png"
              alt="Traveloka Tera Logo"
              style={{ maxWidth: "140px", height: "60px" }}
              className="hover:cursor-pointer hover:opacity-80 ml-2"
            />
          </div>
          <div className="leading-5 text-center">
            {isPartner ? (
              <div className="flex items-center">
                <div className="mr-4">
                  <p className="font-semibold">Chào mừng,</p>
                  <p>{currentUser?.name}</p>
                </div>
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                  onClick={handleRedirect}
                >
                  Quản lý dịch vụ của bạn
                </button>
              </div>
            ) : (
              <div className="flex items-center content-center">
                <p className="font-semibold " style={{ fontSize: "20px" }}>
                  Chào mừng,
                </p>
                <p style={{ fontSize: "18px" }}>{currentUser?.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeraHeader;
