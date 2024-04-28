import React, { useEffect, useRef, useState } from "react";
import SystemToolSortIcon from "../icon/SystemToolSortIcon";
import ArrowDownIcon from "../icon/ArrowDownIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFlightInforShortDescriptions,
  selectSearchParams,
  setSearchParams,
} from "../../redux/features/flightSlice";

function FlightSort() {
  const popupRef = useRef(null);
  const dispatch = useDispatch();
  const searchParams = useSelector(selectSearchParams);
  const flightInforShortDescription = useSelector(
    selectFlightInforShortDescriptions
  );

  const sortFlights = (property, order) => {
    const updatedSearchParams = {
      ...searchParams,
      sortBy: property,
      order: order,
    };
    dispatch(setSearchParams(updatedSearchParams));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isActive, setIsActive] = useState({
    div1: false,
    div2: false,
    div3: false,
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (sortType) => {
    setShowPopup(false);
    switch (sortType) {
      case "priceAsc":
        sortFlights("unitPrice", "asc");
        break;
      case "duration":
        sortFlights("duration", "");
        break;
      case "startTimeAsc":
        sortFlights("startTime", "asc");
        break;
      case "startTimeDesc":
        sortFlights("startTime", "desc");
        break;
      case "endTimeAsc":
        sortFlights("endTime", "asc");
        break;
      case "endTimeDesc":
        sortFlights("endTime", "desc");
        break;
      default:
        sortFlights("", "");
        break;
    }
  };

  return (
    flightInforShortDescription &&
    flightInforShortDescription.length > 0 && (
      <div className="w-full mt-4">
        {" "}
        <div
          className="flex h-16 items-center gap-2 border-b mr-4 border-solid border-slate-300 rounded-lg text-sm"
          style={{ width: "90%" }}
        >
          {flightInforShortDescription.map((item, index) => (
            <div
              key={index}
              className={`w-1/3 text-center py-1 hover:border-blue-300 hover:border-2 hover:cursor-pointer hover:border-solid rounded-lg hover:bg-sky-100 
      ${isActive[`div${index + 1}`] ? "bg-slate-100" : ""}`}
              onClick={() => {
                const updatedIsActive =
                  index === 0
                    ? { div1: true, div2: false, div3: false }
                    : { div1: false, div2: true, div3: false };

                setIsActive(updatedIsActive);

                index === 0 ? handleClick("priceAsc") : handleClick("duration");
              }}
            >
              <p style={{ color: "rgb(1, 148, 243)" }}>{item.name}</p>
              <p className="text-xs" style={{ color: "rgb(104, 113, 118)" }}>
                {item.unitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ
              </p>
            </div>
          ))}
          <div className="relative"></div>
          <div
            className={`text-center w-1/3 flex justify-center gap-4 items-center py-1 mr-4 hover:border-sky-300 hover:border-2 hover:cursor-pointer hover:border-solid  rounded-lg hover:bg-sky-100
         ${isActive.div3 ? "bg-slate-100" : ""}`}
            onClick={() => {
              setIsActive({ div3: true, div1: false, div2: false });
              setShowPopup(!showPopup);
            }}
          >
            <div>
              <p>
                <SystemToolSortIcon />
              </p>
            </div>
            <div>
              <p style={{ color: "rgb(1, 148, 243)" }}>Khác</p>
            </div>
            <div>
              <p>
                <ArrowDownIcon />
              </p>
            </div>
          </div>
        </div>
        {showPopup && (
          <div
            ref={popupRef}
            className={`w-3/12 border border-solid border-slate-300 bg-white absolute z-10 rounded-md float-right mr-6 transition-all duration-300 ease-in-out`}
            style={{
              width: "35%",
              marginTop: "-8px",
              marginRight: "88px",
              opacity: showPopup ? 1 : 0,
              transform: showPopup ? "translateY(0)" : "translateY(10px)",
              right: "-20px",
            }}
          >
            <div>
              <p
                className={`px-3 py-3 border-b border-solid border-slate-200 rounded-md text-sm hover:bg-slate-100 active:bg-sky-100`}
                style={{ fontWeight: "600" }}
                onClick={() => handleClick("startTimeAsc")}
              >
                Cất cánh sớm nhất
              </p>
              <p
                className="px-3 py-3 border-b border-solid border-slate-200 rounded-md text-sm hover:bg-slate-100 active:bg-sky-100"
                style={{ fontWeight: "600" }}
                onClick={() => handleClick("startTimeDesc")}
              >
                Cất cánh muộn nhất
              </p>
              <p
                className="px-3 py-3 border-b border-solid border-slate-200 rounded-md text-sm hover:bg-slate-100 active:bg-sky-100"
                style={{ fontWeight: "600" }}
                onClick={() => handleClick("endTimeAsc")}
              >
                Hạ cánh sớm nhất
              </p>
              <p
                className="px-3 py-3 rounded-md text-sm hover:bg-slate-100 active:bg-sky-100"
                style={{ fontWeight: "600" }}
                onClick={() => handleClick("endTimeDesc")}
              >
                Hạ cánh muộn nhất
              </p>
            </div>
          </div>
        )}
      </div>
    )
  );
}
export default FlightSort;
