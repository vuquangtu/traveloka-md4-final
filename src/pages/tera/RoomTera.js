import React, { useState } from "react";
import TeraHeader from "../../components/tera/TeraHeader";
import RoomTeraForm from "../../components/tera/RoomTeraForm";
import CircularIndeterminate from "../../components/utils/CircularIndeterminate";

function RoomTera() {
  const [isSubmitting, setSubmitting] = useState(false);
  return (
    <div>
      <div style={{ backgroundColor: "transparent", position: "relative" }}>
        <TeraHeader />
        <RoomTeraForm sendSubmitStatus={(data) => setSubmitting(data)} />
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

export default RoomTera;
