import React from "react";
import FlightFilter from "../components/flight-search/flightFilter";
import FlightTitle from "../components/flight-search/FlightTitle";
import FlightInfo from "../components/flight-search/FlightInfo";
import FlightSort from "../components/flight-search/FlightSort";
import Header from "../components/flights/Header";

function FlightSearch() {
  return (
    <div>
      <Header />

      <FlightTitle />
    </div>
  );
}

export default FlightSearch;
