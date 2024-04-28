import React, { useState, useEffect } from "react";
import axios from "../../config/privateAxios";
import BusinessIcon from "@mui/icons-material/Business";
import { useSelector } from "react-redux";
import { selectTeraHotelId } from "../../redux/features/hotelTeraSlice";
import RoomInfoItem from "./RoomInfoItem";

function RoomInfo({ id }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const hotelId = useSelector(selectTeraHotelId);
  const [selectedRoomType, setSelectedRoomType] = useState([]);
  const [selectedBedType, setSelectedBedType] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/rooms/hotel/${id}`);
        setData(res.data);
        setSelectedRoomType(Array(res.data.length).fill(false));
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [hotelId]);

  const handleShow = (index) => {
    const temp = [...selectedRoomType];
    temp[index] = !temp[index];
    setSelectedRoomType(temp);
  };
  return (
    !isLoading && (
      <div className="w-full mt-10 px-2" style={{ backgroundColor: "#ebf1f5" }}>
        <div className="w-full mx-auto  bg-white relative">
          <h3 className="font-bold text-2xl mb-4 ml-1">Thông tin phòng</h3>
          {data.map((item, index) => (
            <div key={index}>
              <p
                className={`h-10 py-3 px-4 bg-slate-100 hover:cursor-pointer hover:bg-slate-300 ${
                  selectedRoomType === item.id ? "bg-slate-500" : ""
                }`}
                onClick={() => handleShow(index)}
              >
                Loại phòng :{" "}
                <span className="font-semibold">{item.roomType.name}</span>
              </p>
              {selectedRoomType[index] &&
                data[index].rooms.map((room) => <RoomInfoItem room={room} />)}
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default RoomInfo;
