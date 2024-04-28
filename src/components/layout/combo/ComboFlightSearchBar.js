import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import axios from "../../../config/privateAxios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHotel,
  changePersonQuantity,
} from "../../../redux/features/hotelSlice";
import CalenderIcon from "../../icon/CalenderIcon";
import { Calendar } from "react-date-range";
import SeatType from "../../icon/SeatType";
import React from "react";
import Select from "react-select";
import PersonAndRoomIcon from "../../icon/PersonAndRoomIcon";
import PersonIcon from "../../icon/PersonIcon";
import SubIcon from "../../icon/SubIcon";
import PlusIcon from "../../icon/PlusIcon";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import AirplaneIcon from "../../icon/AirplaneIcon";
import {
  changeSeatTypeName,
  selectComboFlight,
  changeFromAirportLocationId,
  changeFromAirportName,
  changeSeatTypeId,
  changeStartDate as changeComboFlightStartDate,
  changeSeatQuantity,
  changeToAirportLocationId,
  changeToAirportName,
} from "../../../redux/features/comboFlightSlice";

function ComboFlightSearchBar(params) {
  const navigate = useNavigate();

  const customStyles = {
    control: (provided) => ({
      ...provided,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
  };
  const customStyles1 = {
    control: (provided) => ({
      ...provided,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
    }),
  };
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const nights = [];
  const createNights = () => {
    for (let index = 0; index < 30; index++) {
      nights.push({ value: index + 1, label: `${index + 1} đêm` });
    }
  };
  createNights();

  const hotel = useSelector(selectHotel);
  const [date, setCalendarDate] = useState(new Date(2024, 3, 7));
  const [calendarDisplay, setCalendarDisplay] = useState("none");
  const dispatch = useDispatch();
  const [personAndRoomDisplay, setPersonAndRoomDisplay] = useState("none");
  const [airports, setAirports] = useState([]);
  const comboFlight = useSelector(selectComboFlight);
  const [seatTypes, setSeatTypes] = useState([]);

  useEffect(() => {
    axios.get("/api/seat-types").then((result) => {
      const seatArr = [];
      result.data.forEach((seat) => {
        seatArr.push({ value: seat.id, label: seat.name });
      });
      setSeatTypes(seatArr);
    });
  }, []);
  useEffect(() => {
    let startDate = comboFlight.startDate;
    let arr = startDate.split("-");
    setCalendarDate(new Date(arr[0], arr[1] - 1, arr[2]));
  }, []);
  useEffect(() => {
    axios
      .get("/api/airport-locations")
      .then((result) => {
        const airportArr = [];
        result.data.forEach((airport) => {
          const text = `${airport.airportLocationName} (${airport.cityName})`;
          airportArr.push({ value: airport.id, label: text });
        });
        setAirports(airportArr);
      })
      .catch();
  }, []);

  function handleChangeFromAirport(airport) {
    dispatch(changeFromAirportLocationId(airport.value));
    dispatch(changeFromAirportName(airport.label));
  }

  function handleChangeToAirport(airport) {
    dispatch(changeToAirportLocationId(airport.value));
    dispatch(changeToAirportName(airport.label));
  }

  function handleChangStartDate(date) {
    setCalendarDate(date);
    let stringDate = date.toISOString().split("T")[0];
    let arrDate = stringDate.split("-");
    setCalendarDisplay("none");
    let startDate = new Date(arrDate[0], arrDate[1] - 1, arrDate[2]);
    startDate.setDate(startDate.getDate() + 2);
    dispatch(changeComboFlightStartDate(startDate.toISOString().split("T")[0]));
  }
  function handleOpenCalendar(params) {
    setCalendarDisplay("block");
  }

  function handleCloseCalendar(params) {
    setCalendarDisplay("none");
  }
  function handlePlusPersonQuantity() {
    if (hotel.personQuantity < 30)
      dispatch(changeSeatQuantity(hotel.personQuantity + 1));
    dispatch(changePersonQuantity(hotel.personQuantity + 1));
  }
  function handleSubPersonQuantity() {
    if (hotel.personQuantity > 1) {
      if (hotel.personQuantity > hotel.roomQuantity) {
        dispatch(changeSeatQuantity(hotel.personQuantity - 1));
        dispatch(changePersonQuantity(hotel.personQuantity - 1));
      } else {
        toast.warning("Số lượng phòng không thể nhiều hơn số lượng khách");
      }
    }
  }
  function handleOpenPersonAndRoom() {
    setPersonAndRoomDisplay("block");
  }
  function handleClosePersonAndRoom() {
    setPersonAndRoomDisplay("none");
  }
  function handleChangeSeatType(seat) {
    dispatch(changeSeatTypeId(seat.value));
    dispatch(changeSeatTypeName(seat.label));
  }

  function handleChangStartDate(date) {
    setCalendarDate(date);
    let stringDate = date.toISOString().split("T")[0];
    let arrDate = stringDate.split("-");
    setCalendarDisplay("none");
    let startDate = new Date(arrDate[0], arrDate[1] - 1, arrDate[2]);
    startDate.setDate(startDate.getDate() + 2);
    dispatch(changeComboFlightStartDate(startDate.toISOString().split("T")[0]));
  }
  function handleOpenCalendar(params) {
    setCalendarDisplay("block");
  }
  function handleCloseCalendar(params) {
    setCalendarDisplay("none");
  }
  function handlePlusPersonQuantity() {
    if (hotel.personQuantity < 30)
      dispatch(changeSeatQuantity(hotel.personQuantity + 1));
    dispatch(changePersonQuantity(hotel.personQuantity + 1));
  }
  function handleSubPersonQuantity() {
    if (hotel.personQuantity > 1) {
      if (hotel.personQuantity > hotel.roomQuantity) {
        dispatch(changeSeatQuantity(hotel.personQuantity - 1));
        dispatch(changePersonQuantity(hotel.personQuantity - 1));
      } else {
        toast.warning("Số lượng phòng không thể nhiều hơn số lượng khách");
      }
    }
  }
  function handleOpenPersonAndRoom() {
    setPersonAndRoomDisplay("block");
  }
  function handleClosePersonAndRoom() {
    setPersonAndRoomDisplay("none");
  }
  function handleChangeSeatType(seat) {
    dispatch(changeSeatTypeId(seat.value));
    dispatch(changeSeatTypeName(seat.label));
  }

  return (
    <div className="hotelSearchBar comboFlightSearchBar">
      <div className="hotelSearchBarContainer">
        <div className="grid grid-cols-12 gap-4 content">
          <div className="col-span-3 item">
            <AirplaneIcon />
            <Select
              styles={customStyles}
              className="react-select-container"
              classNamePrefix="react-select"
              defaultValue={{
                value: comboFlight.fromAirportLocationId,
                label: comboFlight.fromAirportName,
              }}
              options={airports}
              onChange={handleChangeFromAirport}
            />
          </div>
          <div className="col-span-3 item">
            <AirplaneIcon />
            <Select
              styles={customStyles}
              className="react-select-container"
              classNamePrefix="react-select"
              defaultValue={{
                value: comboFlight.toAirportLocationId,
                label: comboFlight.toAirportName,
              }}
              options={airports}
              onChange={handleChangeToAirport}
            />
          </div>
          <div className="col-span-3 item">
            <CalenderIcon />
            <input
              onClick={handleOpenCalendar}
              className="calendarSelected"
              type="text"
              value={date.toLocaleDateString("vi-VN", options)}
              readOnly
            />
            <div
              onMouseLeave={handleCloseCalendar}
              style={{ display: calendarDisplay }}
              className="calendarContainer"
            >
              <Calendar
                minDate={new Date(2024, 3, 7)}
                maxDate={new Date(2024, 3, 13)}
                className="customCalender"
                date={date}
                onChange={handleChangStartDate}
              />
            </div>
          </div>
          {/* <div className="col-span-3 item">
                        <NightIcon />
                        <Select styles={customStyles} className="react-select-container"
                            classNamePrefix="react-select"
                            defaultValue={night}
                            onChange={handleChangeNight}
                            options={nights} />
                    </div> */}
          <div className="col-span-3 item">
            <PersonAndRoomIcon />
            <input
              onClick={handleOpenPersonAndRoom}
              className="personAndRoomInput"
              type="text"
              readOnly
              value={`${hotel.personQuantity} người, ghế ${comboFlight.seatTypeName}`}
            />
            <div
              onMouseLeave={handleClosePersonAndRoom}
              style={{ display: personAndRoomDisplay }}
              className="selectPersonAndRoomContainer"
            >
              <div className="personQuantityContainer">
                <div className="leftItem">
                  <PersonIcon />
                  <div>Số người</div>
                </div>
                <div className="rightItem">
                  <button onClick={handleSubPersonQuantity} className="button">
                    <SubIcon />
                  </button>
                  <input
                    className="personQuantityInput"
                    value={hotel.personQuantity}
                    type="text"
                    readOnly
                  />
                  <button onClick={handlePlusPersonQuantity} className="button">
                    <PlusIcon />
                  </button>
                </div>
              </div>
              <div className="roomQuantityContainer">
                <div
                  style={{ display: "flex", justifyContent: "start" }}
                  className="leftItem"
                >
                  <SeatType />
                  <div style={{ marginLeft: "10px" }}>Loại ghế</div>
                </div>
                <div className="rightItem">
                  <Select
                    styles={customStyles1}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    defaultValue={{
                      value: comboFlight.seatTypeId,
                      label: comboFlight.seatTypeName,
                    }}
                    options={seatTypes}
                    onChange={handleChangeSeatType}
                  />
                </div>
              </div>
              <div></div>
            </div>
          </div>
          {/* <div onClick={handleSearchHotel} className="col-span-2 button">
                        <SearchIcon />
                        <div className='searchText'>Tìm Combo</div>
                    </div> */}
        </div>
      </div>
    </div>
  );
}
export default ComboFlightSearchBar;
