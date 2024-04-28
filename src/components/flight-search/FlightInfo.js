import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectFlightDetailsDTO,
  selectFromAirPortLocationName,
  selectToAirPorLocationName,
} from "../../redux/features/flightSlice";
import GifIcon from "../icon/GifIcon";
import ProductPointsIcons from "../icon/ProductPointsIcons";
import BriefCaseIcon from "../icon/BriefCaseIcon";
import UtensilsIcon from "../icon/UtensilsIcon";
import DesktopIcon from "../icon/DesktopIcon";
import SeatInfo from "./SeatInfo";

function FlightInfo() {
  const [showSeatInfo, setShowSeatInfo] = useState(false);
  const [selectedFlightPrice, setSelectedFlightPrice] = useState(null);

  const [selectedFlight, setSelectedFlight] = useState(null);
  const handleClose = () => {
    setShowSeatInfo(false);
  };
  const flightInfo = useSelector(selectFlightDetailsDTO);
  const fromAirportLocationName = useSelector(
    selectFromAirPortLocationName
  ).slice(-3);
  const toAirportLocationName = useSelector(selectToAirPorLocationName).slice(
    -3
  );

  const formatAirlineName = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const handleSelectClick = (flight) => {
    setShowSeatInfo(true);
    setSelectedFlight(flight);
    if (flight.unitPrice && !isNaN(flight.unitPrice)) {
      setSelectedFlightPrice(flight.unitPrice);
    } else {
      console.error("Invalid flight.unitPrice:", flight.unitPrice);
    }
  };

  const handleSeatSelect = (seatPrice) => {
    setSelectedFlightPrice(seatPrice);
  };
  return flightInfo && flightInfo.length > 0 ? (
    <div className="flex flex-col gap-2 w-full mt-4">
      {flightInfo.map((flightDetail, index) => (
        <div
          className="flight-search-info bg-white px-4 py-2 rounded-md shadow-md sm:w-2/3 lg:w-1/2 mb-2"
          style={{ width: "90%" }}
          key={index}
        >
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="flex flex-col gap-2 w-72">
                <div className="flex items-center">
                  <img
                    src={flightDetail.airPlant.logoUrl}
                    loading="lazy"
                    decoding="async"
                    height="24"
                    alt="Airplane Icon"
                    className="max-w-6 object-contain mr-2"
                  />
                  <h2 className=" font-medium">
                    {formatAirlineName(flightDetail.airPlant.name)}
                  </h2>
                </div>
                <div className="flex border-solid items-center justify-center border border-green-300 rounded-xl text-green-500 px-2 pb-1 gap-3 w-24">
                  <BriefCaseIcon />
                  <UtensilsIcon />
                  <DesktopIcon />
                </div>
              </div>
              <div className="flex gap-3 w-72">
                <div className="flex flex-col mt-5 items-center justify-center">
                  <p>
                    {new Date(flightDetail.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </p>
                  <p className="text-sm text-gray-500">
                    {fromAirportLocationName}
                  </p>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center">
                  <p className="text-sm text-gray-500">
                    {Math.floor(flightDetail.timeInterval / 60)}h&nbsp;
                    {flightDetail.timeInterval % 60}m
                  </p>

                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-gray-400 rounded-full opacity-50"></div>
                    <div className="h-0.5 w-20 bg-gray-400"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <p className=" text-gray-500 text-sm">Bay Thẳng</p>
                </div>
                <div className="flex flex-col mt-5 items-center justify-center">
                  <p>
                    {new Date(flightDetail.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </p>
                  <p className="text-sm text-gray-500">
                    {toAirportLocationName}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center pl-5 w-40 mt-1">
                <div className="flex items-center">
                  <p className="text-red-500 whitespace-nowrap">
                    {flightDetail.unitPrice.toLocaleString("vi-VN")} VND
                  </p>
                  <p className="text-gray-500 text-xs"> /khách</p>
                </div>
                <div className="flex items-center">
                  <ProductPointsIcons />
                  <p className="text-sm ml-2 whitespace-nowrap">
                    Nhận {Math.round(flightDetail.unitPrice / 1000)} điểm
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <div
                className="border-solid border border-red-500 text-red-500 rounded-xl py-1 px-2 "
                style={{ fontSize: "14px" }}
              >
                Thêm ưu đãi
              </div>
              <div
                className="border-solid border border-green-500 rounded-xl text-green-500 py-1 px-2"
                style={{ fontSize: "14px" }}
              >
                Tặng gói mã 800k
              </div>
            </div>
          </div>
          <div
            className="bg-white text-gray-900 mt-2"
            style={{ fontSize: "14px" }}
          >
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-blue-600">
                  Chi tiết
                </Link>
                <Link href="#" className="hover:text-blue-600">
                  Giá vé & Quyền lợi
                </Link>
                <Link href="#" className="hover:text-blue-600">
                  Hoàn vé
                </Link>
                <Link href="#" className="hover:text-blue-600">
                  Đổi lịch
                </Link>
                <div className="flex items-center gap-2">
                  <Link href="#" className="hover:text-blue-600">
                    Khuyến mãi
                  </Link>
                  <GifIcon />
                </div>
              </div>
              <button
                className="bg-blue-600 text-white rounded px-8 py-2"
                onClick={() => handleSelectClick(flightDetail)}
              >
                Chọn
              </button>
            </div>
          </div>
        </div>
      ))}
      {showSeatInfo ? (
        <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
      ) : null}
      {showSeatInfo && (
        <SeatInfo
          selectedFlight={selectedFlight}
          onClose={handleClose}
          onSeatSelect={handleSeatSelect}
          selectedFlightPrice={selectedFlightPrice}
        />
      )}
    </div>
  ) : (
    <h1 className="text-center mt-4">Không tìm thấy chuyến bay phù hợp.</h1>
  );
}

export default FlightInfo;
