import axios from "../../config/privateAxios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectSearchParams,
  setAirPlaneSearchDTO,
  setError,
  setFlightDetailsDTO,
  setFlightInForShortDescriptions,
  setSearchParams,
  setFromAirPortLocationName,
  setToAirPortLocationName,
  setSeatTypeName,
  selectSearched,
  setSearched,
  selectFromAirPortLocationName,
  selectToAirPorLocationName,
  selectSeatTypeName,
} from "../../redux/features/flightSlice";
import Calendar from "../utils/Calender";
import SeatType from "../icon/SeatType";
import { CalendarIcon } from "@mui/x-date-pickers";
import FlightTakeOffIcon from "../icon/FlightTakeOffIcon";
import GuestNumberIcon from "../icon/GuestNumberIcon";

function Search({ clickedButton }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = useSelector(selectSearchParams);
  const isSearched = useSelector(selectSearched);
  const reduxFromAirPortLocationName = useSelector(
    selectFromAirPortLocationName
  );
  const reduxToAirPortLocationName = useSelector(selectToAirPorLocationName);
  const reduxSeatTypeName = useSelector(selectSeatTypeName);
  const [form, setForm] = useState({
    selectedCityFrom: "Thành phố Hồ Chí Minh - SGN",
    selectedCityFromId: 1,
    seatQuantity: 1,
    selectedCityTo: "Thành phố Hà Nội - HAN",
    selectedCityToId: 2,
    startDate: new Date(2024, 3, 7),
    seatTypeId: 1,
    seatTypeName: "Phổ thông",
  });
  const [show, setShow] = useState({
    isOpenFrom: false,
    isOpenTo: false,
    showCalendar: false,
    isOpenSeatType: false,
    isOpenQuantity: false,
  });
  const [airportLocations, setAirportLocations] = useState([]);
  const [seatTypes, setSeatTypes] = useState([]);

  const dropdownRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow({
          isOpenFrom: false,
          isOpenTo: false,
          showCalendar: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const formatAirportLocation = (cityName, airportLocationName) => {
    const airportCode = airportLocationName.substring(
      airportLocationName.length - 4,
      airportLocationName.length - 1
    );
    return `${cityName} - ${airportCode}`;
  };
  const handleShow = (name, value) => {
    setShow((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get("/api/airport-locations");
        const res2 = await axios.get("/api/seat-types");

        setSeatTypes(res2.data);
        setAirportLocations(res1.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const currentDate = new Date(form.startDate);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const isoString = `${year}-${month}-${day}T00:00:00.000Z`;
    let data = {
      fromAirportLocationId: form.selectedCityFromId,
      seatQuantity: form.seatQuantity,
      toAirportLocationId: form.selectedCityToId,
      startDate: isoString,
      seatTypeId: form.seatTypeId,
    };
    dispatch(setFromAirPortLocationName(form.selectedCityFrom));
    dispatch(setToAirPortLocationName(form.selectedCityTo));
    dispatch(setSeatTypeName(form.seatTypeName));
    dispatch(setSearchParams(data));
  }, [form]);

  useEffect(() => {
    if (isSearched) {
      setForm((prev) => ({
        ...prev,
        selectedCityFrom: reduxFromAirPortLocationName,
        selectedCityFromId: searchParams.fromAirportLocationId,
        seatQuantity: searchParams.seatQuantity,
        selectedCityTo: reduxToAirPortLocationName,
        selectedCityToId: searchParams.toAirportLocationId,
        startDate: new Date(searchParams.startDate),
        seatTypeId: searchParams.seatTypeId,
        seatTypeName: reduxSeatTypeName,
      }));
    }
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.post("/api/flights/search", searchParams);

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
      navigate("/flight-search");
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  return (
    <div>
      <div className="flight-page-search " style={{ width: "80%" }}>
        <div className="flight-page-search-inner">
          <div className="flight-page-search-inner-box">
            <div className="flight-page-search-inner-box-content-top">
              <div className="flight-page-search-inner-box-content-top-left">
                <p>Đặt vé máy bay</p>
              </div>
              <div className="flight-page-search-inner-box-content-top-right">
                <div className="flight-page-search-inner-box-content-top-right-button">
                  Mở bản đồ
                </div>
              </div>
            </div>
            <form>
              <div
                className="flight-page-search-inner-box-content-mid"
                style={{ gap: "3px" }}
              >
                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px 20px",
                  }}
                >
                  <div className="flight-page-search-inner-box-content-mid-from">
                    Từ
                  </div>
                  <div
                    className="flight-page-search-inner-box-content-mid-from-content"
                    style={{
                      width: "250px",
                    }}
                  >
                    <FlightTakeOffIcon />
                    <div className="relative">
                      <select
                        className="w-full h-auto bg-white border-none text-gray-700 rounded leading-tight focus:outline-none"
                        style={{ width: "240px", zIndex: 9999 }}
                        value={form.selectedCityFromId}
                        onChange={(e) => {
                          const selectedCityFromId = parseInt(e.target.value);
                          const selectedCityFrom = airportLocations.find(
                            (airport) => airport.id === selectedCityFromId
                          );
                          setForm((prevForm) => ({
                            ...prevForm,
                            selectedCityFrom: formatAirportLocation(
                              selectedCityFrom.cityName,
                              selectedCityFrom.airportLocationName
                            ),
                            selectedCityFromId,
                          }));
                        }}
                      >
                        <option value="">Chọn thành phố</option>
                        {airportLocations.map((airport) => (
                          <option key={airport.id} value={airport.id}>
                            {formatAirportLocation(
                              airport.cityName,
                              airport.airportLocationName
                            )}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px 20px",
                  }}
                >
                  <div className="flight-page-search-inner-box-content-mid-from">
                    Đến
                  </div>
                  <div
                    className="flight-page-search-inner-box-content-mid-from-content"
                    style={{
                      width: "250px",
                    }}
                  >
                    <FlightTakeOffIcon />
                    <div className="relative">
                      <select
                        className=" w-full bg-white border-none text-gray-700 rounded leading-tight focus:outline-none"
                        style={{ width: "240px" }}
                        value={form.selectedCityToId}
                        onChange={(e) => {
                          const selectedCityToId = parseInt(e.target.value);
                          const selectedCityTo = airportLocations.find(
                            (airport) => airport.id === selectedCityToId
                          );
                          setForm((prevForm) => ({
                            ...prevForm,
                            selectedCityTo: formatAirportLocation(
                              selectedCityTo.cityName,
                              selectedCityTo.airportLocationName
                            ),
                            selectedCityToId,
                          }));
                        }}
                      >
                        <option value="">Chọn thành phố</option>
                        {airportLocations.map((airport) => (
                          <option key={airport.id} value={airport.id}>
                            {formatAirportLocation(
                              airport.cityName,
                              airport.airportLocationName
                            )}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px 9px",
                  }}
                >
                  <div className="flight-page-search-inner-box-content-mid-from">
                    Số Hành khách
                  </div>
                  <div
                    className="flight-page-search-inner-box-content-mid-from-content"
                    style={{ width: "200px" }}
                  >
                    <GuestNumberIcon />
                    <input
                      className="flight-page-search-inner-box-content-mid-from-content-input "
                      type="text"
                      placeholder="Dari"
                      value={form.seatQuantity}
                      onChange={(event) => {
                        const value = parseInt(event.target.value);
                        if (
                          event.target.value === "" ||
                          (value >= 1 && value <= 20)
                        ) {
                          setForm((prevForm) => ({
                            ...prevForm,
                            seatQuantity: value || "",
                          }));
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="flight-page-search-inner-box-content-mid"
                style={{ gap: "186px" }}
              >
                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px 20px",
                  }}
                >
                  <div className="flight-page-search-inner-box-content-mid-from">
                    Từ
                  </div>
                  <div
                    className="flight-page-search-inner-box-content-mid-from-content"
                    style={{
                      position: "relative",
                      width: "250px",
                      marginTop: "8px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    ref={dropdownRef}
                    onClick={() =>
                      handleShow("showCalendar", !show.showCalendar)
                    }
                  >
                    <CalendarIcon
                      className="text-gray-500"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleShow("showCalendar", !show.showCalendar);
                      }}
                    />

                    <input
                      type="text"
                      name="startDate"
                      value={
                        (form.startDate &&
                          form.startDate.toLocaleDateString("en-GB")) ||
                        ""
                      }
                      onChange={() => {}}
                      style={{ outline: "none" }}
                    />
                  </div>
                </div>
                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px 0 10px 113px",
                  }}
                >
                  <div className="flight-page-search-inner-box-content-mid-from">
                    Hạng ghế
                  </div>
                  <div
                    className="flight-page-search-inner-box-content-mid-from-content"
                    style={{ width: "203px" }}
                  >
                    <SeatType />
                    <select
                      className="flight-page-search-inner-box-content-mid-from-content-input"
                      name="seatTypeId"
                      style={{ width: "100%", marginTop: "10px" }}
                      value={form.seatTypeId}
                      onChange={(e) => {
                        setForm((prevForm) => ({
                          ...prevForm,
                          seatTypeId: parseInt(e.target.value),
                          seatTypeName: e.target.selectedOptions[0].text,
                        }));
                      }}
                    >
                      {seatTypes.map((seatType) => (
                        <option key={seatType.id} value={seatType.id}>
                          {seatType.name.charAt(0).toUpperCase() +
                            seatType.name.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="p-4 mt-4 bg-orange-500 text-white rounded-lg"
                    onClick={() => {
                      handleSearch();
                      if (clickedButton) clickedButton(true);
                    }}
                  >
                    Tìm kiếm chuyến bay
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div
          className="absolute border border-solid border-slate-200 rounded-lg bg-white max-w-fit hover:border-sky-300 transition-all duration-300 ease-in-out"
          ref={dropdownRef}
          style={{
            top: "193px",
            left: "293px",
            opacity: show.showCalendar ? 1 : 0,
            transform: show.showCalendar ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <Calendar
            date={(data) => {
              setForm((prev) => ({
                ...prev,
                startDate: new Date(data),
              }));
              setShow((prev) => ({ ...prev, showCalendar: false })); 
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
