import React, { useEffect, useState } from "react";
import RevenueChart from "./RevenueChart";
import axios from "../../config/privateAxios";
import {
  selectTeraHotelId,
  selectTeraHotel,
} from "../../redux/features/hotelTeraSlice";

import { selectTeraAirplaneId } from "../../redux/features/flightTeraSlice";

import { useSelector } from "react-redux";

function Chart({ type, id }) {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const hotel = useSelector(selectTeraHotel);
  const [hotelName, setHotelName] = useState(hotel.hotelName);
  let type1 = null;
  // eslint-disable-next-line default-case
  switch (type) {
    case "hotels":
      // eslint-disable-next-line react-hooks/rules-of-hooks
      type1 = "Khách sạn";
      break;
    case "airplane-brands":
      // eslint-disable-next-line react-hooks/rules-of-hooks
      type1 = "Hãng bay";
      break;
  }
  const types = [
    {
      name: "7 ngày",
      type: "day",
      quantity: 7,
    },
    { name: "3 tháng", type: "month", quantity: 3 },
    { name: "6 tháng", type: "month", quantity: 6 },
    { name: "12 tháng", type: "month", quantity: 12 },
  ];

  const [selectedType, setSelectedType] = useState(types[0]);

  const formatDate = (itemDate, type) => {
    const date = new Date(itemDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    switch (type.toLowerCase()) {
      case "day":
        return `${day}/${month}/${year}`;
      case "month":
        return `${month}/${year}`;
      case "year":
        return `${year}`;
      default:
        return `${day}/${month}/${year}`;
    }
  };

  useEffect(() => {
    axios
      .post(`http://localhost:8080/api/${type}/revenue`, {
        id: id,
        type: selectedType.type,
        quantity: selectedType.quantity,
      })
      .then((res) => {
        const listDate = res.data.map((item) => item.date);
        setLabels(
          listDate
            .map((item) => formatDate(item, selectedType.type))

            .reverse()
        );
        setData(res.data.map((item) => item.revenue).reverse());
        setHotelName(res.data[0].name);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [selectedType]);

  return (
    <div>
      <div className="flex items-cener justify-start gap-4 mt-12">
        <h2 className="text-2xl font-bold self-end ml-24 mr-2">
          {type1} {hotelName}
        </h2>
        {types.map((item, index) => (
          <div
            key={index}
            className={`py-1 px-2 border text-sm border-slate-300 border-solid bg-white rounded-xl hover:cursor-pointer hover:bg-slate-100 
                      ${
                        item.name === selectedType.name
                          ? "bg-gray-300"
                          : "bg-white"
                      }
                      `}
            onClick={() => {
              setSelectedType(item);
            }}
          >
            {item.name}
          </div>
        ))}
      </div>

      <div className="w-full px-24 mx-auto mt-16" style={{ width: "100%" }}>
        <RevenueChart labels1={labels} data1={data} />
      </div>
      <p className="text-center ml-20 mt-4 text-sm font-semibold">
        Bảng thống kê doanh thu của khách sạn trong {selectedType.name}
      </p>
    </div>
  );
}

export default Chart;
