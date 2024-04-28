import React, { useEffect, useState } from "react";
import RangeSlider from "./RangeSlider";
import ArrowDownIcon from "../icon/ArrowDownIcon";
import ArrowUpIcon from "../icon/ArrowUpIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAirPlaneSearchDTO,
  selectSearchParams,
  setSearchParams,
} from "../../redux/features/flightSlice";

function FlightFilter() {
  const dispatch = useDispatch();
  const airPlantSearchDTO = useSelector(selectAirPlaneSearchDTO);
  const searchParams = useSelector(selectSearchParams);

  const [labelValues, setLabelValues] = useState(["0", "24"]);

  const [priceLabelValues, setPriceLabelValues] = useState(["0", "20000000"]);
  const [checkbox, setCheckbox] = useState([]);
  const [showList, setShowList] = useState({
    airPlantSearchDTO: false,
    list1: false,
    list2: false,
    list3: false,
  });
  const [show, setShow] = useState(false);

  const handleTimeRangeChange = (newValue) => {
    const updatedSearchParams = {
      ...searchParams,
      durationFrom: newValue[0] || 0,
      durationTo: newValue[1] || 24,
    };

    dispatch(setSearchParams(updatedSearchParams));
  };

  const handlePriceLabelChange = (values) => {
    setPriceLabelValues(values.map((value) => `${value}`));
  };

  const handlePriceRangeChange = (newValue) => {
    const [priceFrom, priceTo] = newValue;
    dispatch(
      setSearchParams({
        ...searchParams,
        priceFrom,
        priceTo: priceTo === 10000 ? null : priceTo,
      })
    );
  };

  const handleLabelChange = (values) => {
    setLabelValues(values.map((value) => `${value}`));
  };

  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
  };

  const toggleList = (listName) => {
    setShowList((prevState) => ({
      ...prevState,
      [listName]: !prevState[listName],
    }));
  };

  const handleCheckbox = (index) => {
    const newCheckbox = checkbox.map((item, idx) => {
      if (idx === index) {
        item = !item;
      }
      return item;
    });
    setCheckbox(newCheckbox);
    const updatedSearchParams = newCheckbox
      .map((item, idx) => (item ? airPlantSearchDTO[idx].id : null))
      .filter((item) => item !== null);
    dispatch(
      setSearchParams({ ...searchParams, airPlantBrandId: updatedSearchParams })
    );
  };

  useEffect(() => {
    if (airPlantSearchDTO && airPlantSearchDTO.length > 0) {
      setCheckbox(airPlantSearchDTO.map(() => false));
    }
  }, [airPlantSearchDTO]);

  return (
    <div className="flight-search-container">
      <div className="flight-filter">
        <div className="flight-filter__title">
          <span className="flight-filter__title__elem1">Bộ lọc</span>
          <span className="flight-filter__title__elem2">Đặt lại</span>
        </div>
        <div className="flight-filter__item-container">
          <div className="flight-filter__item-container__item">
            <div
              className={`flight-filter__item-container__item__title ${
                showList.list1 ? "show" : ""
              }`}
              onClick={() => toggleList("list1")}
            >
              <span className="flight-filter__item-container__item__title_elem1">
                Hãng hàng không
              </span>
              <span className="flight-filter__item-container__item__title_elem2">
                {showList.list1 ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </span>
            </div>
            <div
              className={`flight-filter__item-container__item__brands ${
                showList.list1 ? "show" : ""
              }`}
            >
              {airPlantSearchDTO &&
                airPlantSearchDTO.length > 0 &&
                airPlantSearchDTO.map((airplane, index) => (
                  <div
                    key={airplane.id}
                    className="flight-filter__item-container__item__brands__item pb-1 "
                    onClick={() => {
                      handleCheckbox(index);
                    }}
                  >
                    {checkbox && checkbox[index] ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#0194F3"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#CDD0D1"
                        style={{
                          backgroundColor: "rgb(1, 148, 243)",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        <path
                          d="M6.5 12L10.5 16L18 8.5"
                          stroke="#FFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#0194F3"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#CDD0D1"
                        style={{
                          border: "1px solid black",
                          borderRadius: "5px",
                        }}
                      >
                        <path
                          d="M6.5 12L10.5 16L18 8.5"
                          stroke="#333"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    )}
                    <span>{airplane.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flight-filter__item-container">
          <div className="flight-filter__item-container__item">
            <div className="flight-filter__item-container__item__title">
              <span className="flight-filter__item-container__item__title_elem1">
                Thời gian bay
              </span>
              <span className="flight-filter__item-container__item__title_elem2">
                {labelValues[0]} - {labelValues[1]} giờ
              </span>
            </div>
            <RangeSlider
              min={0}
              max={24}
              step={1}
              onChange={handleTimeRangeChange}
              onLabelChange={handleLabelChange}
            />
          </div>
        </div>
        <div className="flight-filter__item-container">
          <div className="flight-filter__item-container__item">
            <div className="flight-filter__item-container__item__title">
              <span className="flight-filter__item-container__item__title_elem1">
                Giá
              </span>

              <span>
                {priceLabelValues[0]
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                -{" "}
                {priceLabelValues[1]
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </span>
            </div>
            <RangeSlider
              min={0}
              max={20000000}
              step={100000}
              onChange={handlePriceRangeChange}
              onLabelChange={handlePriceLabelChange}
            />
          </div>
        </div>

        <div className="flight-filter__item-container">
          <div className="flight-filter__item-container__item">
            <div
              className={`flight-filter__item-container__item__title ${
                show ? "show" : ""
              }`}
              onClick={toggleShow}
            >
              <span className="flight-filter__item-container__item__title_elem1">
                Thời gian
              </span>
              <span className="flight-filter__item-container__item__title_elem2">
                {show ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </span>
            </div>
            <div
              className={`flight-filter__item-container__item__brands ${
                show ? "show" : ""
              }`}
            >
              <div className="flex flex-col gap-3">
                <h1 style={{ fontSize: "18px" }} className="pt-2">
                  Giờ cất cánh
                </h1>
                <div className="flex justify-between">
                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Đêm đến sáng
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>00:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>06:00</p>
                    </div>
                  </div>
                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Sáng đến trưa
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>06:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>12:00</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Trưa đến tối
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>12:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>18:00</p>
                    </div>
                  </div>

                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Tối đến đêm
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>18:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>24:00</p>
                    </div>
                  </div>
                </div>
                <h1 style={{ fontSize: "18px" }} className="pt-2">
                  Giờ hạ cánh
                </h1>
                <div className="flex justify-between">
                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Đêm đến sáng
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>00:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>06:00</p>
                    </div>
                  </div>
                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Sáng đến trưa
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>06:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>12:00</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Trưa đến tối
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>12:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>18:00</p>
                    </div>
                  </div>

                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Tối đến đêm
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>18:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>24:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FlightFilter;
