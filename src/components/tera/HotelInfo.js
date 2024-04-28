import React, { useEffect, useState } from "react";
import axios from "../../config/privateAxios";
import BusinessIcon from "@mui/icons-material/Business";
import { useSelector } from "react-redux";
import { selectTeraHotelId } from "../../redux/features/hotelTeraSlice";
import { useNavigate } from "react-router-dom";

function HotelInfo({ id }) {
  const navigate = useNavigate();
  const [hotelInfo, setHotelInfo] = useState({});

  const [utilities, setUtilities] = useState([]);
  const [utilityTypes, setUtilityTypes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const hotelId = useSelector(selectTeraHotelId);
  const [displayState, setDisplayState] = useState(
    new Array(utilityTypes.length).fill(false)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/hotels/${id}`);
        console.log("rees", res.data);
        setHotelInfo(res.data.hotel);
        setUtilities(res.data.hotelUtilities);

        // Filter unique utility types and set it into state
        const hotelUtilTypes = res.data.hotelUtilities
          .map((item) => item.hotelUtilityType)
          .filter((item, index, self) => {
            return index === self.findIndex((t) => t.id === item.id);
          });
        setUtilityTypes(hotelUtilTypes);

        // Processing utilities based on utility types
        const utilityList = new Array(hotelUtilTypes.length).fill([]);
        res.data.hotelUtilities.forEach((item) => {
          hotelUtilTypes.forEach((type, index) => {
            if (type.id === item.hotelUtilityType.id) {
              utilityList[index].push(item);
            }
          });
        });
        setUtilities(utilityList);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    !isLoading && (
      <div
        className="w-full px-2 h-screen"
        style={{ backgroundColor: "#ebf1f5" }}
      >
        <div className=" mx-auto py-10 bg-white relative  h-screen">
          <div className="w-full mx-auto px-2">
            <div className="w-full px-2">
              <div
                className="underline text-blue-500 hover:cursor-pointer mb-4"
                onClick={() => navigate("/tera/room/register")}
              >
                Đăng ký phòng mới
              </div>
              <div className="font-bold text-2xl mb-4 ml-1">
                Khách sạn {hotelInfo.hotelName}
              </div>

              <div className="w-full ">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label>Mô tả khách sạn</label>
                    <div
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        webkitLineClamp: "6",
                        WebkitBoxOrient: "vertical",
                        lineHeight: "20px",
                      }}
                      className="px-3 pt-2 w-64 mr-14 rounded-md"
                    >
                      {hotelInfo.description}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full ">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className="  flex justify-between items-center ">
                    <label>Đánh giá khách sạn </label>
                    <div className="px-3 pt-2 w-64 mr-14 rounded-md">
                      {hotelInfo.hotelStar} sao
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="address">Địa chỉ khách sạn</label>
                    <div className="px-2 w-64 mr-14 h-8 rounded-md leading-5	">
                      {hotelInfo.address}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full relative">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <div>Thành phố</div>
                    <div className="w-64 text-start h-8 mr-14 pt-1 px-2 rounded-md">
                      <div className="flex items-center justitfy-between">
                        <div className="w-1/2 self-center whitespace-nowrap ">
                          {hotelInfo.city.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full relative">
                <div className="mx-4 pt-4 ">
                  <div className=" flex justify-between items-center ">
                    <div>Tiện ích</div>
                  </div>
                  {utilityTypes.map((item, index) => (
                    <div
                      className="relative  hover:cursor-pointer px-4 py-2 hover:bg-blue-100 "
                      key={item.id}
                    >
                      <div
                        className={`flex justify-between items-center  px-4 py-4 ${
                          index !== utilityTypes.length - 1
                            ? "border-b border-dotted border-slate-200"
                            : ""
                        }`}
                        onClick={() => {
                          const newDisplayState = [...displayState];
                          newDisplayState[index] = !newDisplayState[index];
                          setDisplayState(newDisplayState);
                        }}
                      >
                        <p>{item.name}</p>
                      </div>
                      {displayState[index] && (
                        <div className="z-10 bg-white text-gray-500 p-4">
                          {utilities[index].map((item, id) => (
                            <div
                              key={id}
                              className="max-h-max mb-4 flex items-center hover:cursor-pointer px-4 py-2 hover:bg-blue-100 rounded-md"
                            >
                              <BusinessIcon
                                style={{
                                  color: "rgb(1, 148, 243)",
                                  marginRight: "4px",
                                }}
                              />
                              <span className="font-semibold">{item.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default HotelInfo;
