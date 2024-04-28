import React, { useEffect, useState } from "react";
import axios from "../../config/privateAxios";
import BusinessIcon from "@mui/icons-material/Business";

function RoomInfoItem({ room }) {
  const [roomInfo, setRoomInfo] = useState(room);
  const [utilities, setUtilities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [roomTypeName, setRoomTypeName] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/room-utilities/room/${room.id}`)
      .then((res) => {
        setUtilities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [room]);

  useEffect(() => {
    if (utilities.length > 0) {
      setLoading(false);
    }
  }, [utilities]);

  return (
    <div
      className="w-full h-max mb-10 border-b border-solid border-slate-400"
      style={{ backgroundColor: "#ebf1f5" }}
    >
      <div className=" mx-auto  bg-white relative   ">
        <div className="w-full mx-auto px-2">
          <div className="w-full px-2">
            <div className="w-full ">
              <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                <div className=" flex justify-between items-center ">
                  <label>Số lượng:</label>
                  <div className="px-3 pt-2 w-64 mr-14 rounded-md">
                    {room.quantity}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full ">
              <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                <div className="  flex justify-between items-center ">
                  <label>Giá gốc </label>
                  <div className="px-3 pt-2 w-64 mr-14 rounded-md">
                    {room.unitPriceOrigin} VNĐ
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                <div className=" flex justify-between items-center ">
                  <label htmlFor="address">Giá bán</label>
                  <div className="px-2 w-64 mr-14 h-8 rounded-md">
                    {room.unitPriceSell}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full relative">
              <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                <div className=" flex justify-between items-center ">
                  <div>Số người tối đa</div>
                  <div className="w-64 text-start h-8 mr-14 pt-1 px-2 rounded-md">
                    <div className="flex items-center justitfy-between">
                      <div className="w-1/2 self-center whitespace-nowrap ">
                        {room.maxPerson}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                <div className=" flex justify-between items-center ">
                  <label htmlFor="address">Kích thước </label>
                  <div className="px-2 w-64 mr-14 h-8 rounded-md">
                    {room.size} m<sup>2</sup>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                <div className=" flex justify-between items-center ">
                  <label htmlFor="address">Loại giường</label>
                  <div className="px-2 w-64 mr-14 h-8 rounded-md">
                    {room.bedType.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full relative">
              <div className="mx-4 pt-4 ">
                <div className=" flex justify-between items-center ">
                  <div>Tiện ích</div>
                </div>
                {utilities.map((item, index) => (
                  <div className="relative" key={item.id}>
                    <div
                      className={`flex justify-between items-center  px-4 py-4 ${
                        index !== utilities.length - 1
                          ? "border-b border-dotted border-slate-200"
                          : ""
                      }`}
                    >
                      <p>{item.roomUtilityType.name}</p>
                    </div>

                    <div className="z-10 bg-white text-gray-500">
                      {item.roomUtilityList.map((item2, id) => (
                        <p
                          key={id}
                          className="max-h-max mb-4 flex items-center hover:cursor-pointer px-4 py-2"
                        >
                          <BusinessIcon
                            style={{
                              color: "rgb(1, 148, 243)",
                              marginRight: "4px",
                            }}
                          />
                          <span>{item2.name}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RoomInfoItem;
