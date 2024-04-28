import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAirPlaneSearchDTO,
  setError,
  setFlightDetailsDTO,
  setFlightInForShortDescriptions,
  setFromAirPortLocationName,
  setToAirPortLocationName,
  updateAirPlaneId,
  updateSearchParams,
} from "../../redux/features/flightSlice";
import axios from "../../config/privateAxios";
import { useNavigate } from "react-router-dom";
function FlightDiscovery() {
  const currentDate = new Date(2024, 3, 7).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const searchFlights = (searchParams) => {
    dispatch(updateSearchParams(searchParams));

    navigate("/flight-search");
  };
  return (
    <div className="container w-4/5 mx-auto mb-20 ">
      <div className="my-5 flex gap-2">
        <span>
          <img
            src="https://ik.imagekit.io/tvlk/image/imageResource/2024/03/21/1711002136291-9aa9885d81f33cafc62a860c5fc2e506.png?_src=imagekit&amp;tr=q-40,h-24"
            importance="low"
            loading="lazy"
            alt="Departure Airport Logo"
            // srcSet="https://ik.imagekit.io/tvlk/image/imageResource/2024/03/21/1711002136291-9aa9885d81f33cafc62a860c5fc2e506.png?_src=imagekit&amp;tr=q-40,h-24 1x, https://ik.imagekit.io/tvlk/image/imageResource/2024/03/21/1711002136291-9aa9885d81f33cafc62a860c5fc2e506.png?_src=imagekit&amp;tr=dpr-2,q-40,h-24 2x, https://ik.imagekit.io/tvlk/image/imageResource/2024/03/21/1711002136291-9aa9885d81f33cafc62a860c5fc2e506.png?_src=imagekit&amp;tr=dpr-3,q-40,h-24 3x"
            height="24"
            style={{ objectFit: "fill", objectPosition: "50% 50%" }}
          />
        </span>
        <span className="font-bold text-xl">Du hành xuyên Việt</span>
      </div>
      <div className="flex gap-4 justify-center mx-4 mt-7">
        <div
          onClick={() => {
            const searchParams = {
              fromAirportLocationId: 1,
              toAirportLocationId: 2,
              startDate: new Date(2024, 3, 8).toISOString(),
              seatTypeId: 1,
              seatQuantity: 1,
            };
            dispatch(updateSearchParams(searchParams));
            dispatch(setFromAirPortLocationName("Thành phố Hồ Chí Minh - SGN"));
            dispatch(setToAirPortLocationName("Thành phố Hà Nội - HAN"));

            searchFlights(searchParams);
          }}
          className="relative bg-white rounded-lg  w-full p-0  shadow-md  max-w-xs overflow-hidden transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 hover:cursor-pointer"
        >
          <img
            className="h-64 w-full object-cover"
            src="https://ik.imagekit.io/tvlk/image/imageResource/2021/11/25/1637851505067-e5745050cc951e5c9c11b01c1d0ff920.png?tr=q-75,w-320"
            alt="Hình ảnh Hội An"
          />
          <div className="absolute top-0 left-0 bg-black text-white rounded-br-lg px-2 py-1">
            ONEWAY
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <div
                className="flex-shrink-0"
                style={{ width: "30px", height: "30px" }}
              >
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2023/01/13/1673603664183-e53540c1a998ad11eab640ea454ead69.png?tr=q-75,w-24,h-24"
                  alt="icon vietnamAirLines"
                />
              </div>
              <div className="text-gray-500">VietNam Airlines</div>
            </div>
            <p className="mt-2 text-black font-semibold">TPHCM - Hà Nội</p>
            <p className="mt-2 text-black">{currentDate}</p>
            <p className="mt-2 text-red-500 font-semibold">849.127 VND</p>
          </div>
        </div>
        <div
          onClick={() => {
            const customDate = new Date(2024, 3, 7);

            const searchParams = {
              fromAirportLocationId: 2,
              toAirportLocationId: 1,
              startDate: new Date(2024, 3, 8).toISOString(),
              seatTypeId: 1,
              seatQuantity: 1,
            };
            dispatch(updateSearchParams(searchParams));
            dispatch(setFromAirPortLocationName("Thành phố Hà Nội - HAN"));
            dispatch(setToAirPortLocationName("Thành phố Hồ Chí Minh - SGN"));
            searchFlights(searchParams);
          }}
          className="relative bg-white rounded-lg  w-full p-0  shadow-md overflow-hidden max-w-xs transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 hover:cursor-pointer"
        >
          <img
            className="h-64 w-full object-cover"
            src="http://media.dulich24.com.vn/bai-viet/tu-van-du-lich-thanh-pho-ho-chi-minh-1.jpg"
            alt="Hình ảnh Thành Phố Hồ Chí Minh"
          />
          <div className="absolute top-0 left-0 bg-black text-white rounded-br-lg px-2 py-1">
            ONEWAY
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <div
                className="flex-shrink-0"
                style={{ width: "30px", height: "30px" }}
              >
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2021/03/08/1615183128719-eb20dcaed13e5b74629b222345995b7a.png?tr=q-75,w-24,h-24"
                  alt="VietTravel Airlines Logo"
                />
              </div>
              <div className="text-gray-500">VietTravel Airlines</div>
            </div>
            <p className="mt-2 text-black font-semibold">Hà Nội - TPHCM</p>
            <p className="mt-2 text-black">{currentDate}</p>
            <p className="mt-2 text-red-500 font-semibold">1.200.841 VND</p>
          </div>
        </div>
        <div
          onClick={() => {
            const customDate = new Date(2024, 3, 7);

            const searchParams = {
              fromAirportLocationId: 1,
              toAirportLocationId: 3,
              startDate: new Date(2024, 3, 8).toISOString(),
              seatTypeId: 1,
              seatQuantity: 1,
            };
            dispatch(updateSearchParams(searchParams));
            dispatch(setFromAirPortLocationName("Thành phố Hồ Chí Minh - SGN"));
            dispatch(setToAirPortLocationName("Thành phố Đà Nẵng - DAD"));
            searchFlights(searchParams);
          }}
          className="relative bg-white rounded-lg  w-full p-0  shadow-md overflow-hidden max-w-xs transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 hover:cursor-pointer"
        >
          <img
            className="h-64 w-full object-cover"
            src="https://focusasiatravel.vn/wp-content/uploads/2019/11/du-lich-bien-da-nang1.jpg"
            alt="Hình ảnh Đà Nẵng"
          />
          <div className="absolute top-0 left-0 bg-black text-white rounded-br-lg px-2 py-1">
            ONEWAY
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <div
                className="flex-shrink-0"
                style={{ width: "30px", height: "30px" }}
              >
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2023/01/13/1673603664183-e53540c1a998ad11eab640ea454ead69.png?tr=q-75,w-24,h-24"
                  alt="icon vietnamAirLines"
                />
              </div>
              <div className="text-gray-500">VietNam Airlines</div>
            </div>
            <p className="mt-2 text-black font-semibold">TPHCM - Đà Nẵng</p>
            <p className="mt-2 text-black">{currentDate}</p>
            <p className="mt-2 text-red-500 font-semibold">1.123.000 VND</p>
          </div>
        </div>
        <div
          onClick={() => {
            const searchParams = {
              fromAirportLocationId: 3,
              toAirportLocationId: 1,
              startDate: new Date(2024, 3, 8).toISOString(),
              seatTypeId: 1,
              seatQuantity: 1,
            };
            dispatch(updateSearchParams(searchParams));
            dispatch(setFromAirPortLocationName("Thành phố Đà Nẵng - DAD"));
            dispatch(setToAirPortLocationName("Thành phố Hồ Chí Minh - SGN"));
            searchFlights(searchParams);
          }}
          className="relative bg-white rounded-lg  w-full p-0  shadow-md overflow-hidden max-w-xs transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 hover:cursor-pointer"
        >
          <img
            className="h-64 w-full object-cover"
            src="https://checkinvietnam.vtc.vn/media/20220807/images/tp-hcm-to-chuc-le-trao-giai-world-travel-awards-2022-4.jpg"
            alt="Hình ảnh Thành Phố Hồ Chí Minh 2 "
          />
          <div className="absolute top-0 left-0 bg-black text-white rounded-br-lg px-2 py-1">
            ONEWAY
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <div
                className="flex-shrink-0"
                style={{ width: "30px", height: "30px" }}
              >
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2020/02/19/1582084897287-d2de240a06eac5e3a70126425b62ee0b.png?tr=q-75,w-24,h-24"
                  alt="bambo airlines"
                />
              </div>
              <div className="text-gray-500">Bamboo Airways</div>
            </div>
            <p className="mt-2 text-black font-semibold">Đà Nẵng - TPHCM</p>
            <p className="mt-2 text-black">{currentDate}</p>
            <p className="mt-2 text-red-500 font-semibold">800.000 VND</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightDiscovery;
