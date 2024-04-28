import { useEffect, useState } from "react";
import BriefCaseIcon from "../../icon/BriefCaseIcon";
import GifIcon from "../../icon/GifIcon";
import SeatType from "../../icon/SeatType";
import { changeComBoFlightId } from "../../../redux/features/comboFlightSlice";
import { useDispatch } from "react-redux";
import PersonSmallIcon from "../../icon/PersonSmallIcon";
import BillIcon from "../../icon/BillIcon";

function PreviewComboFlightTicket(params) {
  const seat = params.seat;
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [codeFrom, setCodeFrom] = useState("");
  const [codeTo, setCodeTo] = useState("");
  const [duration, setDuration] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (seat != null) {
      let arrStart = seat.flightInformation.startTime.split("T");
      let arrStartTime = arrStart[1].split(":");
      let arrStartDate = arrStart[0].split("-");
      let startTime = arrStartTime[0] + ":" + arrStartTime[1];
      let startDate =
        arrStartDate[2] + "-" + arrStartDate[1] + "-" + arrStartDate[0];

      let arrEnd = seat.flightInformation.endTime.split("T");
      let arrEndTime = arrEnd[1].split(":");
      let arrEndDate = arrEnd[0].split("-");
      let endTime = arrEndTime[0] + ":" + arrEndTime[1];
      let endDate = arrEndDate[2] + "-" + arrEndDate[1] + "-" + arrEndDate[0];

      let arrFrom = seat.flightInformation.fromAirPortLocation.name.split("(");
      let arrFrom1 = arrFrom[1].split(")");
      let from = arrFrom1[0];

      let arrTo = seat.flightInformation.toAirPortLocation.name.split("(");
      let arrTo1 = arrTo[1].split(")");
      let to = arrTo1[0];

      let durationStart = new Date(seat.flightInformation.startTime);
      let durationEnd = new Date(seat.flightInformation.endTime);
      let miliDuration = Math.abs(durationEnd - durationStart);
      let hour = miliDuration / (1000 * 60 * 60);
      let floorHour = Math.floor(hour).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      let minus = Math.floor((hour - floorHour) * 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      setStartTime(startTime);
      setEndTime(endTime);
      setEndDate(endDate);
      setStartDate(startDate);
      setCodeFrom(from);
      setCodeTo(to);
      setDuration(`${floorHour}h ${minus}m`);
    }
  }, [seat]);

  return (
    <div className="comboFlightTicket">
      <div className="comboFlightTicket-left">
        <div className="comboFlightTicket-left-left">
          <div className="comboFlightTicket-left-left-row1">
            <img
              src={seat ? seat.flightInformation.airPlantBrand.logoUrl : null}
              alt="vietjet"
            />
            <div className="comboFlightTicket-left-left-row1-brand">
              {seat ? seat.flightInformation.airPlantBrand.name : null}
            </div>
          </div>
          <div className="comboFlightTicket-left-left-row2">
            <div className="comboFlightTicket-left-left-row2-border">
              <BriefCaseIcon /> <span>23</span> <GifIcon />
            </div>
          </div>
          <div className="comboFlightTicket-left-left-row3">
            <div className="comboFlightTicket-left-left-row3-border">
              <span>Ưu đãi cực sốc</span>
            </div>
          </div>
        </div>
        <div className="comboFlightTicket-left-right">
          <div className="comboFlightTicket-left-right-row1">
            <div className="comboFlightTicket-left-right-row1-left">
              <div className="comboFlightTicket-left-right-row1-left-time">
                {startTime}
              </div>
              <div className="comboFlightTicket-left-right-row1-left-date">
                {startDate}
              </div>
              <div className="comboFlightTicket-left-right-row1-left-airport">
                {codeFrom}
              </div>
            </div>
            <div className="comboFlightTicket-left-right-row1-center">
              <div className="comboFlightTicket-left-right-row1-center-row1">
                <div className="comboFlightTicket-left-right-row1-center-row1-time">
                  {duration}
                </div>
              </div>
              <div className="comboFlightTicket-left-right-row1-center-row2">
                <div className="comboFlightTicket-left-right-row1-center-row2-from"></div>
                <div className="comboFlightTicket-left-right-row1-center-row2-line"></div>
                <div className="comboFlightTicket-left-right-row1-center-row2-to"></div>
              </div>
              <div className="comboFlightTicket-left-right-row1-center-row3">
                <div className="comboFlightTicket-left-right-row1-center-row3-text">
                  Bay thẳng
                </div>
              </div>
            </div>
            <div className="comboFlightTicket-left-right-row1-right">
              <div className="comboFlightTicket-left-right-row1-left-time">
                {endTime}
              </div>
              <div className="comboFlightTicket-left-right-row1-left-date">
                {endDate}
              </div>
              <div className="comboFlightTicket-left-right-row1-left-airport">
                {codeTo}
              </div>
            </div>
          </div>
          <div className="comboFlightTicket-left-right-row2">
            <SeatType /> <span>Ghế {seat.seatType.name}</span>
          </div>
        </div>
      </div>
      <div className="comboFlightTicket-right">
        <div style={{ display: "flex", fontWeight: "bold" }}>
          {" "}
          <BillIcon /> Tổng giá vé
        </div>
        <div
          style={{ margin: "10px 0" }}
          className="comboFlightTicket-right-unitPrice"
        >
          <span className="comboFlightTicket-right-unitPrice-price">
            {" "}
            {`${seat.totalMoney
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}{" "}
          </span>
          <div
            style={{
              lineHeight: "16px",
              display: "flex",
              marginTop: "10px",
              justifyContent: "end",
            }}
            className="comboFlightTicket-right-unitPrice-text"
          >
            <PersonSmallIcon />
            {`(${seat.quantity} khách)`}
          </div>
        </div>
        {/* <div className="comboFlightTicket-right-coin">
                    <CoinIcon /> <span>Mua vé nhận điểm</span>
                </div> */}
        <div className="comboFlightTicket-right-change">
          {/* <div className="comboFlightTicket-right-change-button">Đổi vé máy bay</div> */}
        </div>
      </div>
    </div>
  );
}
export default PreviewComboFlightTicket;
