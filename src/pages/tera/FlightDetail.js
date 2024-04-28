import React, { useState } from "react";
import TeraHeader from "../../components/tera/TeraHeader";
import ChartNav from "../../components/tera/ChartNav";
import FlightInfo from "../../components/tera/FlightInfo";
import SeatInfo from "../../components/tera/SeatInfo";
import Chart from "../../components/tera/Chart";
import BackButton from "../../components/buttons/BackButton";
import { useParams } from "react-router-dom";


function FlightDetail() {
    const { id } = useParams();

  const navItems = [
    { id: 0, name: "Thông tin chuyến bay" },
    { id: 1, name: "Doanh thu" },
  ];
  const [selectedNav, setSelectedNav] = useState(0);
  const content = () => {
    switch (selectedNav) {
      case 0:
        return <FlightInfo id={id}/>;
      case 1:
        return <Chart type="airplane-brands" id={id} />;
      default:
        return <FlightInfo />;
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

export default FlightDetail;
