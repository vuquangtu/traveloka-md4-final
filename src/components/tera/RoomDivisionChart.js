import React, { useEffect, useState } from "react";
import DivisionChart from "./DivisionChart";
import axios from "../../config/privateAxios";
import { useSelector } from "react-redux";
import {
  selectTeraHotelId,
  selectTeraHotel,
} from "../../redux/features/hotelTeraSlice";
import { Calendar } from "react-date-range";

function RoomDivisionChart({ id }) {
  const [date, setDate] = useState(new Date(2024, 3, 7));
  const [labels, setLabels] = React.useState([]);
  const [data, setData] = React.useState([]);
  const hotelId = useSelector(selectTeraHotelId);
  const hotel = useSelector(selectTeraHotel);

  useEffect(() => {
    axios
      .post(`/api/rooms/analyse`, {
        hotelId: id,
        date: date.toISOString().split("T")[0]
      })
      .then((res) => {
        setLabels(res.data.map((item) => item.roomTypeName));
        const section1 = res.data.map((item) => item.bookedQuantity);
        const section2 = res.data.map((item) => item.emptyQuantity);
        setData([
          {
            label: "Đã đặt",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            data: section1,
          },
          {
            label: "Còn trống",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            data: section2,
          },
        ]);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [date]);

  useEffect(() => { }, [labels, data]);

  function handleChangeDate(date) {
    setDate(date);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold self-end ml-24 mr-2 mt-12">
        Khách sạn {hotel.hotelName}
      </h2>
      <div className="hotel-chart-calendar-container">
        <Calendar
          minDate={new Date(2024, 3, 7)}
          maxDate={new Date(2024, 3, 13)}
          className="customCalender"
          date={date}
          onChange={handleChangeDate}
        />
      </div>
      <div className="w-full px-24 mx-auto" style={{ width: "100%", marginTop:"300px" }}>
        <DivisionChart labels1={labels} data1={data} />
      </div>
      <p className="text-center ml-20 mt-4 text-sm font-semibold">
        Bảng thống kê lượt đặt phòng của khách sạn trong{" "}
        {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
      </p>
    </div>
  );
}

export default RoomDivisionChart;
