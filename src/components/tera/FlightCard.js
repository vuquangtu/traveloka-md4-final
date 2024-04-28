import React from "react";

function FlightCard({ airplane }) {
  return (
    <div className="flex gap-6">
      <div
        className="bg-white rounded-lg  mt-6 overflow-hidden shadow-2xl md:w-2/3 xl:w-1/5 lg:w-2/3 sm:w-1/2 "
        style={{ width: "90%" }}
      >
        <img
          className="h-48 w-full object-cover object-end"
          src={
            airplane.logoUrl ||
            "https://www.shutterstock.com/image-vector/airplane-cloud-blue-passport-luggage-600nw-2305845281.jpg"
          }
          alt="Home in Countryside"
        />
        <div className="p-6">
          <div className="flex items-baseline"></div>
          <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
            {airplane.name}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default FlightCard;
