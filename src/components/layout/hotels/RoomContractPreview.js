import PersonSmallIcon from "../../icon/PersonSmallIcon";
import TravelokaIcon from "../../icon/TravelokaIcon";
import YellowStar from "../../icon/YellowStar";
import BillIcon from "../../icon/BillIcon";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectHotel } from "../../../redux/features/hotelSlice";
import axios from "../../../config/privateAxios";
import { toast } from "react-toastify";
import BackButton from "../../buttons/BackButton";
import PaymentNote from "../../utils/PaymentNote";

function RoomContractPreview(params) {
  const { id, contractId } = useParams();
  const [room, setRoom] = useState({});
  const hotel = useSelector(selectHotel);
  const [stars, setStars] = useState([]);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [image, setImage] = useState("");
  const [contract, setContract] = useState();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    if (contractId == null) {
      axios
        .get(`/api/rooms/${id}`)
        .then((result) => {
          setRoom(result.data);
          let arr = [];
          for (let index = 0; index < result.data.hotel.hotelStar; index++) {
            arr.push(index);
          }
          setStars(arr);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (contractId == null) {
      axios
        .get(`/api/room/images`, { params: { roomId: id } })
        .then((result) => setImage(result.data[0].url));
    }
  }, []);

  useEffect(() => {
    if (contractId == null) {
      let date = hotel.startDate;
      let dateList = date.split("-");
      let temperature = new Date(dateList[0], dateList[1] - 1, dateList[2]);
      setDate(temperature);
      let temperature2 = new Date();
      temperature2.setDate(temperature.getDate() + hotel.nights);
      setEndDate(temperature2);
    }
  }, []);

  useEffect(() => {
    if (contractId != null) {
      axios
        .get(`/api/contract/${contractId}`)
        .then((result) => {
          console.log(result);
          setContract(result.data);
          setRoom(result.data.room);
          let arr = [];
          for (
            let index = 0;
            index < result.data.room.hotel.hotelStar;
            index++
          ) {
            arr.push(index);
          }
          setStars(arr);
          setImage(result.data.room.hotel.defaultImg);
          let arrStartDate = result.data.startDate.split("-");
          setDate(
            new Date(arrStartDate[0], arrStartDate[1] - 1, arrStartDate[2])
          );
          let arrEndDate = result.data.endDate.split("-");
          setEndDate(new Date(arrEndDate[0], arrEndDate[1] - 1, arrEndDate[2]));
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const handleSubmit = () => {
    console.log(contractId);
    if (contractId == null) {
      setIsPaymentLoading(true);
      axios
        .post("/api/contracts", {
          roomId: room.id,
          startDate: date.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
          roomQuantity: hotel.roomQuantity,
        })
        .then((result) => {
          const roomContractId = result.data.contractId;
          toast.success("Hợp đồng thuê phòng tạo thành công");
          setTimeout(() => {
            axios
              .get(`/api/v1/payment/room`, {
                params: {
                  price: room.unitPriceSell * hotel.roomQuantity * hotel.nights,
                  roomContractId: roomContractId,
                },
              })
              .then((response) => {
                if (
                  response.data &&
                  response.data.code === "00" &&
                  response.data.data
                ) {
                  window.location.href = response.data.data;
                } else {
                  console.error("Dữ liệu trả về từ API không hợp lệ.");
                }
              })
              .catch((error) => {
                console.error("Đã xảy ra lỗi khi gọi API:", error);
              })
              .finally(() => {
                setIsPaymentLoading(false);
              });
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Có lỗi xảy ra khi tạo hợp đồng thuê phòng");
          setIsPaymentLoading(false);
        });
    } else {
      console.log(contractId);
      axios
        .get(`/api/v1/payment/room`, {
          params: {
            price: contract.totalMoney,
            roomContractId: contractId,
          },
        })
        .then((response) => {
          if (
            response.data &&
            response.data.code === "00" &&
            response.data.data
          ) {
            window.location.href = response.data.data;
          } else {
            console.error("Dữ liệu trả về từ API không hợp lệ.");
          }
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi khi gọi API:", error);
        })
        .finally(() => {
          setIsPaymentLoading(false);
        });
    }
  };

  return (
    <div className="roomContractPreview">
      <BackButton />
      <PaymentNote />
      <div className="roomContractPreview-container">
        <div className="roomContractPreview-container-header"></div>
        <div className="roomContractPreview-container-group1">
          <div className="roomContractPreview-container-group1-left">
            <span className="roomContractPreview-container-group1-left-name">
              {room.hotel ? room.hotel.hotelName : null}
            </span>
            <span>
              <TravelokaIcon />
            </span>
            <span className="roomContractPreview-container-group1-left-point">
              {room.hotel ? room.hotel.averagePoint : null}
            </span>
            <span className="roomContractPreview-container-group1-left-booked">
              ({room.hotel ? room.hotel.hotelBookedNumbers : null})
            </span>
          </div>
          <div className="roomContractPreview-container-group1-right">
            {stars.map((value, index) => (
              <span key={index}>
                <YellowStar />
              </span>
            ))}
          </div>
        </div>
        <div className="roomContractPreview-container-group2">
          <img src={image} alt="room" />
        </div>
        <div className="roomContractPreview-container-group3">
          <div className="roomContractPreview-container-group3-container">
            <div className="roomContractPreview-container-group3-container-left">
              <div className="roomContractPreview-container-group3-container-left-title">
                Nhận phòng
              </div>
              <div className="roomContractPreview-container-group3-container-left-content">
                {date.toLocaleDateString("vi-VN", options)}
              </div>
            </div>
            <div className="roomContractPreview-container-group3-container-center">
              <div className="roomContractPreview-container-group3-container-center-nights">
                {`${
                  contractId
                    ? Math.abs(endDate - date) / 1000 / 60 / 60 / 24
                    : hotel.nights
                } đêm`}
              </div>
              <div className="roomContractPreview-container-group3-container-center-line"></div>
            </div>
            <div className="roomContractPreview-container-group3-container-right">
              <div className="roomContractPreview-container-group3-container-right-title">
                Trả phòng
              </div>
              <div className="roomContractPreview-container-group3-container-right-content">
                {endDate.toLocaleDateString("vi-VN", options)}
              </div>
            </div>
          </div>
        </div>
        <div className="roomContractPreview-container-group4">
          <div className="roomContractPreview-container-group4-roomName">
            (
            {contractId
              ? contract
                ? contract.roomQuantity
                : null
              : hotel.roomQuantity}
            x) {room.roomType ? room.roomType.name : null}
          </div>
          <div className="roomContractPreview-container-group4-person">
            <span>
              <PersonSmallIcon />
            </span>{" "}
            <span>
              {contractId ? room.maxPerson : hotel.personQuantity} khách
            </span>
          </div>
        </div>
        <div className="roomContractPreview-container-group5">
          <div className="roomContractPreview-container-group5-left">
            <div className="roomContractPreview-container-group5-left-row1">
              <span>
                <BillIcon />
              </span>{" "}
              <span className="roomContractPreview-container-group5-left-row1-text">
                Tổng giá phòng
              </span>
            </div>
            <div className="roomContractPreview-container-group5-left-row2">
              <span className="roomContractPreview-container-group5-left-row2-text">
                {contractId
                  ? contract
                    ? contract.roomQuantity
                    : null
                  : hotel.roomQuantity}{" "}
                phòng,{" "}
                {contractId
                  ? Math.abs(endDate - date) / 1000 / 60 / 60 / 24
                  : hotel.nights}{" "}
                đêm
              </span>
            </div>
          </div>
          <div className="roomContractPreview-container-group5-right">
            <div className="roomContractPreview-container-group5-right-row1">
              <span className="roomContractPreview-container-group5-right-row1-originPrice">
                {contractId
                  ? null
                  : `${(
                      room.unitPriceOrigin *
                      hotel.roomQuantity *
                      hotel.nights
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}
              </span>
            </div>
            <div className="roomContractPreview-container-group5-right-row2">
              <span className="roomContractPreview-container-group5-right-row2-sellPrice">
                {`${(contractId
                  ? contract
                    ? contract.totalMoney
                    : ""
                  : room.unitPriceSell * hotel.roomQuantity * hotel.nights
                )
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}
              </span>
            </div>
          </div>
        </div>
        <div className="roomContractPreview-container-group6">
          <button
            onClick={handleSubmit}
            className="roomContractPreview-container-group6-button"
          >
            Tiếp tục thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
export default RoomContractPreview;
