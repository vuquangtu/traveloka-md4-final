import React from "react";
import Header from "../../components/flights/Header";
import FlightDescription from "../../components/flight-search/FlightDescription";
import Search from "../../components/flights/Search";
import Banner from "../../components/flights/Banner";
import Footer from "../../components/hompage/Footer";

function FlightSearchPage() {
  return (
    <div className="w-full">
      <Header />
      <Banner />
      <Search />
      <FlightDescription />
      <Footer />
    </div>
  );
}

export default FlightSearchPage;
