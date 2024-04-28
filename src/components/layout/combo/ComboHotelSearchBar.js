import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import LocationIcon from "../../icon/LocationIcon";
import axios from "../../../config/privateAxios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeHotelId,
  changeCity,
  selectHotel,
  changeStartDate,
  changeNights,
  changePersonQuantity,
  changeRoomQuantity,
  changePageNumber,
} from "../../../redux/features/hotelSlice";
import CalenderIcon from "../../icon/CalenderIcon";
import { Calendar } from "react-date-range";
import NightIcon from "../../icon/NightIcon";
import React from "react";
import Select from "react-select";
import PersonAndRoomIcon from "../../icon/PersonAndRoomIcon";
import PersonIcon from "../../icon/PersonIcon";
import SubIcon from "../../icon/SubIcon";
import PlusIcon from "../../icon/PlusIcon";
import RoomIcon from "../../icon/RoomIcon";
import { toast } from "react-toastify";
import SearchIcon from "../../icon/SearchIcon";
import { useNavigate } from "react-router";
import { changeCombos } from "../../../redux/features/combosSlice";
import {
  selectComboFlight,
  changeComBoFlightId,
} from "../../../redux/features/comboFlightSlice";

function ComboHotelSearchBar(params) {
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
  const comboFlight = useSelector(selectComboFlight);
  const hotel = useSelector(selectHotel);
  const [cities, setCities] = useState([]);
  const [date, setCalendarDate] = useState(new Date(2024, 3, 7));
  const [calendarDisplay, setCalendarDisplay] = useState("none");
  const [night, setNight] = useState({ label: `${hotel.nights} đêm`, value: hotel.nights });
  const dispatch = useDispatch();
  const [personAndRoomDisplay, setPersonAndRoomDisplay] = useState("none");

  useEffect(() => {
    axios
      .get("/api/cities")
      .then((result) => {
        const cityArr = [];
        result.data.forEach((city) => {
          cityArr.push({ value: city.id, label: city.name });
        });
        setCities(cityArr);
      })
      .catch();
  }, []);
  useEffect(() => {
    let startDate = hotel.startDate;
    let arr = startDate.split("-");
    setCalendarDate(new Date(arr[0], arr[1] - 1, arr[2]));
  }, []);

  function handleChangeCity(city) {
    dispatch(changeCity({ id: city.value, name: city.label }));
  }

  function handleChangStartDate(date) {
    setCalendarDate(date);
    setCalendarDisplay("none");
    let startDate = new Date();
    startDate.setDate(date.getDate());
    dispatch(changeStartDate(startDate.toISOString().split("T")[0]));
  }

  function handleChangeNight(night) {
    dispatch(changeNights(night.value));
  }

  function handleOpenCalendar(params) {
    setCalendarDisplay("block");
  }
  function handleCloseCalendar(params) {
    setCalendarDisplay("none");
  }
  function handlePlusPersonQuantity() {
    if (hotel.personQuantity < 30)
      dispatch(changePersonQuantity(hotel.personQuantity + 1));
  }
  function handleSubPersonQuantity() {
    if (hotel.personQuantity > 1) {
      if (hotel.personQuantity > hotel.roomQuantity) {
        dispatch(changePersonQuantity(hotel.personQuantity - 1));
      } else {
        toast.warning("Số lượng phòng không thể nhiều hơn số lượng khách");
      }
    }
  }
  function handlePlusRoomQuantity() {
    if (hotel.roomQuantity < 30) {
      if (hotel.roomQuantity < hotel.personQuantity) {
        dispatch(changeRoomQuantity(hotel.roomQuantity + 1));
      } else {
        toast.warning("Số lượng phòng không thể nhiều hơn số lượng khách");
      }
    }
  }
  function handleSubRoomQuantity() {
    if (hotel.roomQuantity > 1)
      dispatch(changeRoomQuantity(hotel.roomQuantity - 1));
  }
  function handleOpenPersonAndRoom() {
    setPersonAndRoomDisplay("block");
  }
  function handleClosePersonAndRoom() {
    setPersonAndRoomDisplay("none");
  }
  function handleSearchCombo() {
    let url = window.location.href.split("/");
    let location = url[3];
    if (location !== "combo" || url.length > 4) {
      dispatch(changeComBoFlightId(null));
      navigate("/combo");
      dispatch(changeHotelId(null));
      dispatch(changePageNumber(0));
    } else {
      dispatch(changePageNumber(0));
      axios
        .post("/api/combo/search", {
          searchFlightDetailsRequestDTO: comboFlight,
          hotelSearchDTO: hotel,
          page: 0,
        })
        .then((result) => {
          if (result.data.length !== 0) {
            dispatch(changeCombos(result.data.unitComboResponDTOs));
          } else {
            dispatch(changeCombos([]));
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="hotelSearchBar">
      <div className="hotelSearchBarContainer">
        <div className="grid grid-cols-12 gap-4 content">
          <div className="col-span-3 item">
            <LocationIcon />
            <Select
              styles={customStyles}
              className="react-select-container"
              classNamePrefix="react-select"
              defaultValue={{ value: hotel.cityId, label: hotel.cityName }}
              options={cities}
              onChange={handleChangeCity}
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
          <div className="col-span-2 item">
            <NightIcon />
            <Select
              styles={customStyles}
              className="react-select-container"
              classNamePrefix="react-select"
              defaultValue={night}
              onChange={handleChangeNight}
              options={nights}
            />
          </div>
          <div className="col-span-2 item">
            <PersonAndRoomIcon />
            <input
              onClick={handleOpenPersonAndRoom}
              className="personAndRoomInput"
              type="text"
              readOnly
              value={`${hotel.personQuantity} người, ${hotel.roomQuantity} phòng`}
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
                <div className="leftItem">
                  <RoomIcon />
                  <div>Số phòng</div>
                </div>
                <div className="rightItem">
                  <button onClick={handleSubRoomQuantity} className="button">
                    <SubIcon />
                  </button>
                  <input
                    className="roomQuantityInput"
                    value={hotel.roomQuantity}
                    type="text"
                    readOnly
                  />
                  <button onClick={handlePlusRoomQuantity} className="button">
                    <PlusIcon />
                  </button>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div onClick={handleSearchCombo} className="col-span-2 button">
            <SearchIcon />
            <div className="searchText">Tìm Combo</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ComboHotelSearchBar;
