import React, { useEffect } from "react";
import DivisionChart from "./DivisionChart";
import axios from "../../config/privateAxios";
import { useSelector } from "react-redux";
import { selectTeraFlight } from "../../redux/features/flightTeraSlice";

function FlightDivisionChart() {
  const date = new Date();
  const [labels, setLabels] = React.useState([]);
  const [data, setData] = React.useState([]);
  const flight = useSelector(selectTeraFlight);

  useEffect(() => {
    axios
      .post(`/api/seats/analyse`, {
        hotelId: flight.id,
      })
      .then((res) => {

        setLabels(res.data.map((item) => item.roomTypeName.charAt(0).toUpperCase() + item.roomTypeName.slice(1)));
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
  }, []);

  useEffect(() => {
  }, [labels, data]);
  return (
    <div>
      <div className="w-full px-12 mx-auto mt-16" style={{ width: "100%" }}>
        <DivisionChart labels1={labels} data1={data} />
      </div>
      <p className="text-center ml-20 mt-4 text-sm font-semibold">
        Bảng thống kê lượt đặt vé của chuyến bay
      </p>
    </div>
  );
}

export default FlightDivisionChart;
