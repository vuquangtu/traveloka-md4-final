import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/privateAxios";
import {
  selectTeraAirplane,
  setSelectedFlight,
} from "../../redux/features/flightTeraSlice";
import FlightItem from "./FlightItem";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";

function FlightInfo({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const selectedAirplane = useSelector(selectTeraAirplane);
  const [flightPage, setFlightPage] = React.useState(0);
  const [currentFlightPage, setCurrentFlightPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/api/flights/airplane/${id}?page=${currentFlightPage - 1}`
        );
        console.log("rees1", res.data);
        setFlights(res.data.content);
        setFlightPage(res.data.totalPages);
        setPageSize(res.data.pageable.pageSize);
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
        <div className=" mx-auto py-8 bg-white relative  h-screen">
          <div className="w-full mx-auto px-2">
            <div className="w-full px-2">
              <div className="font-bold text-2xl mb-8 ml-1">
                Hãng bay {selectedAirplane.name}
              </div>
              {flights.map((flight, index) => (
                <div
                  key={index}
                  onClick={() => {
                    dispatch(setSelectedFlight(flight));
                  }}
                >
                  <FlightItem
                    flight={flight}
                    index={index}
                    page={currentFlightPage - 1}
                    size={pageSize}
                  />
                </div>
              ))}
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
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default FlightInfo;
