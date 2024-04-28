import { useDateField } from "@mui/x-date-pickers/DateField/useDateField";
import React from "react";
import { useDispatch } from "react-redux";
import {
  changeFromAirportLocationId,
  changeFromAirportName,
  changeToAirportLocationId,
  changeToAirportName,
} from "../../redux/features/comboFlightSlice";
import {
  changeCity,
  changeHotelId,
  changePageNumber,
  changeStartDate,
} from "../../redux/features/hotelSlice";
import { useNavigate } from "react-router";

function ComboDiscovery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (
    newFromAirportLocationId,
    newToAirportLocationId,
    newStartDate,
    newFromAirportName,
    newToAirportName,
    newCityId,
    newCityName
  ) => {
    dispatch(changeFromAirportLocationId(newFromAirportLocationId));
    dispatch(changeToAirportLocationId(newToAirportLocationId));
    dispatch(changeStartDate(newStartDate));
    dispatch(changeCity({ id: newCityId, name: newCityName }));
    dispatch(changeHotelId(null));
    dispatch(changePageNumber(0));
    dispatch(changeFromAirportName(newFromAirportName));
    dispatch(changeToAirportName(newToAirportName));
    navigate("/combo");
  };

  return (
    <div className="container w-4/5  mx-auto mb-20 pb-10">
      <div className="my-5 flex gap-2">
        <span>
          <img
            src="https://cdn2.iconfinder.com/data/icons/advertisement-marketing/512/adevertisement_message-512.png"
            importance="low"
            loading="lazy"
            // srcSet="https://ik.imagekit.io/tvlk/image/imageResource/2024/03/21/1711002136291-9aa9885d81f33cafc62a860c5fc2e506.png?_src=imagekit&amp;tr=q-40,h-24 1x, https://ik.imagekit.io/tvlk/image/imageResource/2024/03/21/1711002136291-9aa9885d81f33cafc62a860c5fc2e506.png?_src=imagekit&amp;tr=dpr-2,q-40,h-24 2x, https://ik.imagekit.io/tvlk/image/imageResource/2024/03/21/1711002136291-9aa9885d81f33cafc62a860c5fc2e506.png?_src=imagekit&amp;tr=dpr-3,q-40,h-24 3x"
            alt=""
            height="24"
            width="24"
            style={{ objectFit: "fill", objectPosition: "50% 50%" }}
          />
        </span>
        <span className="font-bold text-xl">Rẻ hơn với combo</span>
      </div>
      <div className="flex mx-auto mt-7">
        <div
          onClick={() => {
            handleClick(
              1,
              2,
              new Date(2024, 3, 8).toISOString().split("T")[0],
              "Sân bay quốc tế Tân Sơn Nhất (SGN) (Thành phố Hồ Chí Minh)",
              "Sân bay quốc tế Nội Bài (HAN) (Thành phố Hà Nội)",
              24,
              "Thành phố Hà Nội"
            );
          }}

          className="w-max overflow-hidden hover:cursor-pointer bg-white rounded-lg shadow-md ml-4  transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
        >
          <div className="relative">
            <img
              className="w-64 h-full object-cover"
              src="https://vietnamtour.com/images/photos/thumb/top-vietnam-attractions-1-hanoi.jpg"
              alt="Imag"
            />
            <div className="absolute top-0 right-0">
              <div className="w-20 h-7 absolute top-2 right-0">
                <div className="h-full w-full bg-rose-600 text-white text-center text-sm leading-7 font-semibold transform">
                  -10% OFF
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-64">
            <div className="p-4  relative">
              <h3 className="text-lg font-semibold mb-1 whitespace-nowrap">
                Thành Phố Hà Nội
              </h3>
              <p className="text-gray-700 text-sm line-through">
                1.000.000 VNĐ
              </p>
              <p className="text-sm text-rose-500">900.000 VNĐ</p>
            </div>
            <div className="my-auto" style={{ marginLeft: "-40px" }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/VietJet_Air_logo.svg"
                alt="Vietject Airlines Logo"
                width={80}
                className="mx-6"
              />
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            handleClick(
              2,
              1,
              new Date(2024, 3, 8).toISOString().split("T")[0],
              "Sân bay quốc tế Nội Bài (HAN) (Thành phố Hà Nội)",
              "Sân bay quốc tế Tân Sơn Nhất (SGN) (Thành phố Hồ Chí Minh)",
              30,
              "Thành phố Hồ Chí Minh"
            );
          }}
          className="w-max overflow-hidden hover:cursor-pointer bg-white rounded-lg shadow-md ml-4  transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
        >
          <div className="relative">
            <img
              className="w-64 h-40 object-cover"
              src="https://ellisdownhome.com/wp-content/uploads/2020/01/shutterstock_718619584.jpg"
              alt="Imag"
            />
            <div className="absolute top-0 right-0">
              <div className="w-20 h-7 absolute top-2 right-0">
                <div className="h-full w-full bg-rose-600 text-white text-center text-sm leading-7 font-semibold transform">
                  -20% OFF
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-64">
            <div className="p-4 relative">
              <h3 className="text-lg font-semibold mb-1 whitespace-nowrap">
                Thành Phố Hồ Chí Minh
              </h3>
              <p className="text-gray-700 text-sm line-through">
                1.000.000 VNĐ
              </p>
              <p className="text-sm text-rose-500">800.000 VNĐ</p>
            </div>
            <div className="my-auto min-w-80" style={{ marginLeft: "-80px" }}>
              <img
                src="data:image/png;base64,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"
                alt="Mô tả logo"
                width={80}
                className="mx-6"
              />
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            handleClick(
              1,
              12,
              new Date(2024, 3, 8).toISOString().split("T")[0],
              "Sân bay quốc tế Tân Sơn Nhất (SGN) (Thành phố Hồ Chí Minh)",
              "Sân bay quốc tế Cần Thơ (VCA) (Cần Thơ)",
              14,
              "Thành phố Cần Thơ"
            );
          }}
          className="w-max overflow-hidden hover:cursor-pointer bg-white rounded-lg shadow-md ml-4  transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
        >
          <div className="relative">
            <img
              className="w-64 h-full object-cover"
              src="https://images.unsplash.com/photo-1517420128935-affdd8d90ca0?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div className="absolute top-0 right-0">
              <div className="w-20 h-7 absolute top-2 right-0">
                <div className="h-full w-full bg-rose-600 text-white text-center text-sm leading-7 font-semibold transform">
                  -20% OFF
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-64">
            <div className="p-4  relative">
              <h3 className="text-lg font-semibold mb-1 ">Cần Thơ</h3>
              <p className="text-gray-700 text-sm line-through">
                1.000.000 VNĐ
              </p>
              <p className=" text-sm text-rose-500">800.000 VNĐ</p>
            </div>
            <div className="my-auto">
              <img
                src="https://i.pinimg.com/564x/7a/ec/17/7aec17946661a88378269d0b642b61f3.jpg"
                alt="Vietnam Airlines Logo"
                width={50}
                className="mx-6"
              />
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            handleClick(
              2,
              3,
              new Date(2024, 3, 8).toISOString().split("T")[0],
              "Sân bay quốc tế Nội Bài (HAN) (Thành phố Hà Nội)",
              "Sân bay quốc tế Đà Nẵng (DAD) (Đà Nẵng)",
              14,
              "Thành phố Đà Nẵng"
            );
          }}
          className="w-max overflow-hidden hover:cursor-pointer bg-white rounded-lg shadow-md ml-4  transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
        >
          <div className="relative">
            <img
              className="w-64 h-full object-cover"
              src="https://images.unsplash.com/photo-1555979864-7a8f9b4fddf8?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div className="absolute top-0 right-0">
              <div className="w-20 h-7 absolute top-2 right-0">
                <div className="h-full w-full bg-rose-600 text-white text-center text-sm leading-7 font-semibold transform">
                  -20% OFF
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-64">
            <div className="p-4  relative">
              <h3 className="text-lg font-semibold mb-1">Đà Nẵng</h3>
              <p className="text-gray-700 text-sm line-through">
                1.000.000 VNĐ
              </p>
              <p className="text-sm text-rose-500">800.000 VNĐ</p>
            </div>
            <div className="my-auto">
              <img
                src="https://i.pinimg.com/564x/7a/ec/17/7aec17946661a88378269d0b642b61f3.jpg"
                alt="Vietnam Airlines Logo"
                width={50}
                className="mx-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComboDiscovery;
