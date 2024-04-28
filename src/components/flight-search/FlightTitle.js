import React, { useEffect, useRef, useState } from "react";
import Calendar from "../utils/Calender";
import { useDispatch, useSelector } from "react-redux";
import FlightSort from "./FlightSort";
import FlightInfo from "./FlightInfo";
import FlightFilter from "./flightFilter";
import BellIcon from "../icon/BellIcon";
import SearchIcon from "../icon/SearchIcon";
import { ArrowRightIcon } from "@mui/x-date-pickers";
import CalenderIcon from "../icon/CalenderIcon";
import {
  selectFromAirPortLocationName,
  selectSearchParams,
  selectSeatTypeName,
  selectToAirPorLocationName,
  setSearchParams,
  setAirPlaneSearchDTO,
  setError,
  setFlightDetailsDTO,
  setFlightInForShortDescriptions,
  setSearched,
} from "../../redux/features/flightSlice";
import axios from "../../config/privateAxios";
import Search from "../flights/Search";
function FlightTitle() {
  const dispatch = useDispatch();
  const fromAirportLocationsName = useSelector(selectFromAirPortLocationName);
  const toAirportLocationName = useSelector(selectToAirPorLocationName);
  const searchParams = useSelector(selectSearchParams);
  const seatTypeName = useSelector(selectSeatTypeName);
  let formattedDate = formatDate(searchParams.startDate);
  const seatQuantity = searchParams.seatQuantity;

  const [startDate, setStartDate] = useState(searchParams.startDate);
  const [selectedDates, setSelectedDates] = useState(Array(6).fill(false));
  const [isHovered, setIsHovered] = useState(false);
  const [listDate, setListDate] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isChanged, setChanged] = useState(false);
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  }

  useEffect(() => {
    setStartDate(searchParams.startDate);
  }, [searchParams]);

  const [calendarPosition, setCalendarPosition] = useState(0);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCalendar && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);
  useEffect(() => {
    let isEqual;
    let isInList = true;
    if (listDate && listDate.length > 0) {
      const isoDate = new Date(startDate);
      const lastDate = listDate[listDate.length - 1];
      const firstDate = listDate[0];
      isEqual =
        isoDate.getDate() === lastDate.getDate() &&
        isoDate.getMonth() === lastDate.getMonth() &&
        isoDate.getFullYear() === lastDate.getFullYear();
      isInList = isoDate >= firstDate && isoDate <= lastDate;
    }
    if (isEqual || listDate.length === 0 || (isChanged && !isInList)) {
      const tempList = [];
      for (let i = 0; i < 6; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        tempList.push(date);
      }
      setListDate(tempList);
    }
  }, [startDate, isChanged, listDate]);

  useEffect(() => {
    const newSelectedDates = Array(6).fill(false);
    newSelectedDates[0] = true;
    setSelectedDates(newSelectedDates);
  }, [listDate]);

  const handleClick = (index) => {
    const newSelectedDates = Array(6).fill(false);
    newSelectedDates[index] = true;
    setSelectedDates(newSelectedDates);
    if (index >= 6) {
      setCalendarPosition(index - 5);
    } else {
      setCalendarPosition(0);
    }
  };
  const formateDate = (date) => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const isoString = `${year}-${month}-${day}T00:00:00.000Z`;
    return isoString;
  };

  const handleSearchDate = (date) => {
    const isoString = formateDate(date);

    const updatedSearchParams = {
      ...searchParams,
      startDate: isoString,
      sortBy: "startTime",
      order: "asc",
      durationFrom: 0,
      durationTo: null,
      priceFrom: 0,
      priceTo: null,
      page: 0,
    };
    dispatch(setSearchParams(updatedSearchParams));
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/flights/search",
        searchParams
      );

      if (response.data && response.data.flightDetailsDTO) {
        dispatch(setFlightDetailsDTO(response.data.flightDetailsDTO));
        dispatch(setAirPlaneSearchDTO(response.data.airPlantSearchDTO));
        dispatch(
          setFlightInForShortDescriptions(
            response.data.flightInForShortDescriptions
          )
        );
      } else {
        console.error("API response does not contain the required arrays");
        dispatch(setFlightDetailsDTO([]));
        dispatch(setAirPlaneSearchDTO([]));
        dispatch(setFlightInForShortDescriptions([]));
      }
      dispatch(setSearched(true));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  return (
    <div className="flight-title">
      <div className="flex w-4/5 mx-auto gap-12 ">
        <FlightFilter />
        <div className="flex flex-col">
          <div className="container w-full" style={{ width: "90%" }}>
            <div
              className="bg-cover bg-center my-2 rounded-lg"
              style={{
                backgroundImage: `linear-gradient(to left bottom, transparent 50%, white), url('https://ik.imagekit.io/tvlk/blog/2021/04/DEFAULT-ARTICLE-DESKTOP-Large.png')`,
              }}
            >
              <div className="h-3 "></div>
              <div className="flex w-11/12 rounded-lg mx-3 bg-blue-500">
                <div
                  className={`rounded-lg w-${
                    isHovered ? "full" : "11/12"
                  } mr-3 py-2 bg-white transition-all duration-300 ease-in-out`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="flex justify-between mx-4">
                    <div>
                      <p className="mb-2 font-semibold flex gap-1">
                        <span>{fromAirportLocationsName}</span>
                        <span>→</span>
                        <span>{toAirportLocationName}</span>
                      </p>
                      <p className="text-gray-600 flex gap-2 text-sm">
                        <span>{formattedDate}</span>
                        <span>|</span>
                        <span>{seatQuantity} hành khách</span>
                        <span>|</span>
                        <span>{seatTypeName}</span>
                      </p>
                    </div>
                    <div
                      className="flex self-center gap-4 "
                      onClick={openModal}
                    >
                      {isHovered && (
                        <p className="hover:text-blue-500">Đổi tìm kiếm</p>
                      )}
                      <SearchIcon />
                    </div>
                  </div>
                </div>
                <div className="self-center">
                  <BellIcon />
                </div>
              </div>

              <div
                className="flex gap-1 mx-3 my-2 h-12 items-center justify-between rounded-lg"
                style={{ backgroundColor: "#0264C8" }}
              >
                <div
                  className="w-5/6 flex justify-between items-center mx-5"
                  style={{
                    transform: `translateX(-${calendarPosition * 100}%)`,
                  }}
                >
                  {listDate.map((date, index) => (
                    <div
                      key={index}
                      className={`py-2 px-2 cursor-pointer transition duration-300 ease-in-out text-sm hover:bg-sky-500 rounded-lg ${
                        selectedDates[index]
                          ? "font-bold bg-sky-500 rounded-lg"
                          : ""
                      }`}
                      onClick={async () => {
                        handleClick(index);
                        handleSearchDate(date);
                      }}
                      style={{ display: "inline-block", cursor: "pointer" }}
                    >
                      <p className="text-white">
                        {date.toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="self-center mr-3">
                  <ArrowRightIcon style={{ color: "white" }} />
                </div>
                <div
                  className="self-center h-full w-10 justify-self-end border border-solid rounded-lg flex justify-center items-center transition-all duration-300 ease-in-out :hover:bg-sky-500  :visited:bg-sky-500 :active:bg-sky-500 :focus:bg-sky-500 hover:cursor-pointer"
                  style={{ borderColor: "#005FA8" }}
                  onClick={() => {
                    setShowCalendar(!showCalendar);
                  }}
                >
                  <CalenderIcon />
                </div>
              </div>
              <div className="flex justify-start gap-3 mx-3 my-2 h-12 items-center rounded-lg bg-white">
                <div className="ml-2">
                  <i className="fa-solid fa-percent fa-sm border border-solid rounded-full ml-2 px-1 py-2"></i>
                </div>
                <div className="border border-solid border-slate-300 rounded-2xl">
                  <p className="px-3 py-1 text-sm font-semibold">Thêm ưu đãi</p>
                </div>
                <div className="border border-solid border-slate-300 rounded-2xl">
                  <p className="px-3 py-1 text-sm font-semibold">
                    Tặng gói mã 800K
                  </p>
                </div>
              </div>
              <div className="h-1"></div>
            </div>
            {showCalendar && (
              <div
                ref={calendarRef}
                className="transition-all duration-500 ease-in-out flex justify-end w-3/6 absolute border border-solid border-slate-300 rounded-lg bg-white max-w-max z-10"
                style={{ top: "228px", left: "60%" }}
              >
                <Calendar
                  date={(data) => {
                    handleSearchDate(data);
                    setSelectedDates(Array(6).fill(false));
                    setShowCalendar(false);
                  }}
                  position={calendarPosition}
                />
              </div>
            )}
          </div>
          <FlightSort />
          <FlightInfo />
        </div>
      </div>
      {isOpen && (
        <>
          <div className="overlay" onClick={closeModal}></div>

          <div className="search-container">
            <Search
              clickedButton={(data) => {
                setChanged(true);
                closeModal();
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
export default FlightTitle;
