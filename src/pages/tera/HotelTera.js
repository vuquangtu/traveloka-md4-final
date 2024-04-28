import React, { useState } from "react";
import TeraHeader from "../../components/tera/TeraHeader";
import HotelTeraForm from "../../components/tera/HotelTeraForm";
import CircularIndeterminate from "../../components/utils/CircularIndeterminate";

function HotelTera() {
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <div className={`hotel-tera`}>
      <div style={{ backgroundColor: "transparent", position: "relative" }}>
        <TeraHeader />
        <HotelTeraForm sendSubmitStatus={(data) => setSubmitting(data)} />
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

export default HotelTera;
