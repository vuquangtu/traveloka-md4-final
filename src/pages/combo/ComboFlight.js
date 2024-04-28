import { useEffect, useState } from "react";
import axios from "../../config/privateAxios";
import { selectComboFlight } from "../../redux/features/comboFlightSlice";
import { useSelector } from "react-redux";
import ComboFlightTicket from "../../components/layout/combo/ComboFlightTicket";
import BackButton from "../../components/buttons/BackButton";

function ComboFlight(params) {
  const comboFlight = useSelector(selectComboFlight);
  const [seats, setSeats] = useState([]);
  useEffect(() => {
    axios
      .post("/api/seats", {
        ...comboFlight,
      })
      .then((result) => {

        setSeats(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="comboFlight">
      {seats.map((seat) => (
        <ComboFlightTicket changeSeat={true} key={seat.id} seat={seat} />
      ))}
      <BackButton />
    </div>
  );
}
export default ComboFlight;
