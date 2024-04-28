import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTeraFlight } from "../../redux/features/flightTeraSlice";
import axios from "../../config/privateAxios";

function SeatInfo() {
  const selectedFlight = useSelector(selectTeraFlight);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/seats/flightInfo/${selectedFlight.id}`)
      .then((res) => {
        console.log("res", res.data);
        setSeats(res.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    console.log("seats", seats);
  }, [seats]);
  return (
    <div className="mt-2 grid grid-cols-4">
      {seats.length > 0 &&
        seats.map((seat, index) => (
          <div key={index} className="mb-1">
            <p className="font-semibold col-span-1">
              {seat.seatType.name.charAt(0).toUpperCase() +
                seat.seatType.name.slice(1)}
              :{" "}
            </p>
            <div style={{ fontSize: "14px" }}>
              <p>Số lượng: {seat.quantity}</p>
              <p className="text-nowrap">
                Đơn vị giá: {seat.unitPrice.toLocaleString("vi-VN")} VNĐ
              </p>
            </div>
          </div>
        ))}

      {seats.length === 0 && <div>Không có thông tin ghế</div>}
    </div>
  );
}

export default SeatInfo;
