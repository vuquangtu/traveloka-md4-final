import InfoIcon from "@mui/icons-material/Info";
import AlarmRoundedIcon from "@mui/icons-material/AlarmRounded";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { selectSearchParams } from "../../redux/features/flightSlice";
import axios from "../../config/privateAxios";
import { toast } from "react-toastify";
import BackButton from "../buttons/BackButton";
import PaymentNote from "../utils/PaymentNote";
function FlightConfirm(props) {

  const location = useLocation();

  const searchParams = useSelector(selectSearchParams);

  const { seat, flight } = location.state;

  const ticketAirPlane = {
    seatInfoId: seat.id,
    quantity: searchParams.seatQuantity,
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/ticket", ticketAirPlane);
      const ticketAirPlaneId = response.data.ticketId;

      toast.success("Vé máy bay được tạo thành công");

      setTimeout(async () => {
        const paymentResponse = await axios.get("/api/v1/payment/flight", {
          params: {
            price: seat.unitPrice * searchParams.seatQuantity,
            ticketId: ticketAirPlaneId,
          },
        });
        if (
          paymentResponse.data &&
          paymentResponse.data.code === "00" &&
          paymentResponse.data.data
        ) {
          window.location.href = paymentResponse.data.data;
        } else {
          console.error("Dữ liệu trả về từ API không hợp lệ.");
        }
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Đặt vé thất bại");
      alert("Đặt vé thất bại!");
    }
  };
  return (
    <div className="bg-blue-100 h-screen w-screen">
      <BackButton />
      <PaymentNote />
      <div
        className="w-6/12 mx-auto flex fixed"
        style={{ top: "130px", left: "355px" }}
      >
        <div className="border-2 h-fit my-5 bg-white border-solid  shadow-md shadow-slate-100 rounded-lg hover:border-slate-200 hover:border-2 transition duration-300 ease-in-out">
          <div className="mx-4 my-5 flex flex-col gap-2">
            <div className="font-bold text-xl">
              <p>Xác nhận thanh toán</p>
            </div>
            <div className="flex gap-1" style={{ color: "rgb(1, 148, 243)" }}>
              <p className=" p-2 " style={{}}>
                <InfoIcon style={{ fontSize: "30px" }} />
              </p>
              <p className="text-sm pt-2 leading-4 ">
                Thuế và phí là các khoản được Traveloka chuyển trả cho khách
                sạn. Mọi thắc mắc về thuế và hóa đơn, vui lòng tham khảo Điều
                khoản và Điều kiện của Traveloka để được giải đáp
              </p>
            </div>
            <div className="flex justify-between mx-2 border-b h-max border-solid border-slate-300 py-3">
              <div>
                <p className="mb-2">Giá ghế</p>
                <p className="text-slate-400 text-sm">(1x) Phổ thông</p>
              </div>
              <div
                className="text-end h-full mx-2"
                style={{ fontWeight: "600" }}
              >
                <p className="">
                  {seat.unitPrice.toLocaleString("vi-VN")}
                  VND
                </p>
              </div>
            </div>
            <div className="mt-1 font-semibold text-lg w-full">
              <p className="flex justify-between mx-2">
                <span>Tổng giá</span>
                <span
                  className="text-end"
                  style={{ color: "rgb(255, 94, 31)", fontWeight: "700" }}
                >
                  {(seat.unitPrice * searchParams.seatQuantity).toLocaleString(
                    "vi-VN"
                  )}
                  VND
                </span>
              </p>
            </div>
            <div
              className="mx-auto text-sm font-semibold "
              style={{ color: "rgb(1, 148, 243)" }}
            >
              <p className="flex gap-1">
                <span>
                  <AlarmRoundedIcon style={{ fontSize: "20px" }} />
                </span>
                <span className="self-center">
                  Hãy đặt vé máy bay ngay hôm nay trước khi nó tăng cao hơn!
                </span>
              </p>
            </div>
            <div
              className="mx-4 text-white rounded-md"
              style={{ backgroundColor: "rgb(255, 94, 31)" }}
              onClick={handleSubmit}
            >
              <p className="text-center text-lg font-semibold py-2 hover:cursor-pointer hover:bg-orange-600 hover:rounded-lg trasition duration-300 ease-in-out">
                Tiếp tục thanh toán
              </p>
            </div>
            <div className="mx-4 text-center mt-2" style={{ fontSize: "14px" }}>
              <p className="leading-5">
                Bằng việc tiếp tục thanh toán, bạn đã đồng ý với{" "}
                <p
                  className="underline hover:cursor-pointer"
                  style={{ color: "rgb(0, 0, 238)" }}
                >
                  Điều khoản & Điều kiện
                </p>
                cũng như
                <p
                  className="underline hover:cursor-pointer"
                  style={{ color: "rgb(0, 0, 238)" }}
                >
                  Chính sách quyền riêng tư
                </p>
                của Traveloka.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightConfirm;
