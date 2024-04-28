import React, { useEffect } from "react";
import TeraBanner from "../../components/tera/TeraBanner";
import TeraHeader from "../../components/tera/TeraHeader";
import TeraSearchBar from "../../components/tera/TeraSearchBar";
import { Pagination } from "@mui/material";
import HotelCard from "../../components/tera/HotelCard";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import Stack from "@mui/material/Stack";

import {
  setHotels,
  setSelectedHotel,
  setSelectedHotelId,
} from "../../redux/features/hotelTeraSlice";
import axios from "../../config/privateAxios";
import { useNavigate } from "react-router-dom";
import {
  setSelectedAirplane,
  setSelectedAirplaneId,
  setAirplanes,
} from "../../redux/features/flightTeraSlice";
import FlightCard from "../../components/tera/FlightCard";

function HotelTeraHome() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hotels, setHotels1] = React.useState([]);
  const [airplanes, setAirplanes1] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [hotelPage, setHotelPage] = React.useState(0);
  const [currentHotelPage, setCurrentHotelPage] = React.useState(1);
  const [flightPage, setFlightPage] = React.useState(0);
  const [currentFlightPage, setCurrentFlightPage] = React.useState(1);

  useEffect(() => {
    if (user === null) {
      window.location.href = "/login";
    } else {
      setLoading(true);
      try {
        axios
          .get(`/api/hotels/partner?page=${currentHotelPage - 1}&size=3`)
          .then((res) => {
            dispatch(setHotels(res.data.content.map((item) => item.hotel)));
            setHotels1(res.data.content);
            setHotelPage(res.data.totalPages);
          });
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
  }, [currentHotelPage]);

  useEffect(() => {
    if (user === null) {
      window.location.href = "/login";
    } else {
      setLoading(true);
      try {
        axios
          .get(`/api/airplane-brands/partner?page=${currentFlightPage - 1}`)
          .then((res) => {
            console.log("airplane-brands", res.data);

            dispatch(setAirplanes(res.data));
            setAirplanes1(res.data.content);
            setFlightPage(res.data.totalPages);
          });
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
  }, [currentFlightPage]);

  useEffect(() => {
    if (hotels && hotels.length > 0) {
      setLoading(false);
    }
  }, [hotels]);
  const handleChange = (event, value) => {
    setCurrentHotelPage(value);
  };
  return (
    // !isLoading && (
    <div>
      <TeraHeader />
      <TeraBanner />
      <div className="h-fullss" style={{ backgroundColor: "#F2F4F7" }}>
        <div className="w-4/5 py-8 mx-auto">
          <div className="flex justify-between items-center">
            <TeraSearchBar />
          </div>
          <div className="mt-4">
            <div className="text-xl font-semibold">Khách sạn</div>
            <div className="grid grid-cols-3 gap-10">
              {hotels.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    dispatch(setSelectedHotel(item));
                    dispatch(setSelectedHotelId(item.id));
                    navigate(`/tera/hotel/detail/${item.id}`);
                  }}
                  className="hover:border-sky-500 hover:cursor-pointer transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                >
                  <HotelCard hotel={item} />
                </div>
              ))}
            </div>
            {hotelPage > 1 && (
              <Stack spacing={2}>
                <Pagination
                  variant="outlined"
                  color="secondary"
                  count={hotelPage}
                  page={currentHotelPage}
                  onChange={(event, value) => setCurrentHotelPage(value)}
                  className="pt-4 flex justify-center  "
                />
              </Stack>
            )}
          </div>
          <div className="mt-4">
            <div className="text-xl font-semibold">Hãng bay</div>
            <div className="grid grid-cols-3 gap-10">
              {airplanes.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    dispatch(setSelectedAirplane(item));
                    dispatch(setSelectedAirplaneId(item.id));
                    navigate(`/tera/flight/detail/${item.id}`);
                  }}
                  className="hover:border-sky-500 hover:cursor-pointer transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
                >
                  <FlightCard airplane={item} />
                </div>
              ))}
            </div>
            {flightPage > 1 && (
              <Stack spacing={2}>
                <Pagination
                  variant="outlined"
                  color="primary"
                  count={flightPage}
                  page={currentFlightPage}
                  onChange={(event, value) => setCurrentFlightPage(value)}
                  className="pt-4 flex justify-center  "
                />
              </Stack>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  // );
}

export default HotelTeraHome;
