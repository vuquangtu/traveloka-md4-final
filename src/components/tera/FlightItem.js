import React, { useState } from "react";
import FlightDivisionChart from "./FlightDivisionChart";
import SeatInfo from "./SeatInfo";

function FlightItem({ flight, index, page, size }) {
  const [showSeat, setShowSeat] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const formatDate = (date) => {
    return new Date(date).toLocaleString("vi-VN");
  };

  return (
    <div className="mx-auto mt-4 leading-6 border border-solid p-4 border-slate-200 bg-slate-50">
      <div className="">
        <div className="flex justify-start gap-4 px-4">
          <span className="text-nowap ">
            {index + 1 + size * page}. Chuyến bay
          </span>
          <div>
            <p className=" font-semibold text-center text-nowrap">
              {flight?.fromAirPortLocation.name || "Thành phố Hồ Chí Minh"}
            </p>
            <p
              className="text-center text-gray-500"
              style={{ fontSize: "14px" }}
            >
              {formatDate(flight?.startTime) || "05:03 29/03/2024"}
            </p>
          </div>
          <span className=""> → </span>
          <div>
            <p className=" font-semibold text-center text-nowrap">
              {flight?.toAirPortLocation?.name || "Đà Nẵng"}
            </p>
            <p
              className="text-center text-gray-500"
              style={{ fontSize: "14px" }}
            >
              {formatDate(flight?.endTime) || "15:08 29/03/2024"}
            </p>
          </div>
        </div>
        <div className="flex " style={{ fontSize: "14px" }}></div>
      </div>
      <div className="mt-4 text-gray-500">
        <span
          className={`hover:cursor-pointer hover:text-blue-500 mr-16 px-4 ${
            showSeat ? "text-blue-500" : ""
          }`}
          onClick={() => {
            setShowSeat(!showSeat);
            setShowBook(false);
          }}
        >
          Chi tiết ghế
        </span>
        <span
          className={`hover:cursor-pointer hover:text-blue-500 ${
            showBook ? "text-blue-500" : ""
          }`}
          onClick={() => {
            setShowBook(!showBook);
            setShowSeat(false);
          }}
        >
          Số lượt đặt vé
        </span>
      </div>
      <div className="bg-white">{showBook && <FlightDivisionChart />}</div>
      <div className="ml-4">{showSeat && <SeatInfo />}</div>
    </div>
  );
}

export default FlightItem;
