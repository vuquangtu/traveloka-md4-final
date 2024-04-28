import React, { useEffect } from "react";
import Header from "../../components/flights/Header";
import FlightFilter from "../../components/flight-search/flightFilter";
import FlightSort from "../../components/flight-search/FlightSort";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/privateAxios";
import {
  setFlightDetailsDTO,
  setAirPlaneSearchDTO,
  setFlightInForShortDescriptions,
  selectSearchParams,
  updateAirPlaneId,
} from "../../redux/features/flightSlice";
import FlightInfo from "../../components/flight-search/FlightInfo";
import FlightHeader from "../../components/flight-search/FlightHeader";
import FlightPromotion from "../../components/flight-search/FlightPromotion";
import FlightLoading from "../../components/flight-search/FlightLoading";

function Flight() {
  const searchParams = useSelector(selectSearchParams);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (
        (searchParams.airPlantBrandId &&
          searchParams.airPlantBrandId.length > 0) ||
        (searchParams.durationFrom !== null &&
          searchParams.durationTo !== null) ||
        (searchParams.priceFrom !== null && searchParams.priceTo !== null)
      ) {
        axios
          .post("/api/flights/search/filter", searchParams)
          .then((response) => {
            if (
              response.data &&
              Array.isArray(response.data.flights) &&
              response.data.flights.length > 0
            ) {
              dispatch(setFlightDetailsDTO(response.data.flights));
            } else {
              dispatch(setFlightDetailsDTO([]));
            }
          })
          .catch((error) => {
            console.log("Đã xảy ra lỗi khi gọi API:", error);
          });

        console.log(searchParams);
      } else {
        axios
          .post("/api/flights/search", searchParams)
          .then((response) => {
            if (
              response.data &&
              Array.isArray(response.data.flightDetailsDTO)
            ) {
              dispatch(setFlightDetailsDTO(response.data.flightDetailsDTO));
              dispatch(setAirPlaneSearchDTO(response.data.airPlantSearchDTO));
              dispatch(
                setFlightInForShortDescriptions(
                  response.data.flightInForShortDescriptions
                )
              );
              dispatch(
                updateAirPlaneId(
                  response.data.airPlantSearchDTO.map((item) => item.id)
                )
              );
            } else {
              dispatch(setFlightDetailsDTO([]));
              dispatch(setAirPlaneSearchDTO([]));
              dispatch(setFlightInForShortDescriptions([]));
            }
          })
          .catch((error) => {
            console.error("Đã xảy ra lỗi khi gọi API:", error);
          });
      }
      setLoading(false);
    }, 300);
  }, [searchParams]);
  return (
    <div className="mx-auto w-screen">
      <Header />
      <div className="flex justify-between mt-4 mx-auto gap-16 w-4/5">
        <div className="w-1/3">
          <FlightPromotion />
          <FlightFilter />
        </div>

        <div className="w-2/3">
          <FlightHeader />
          {!isLoading && <FlightSort />}
          {!isLoading && <FlightInfo />}
          {isLoading && <FlightLoading />}
        </div>
      </div>
    </div>
  );
}

export default Flight;
