import React, { useEffect } from "react";
import Header from "../components/hompage/Header";

import Footer from "../components/hompage/Footer";
import Banner from "../components/hompage/Banner";
import HotelDiscovery from "../components/hompage/HotelDiscovery";
import FlightDiscovery from "../components/hompage/FlightDiscovery";
import ComboDiscovery from "../components/hompage/ComboDiscovery";
import { toast } from "react-toastify";

function HomePage() {
  return (
    <div>
      <div className="headerBackground"></div>
      <Header />
      <Banner />
      <FlightDiscovery />

      <HotelDiscovery />
      <ComboDiscovery />

      <Footer />
    </div>
  );
}

export default HomePage;
