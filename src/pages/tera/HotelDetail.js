import React, { useState } from "react";
import TeraHeader from "../../components/tera/TeraHeader";
import ChartNav from "../../components/tera/ChartNav";
import { useNavigate, useParams } from "react-router-dom";
import HotelInfo from "../../components/tera/HotelInfo";
import RoomInfo from "../../components/tera/RoomInfo";
import RoomDivisionChart from "../../components/tera/RoomDivisionChart";
import Chart from "../../components/tera/Chart";
import BackButton from "../../components/buttons/BackButton";
import FrameComment from "../hotel/FrameComment";

function HotelDetail() {
  const { id } = useParams();
  const navItems = [
    { id: 1, name: "Thông tin khách sạn" },
    { id: 2, name: "Thông tin phòng" },
    { id: 3, name: "Số lượt đặt phòng" },
    { id: 4, name: "Doanh thu" },
  ];
  const [selectedNav, setSelectedNav] = useState(0);
  const content = () => {
    switch (selectedNav) {
      case 1:
        return <HotelInfo id={id} />;
      case 2:
        return <RoomInfo id={id} />;

      case 3:
        return <RoomDivisionChart id={id} />;
      case 4:
        return <Chart type="hotels" id={id} />;
      default:
        return <HotelInfo id={id} />;
    }
  };

  return (
    <div>
      <BackButton />
      <div
        style={{
          fontFamily: "Roboto, sans-serif, Helvetica Neue,Arial, ",
          color: "#373A3C",
        }}
      >
        <TeraHeader />

        <div className="h-screen w-4/5 mx-auto">
          <div className="grid grid-cols-12  ">
            <div className="col-span-3 h-screen ">
              <ChartNav
                items={navItems}
                selected={(data) => {
                  setSelectedNav(data);
                }}
              />
            </div>
            <div className="col-span-9 bg-white h-screen">{content()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetail;
