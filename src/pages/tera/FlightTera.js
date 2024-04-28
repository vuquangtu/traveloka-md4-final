import React from "react";
import TeraHeader from "../../components/tera/TeraHeader";
import FlightTeraForm from "../../components/tera/FlightTeraForm";
import { useState } from "react";
import CircularIndeterminate from "../../components/utils/CircularIndeterminate";

function FlightTera() {
  const [isSubmitting, setSubmitting] = useState(false);
  return (
    <div className="flight-tera">
      <div style={{ backgroundColor: "transparent", position: "relative" }}>
        <TeraHeader />
        <FlightTeraForm sendSubmitStatus={(data) => setSubmitting(data)} />
      </div>
      {isSubmitting && (
        <div
          className="fixed inset-0 flex z-10 justify-center items-center"
          style={{
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5",
          }}
        >
          <CircularIndeterminate />
        </div>
      )}
    </div>
  );
}

export default FlightTera;
