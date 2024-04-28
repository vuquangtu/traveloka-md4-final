import React, { useEffect, useRef, useState } from "react";
import axios from "../../config/privateAxios";
import { useSelector, useDispatch } from "react-redux";
import { saveUser, selectUser } from "../../redux/features/userSlice";

function RegisterTera({ closeModal }) {
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const setRole = () => {
    axios
      .post("/api/users/setRole", {
        username: user.user.username,
        newRole: "ROLE_PARTNER",
      })
      .then((response) => {
        if (
          typeof response.data === "string" &&
          response.data === "Cập nhật phân quyền thành công"
        ) {
          const updatedUser = {
            ...user.user,
            authorities: [
              ...user.user.authorities,
              { authority: "ROLE_PARTNER" },
            ],
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          dispatch(saveUser(updatedUser));
        }
      })
      .catch((error) => {
        console.error("Error when calling API to update user role:", error);
      });
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-md mx-auto w-fit"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-red-600">
          Đăng ký làm thành viên của Traveloka
        </h2>
        <p className="mb-4 text-gray-500">
          Hãy trở thành thành viên của chúng tôi để trải nghiệm những ưu đãi đặc
          biệt và dịch vụ tốt nhất từ Traveloka.
        </p>
        <h3 className="text-lg font-semibold mb-2 text-black">
          Những lợi ích khi đăng ký:
        </h3>
        <ul className="list-disc ml-4 mb-8 text-black">
          <li className="mb-2">Cho thuê phòng khách sạn</li>
          <li className="mb-2">Đăng ký thông tin chuyến bay</li>
          <li className="mb-2">
            Khách sạn và chuyến bay sẽ được tích hợp vào dịch vụ combo giá rẻ
            của Traveloka
          </li>
        </ul>

        <button
          className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 ease-in-out"
          onClick={setRole}
        >
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
}

export default RegisterTera;
