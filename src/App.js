import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import "./style/scss/main.scss";
import AuthRoutes from "./routes/AuthRoutes";
import Flight from "./pages/flights/Flights";
import Hotels from "./pages/hotel/Hotels";
import ProtectedRoute from "./routes/ProtectedRoute";
import { selectUser } from "./redux/features/userSlice";
import HomePage from "./pages/HomePage";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Modal from "react-modal";
import { selectModal, setModalIsOpen } from "./redux/features/modalSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HotelInfo from "./pages/hotel/HotelInfo";
import RoomContractPreview from "./components/layout/hotels/RoomContractPreview";
import EditTable from "./components/profile/EditTable";
import EditProfile from "./components/profile/EditProfile";
import ListBookingHotelStatus from "./components/profile/ListBookingHotelStatus";
import ReviewHotel from "./components/profile/ReviewHotel";
import ListBookingAirplaneStatus from "./components/profile/ListBookingAirplaneStatus";
import ListBookingComboStatus from "./components/profile/ListBookingComboStatus";
import EditBonus from "./components/profile/EditBonus";
import FlightSearch from "./pages/FlightSearch";
import SeatDetailPage from "./components/flight-search/SeatDetailPage";
import HotelTera from "./pages/tera/HotelTera";
import RoomTera from "./pages/tera/RoomTera";
import TeraHomepage from "./pages/tera/TeraHomepage";
import FlightSearchPage from "./pages/flights/FlightSearchPage";
import HotelTeraHome from "./pages/tera/HotelTeraHome";
import HotelDetail from "./pages/tera/HotelDetail";
import FlightConfirm from "./components/flight-search/FlightConfirm";
import FlightTera from "./pages/tera/FlightTera";
import HotelTeraService from "./components/tera/HotelTeraService";
import ProtectedTeraRoute from "./routes/ProtectedTeraRoute ";
import FrameComment from "./pages/hotel/FrameComment";
import Combo from "./pages/combo/Combo";
import ComboPreview from "./components/layout/combo/ComboPreview";
import ComboFlight from "./pages/combo/ComboFlight";
import ComboVNPay from "./pages/payment/ComboVNPay";
import FlightDetail from "./pages/tera/FlightDetail";
import FlightItem from "./components/tera/FlightItem";
import BackButton from "./components/buttons/BackButton";
import OauthGoogle from "./pages/auth/OauthGoogle";
import GetUser from "./pages/auth/GetUser";
import FlightTicketPreview from "./components/flights/FlightTicketPreview";

Modal.setAppElement("#root");

function App() {
  const user = useSelector(selectUser);
  const modal = useSelector(selectModal);
  const dispatch = useDispatch();
  let subtitle;
  let statusColor;
  useEffect(() => {
    if (modal.status === "info") statusColor = "#3498db";
    if (modal.status === "sucess") statusColor = "#07bc0c";
    if (modal.status === "error") statusColor = "#e74c3c";
  });

  const customStyles = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "200px",
      width: "500px",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#fff",
      color: statusColor,
      border: "1px solid #3498db",
      animationDuration: "3s",
      animationTimingFunction: "ease-out",
    },
  };

  function afterOpenModal() {
    subtitle.style.color = statusColor;
  }

  function closeModal() {
    dispatch(setModalIsOpen(false));
  }

  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2 className="modalTitle" ref={(_subtitle) => (subtitle = _subtitle)}>
          Thông báo
        </h2>
        <div className="modalMessage">{modal.message}</div>
        <button
          onClick={closeModal}
          className={
            modal.status === "sucess"
              ? "modalButtonSucess"
              : modal.status === "info"
              ? "modalButtonInfo"
              : "modalButtonError"
          }
        >
          Xác nhận
        </button>
      </Modal>

      <BrowserRouter>
        <Routes>
          {/* <Route path="/test" element={<HotelTeraHome/>}/> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/oauth-success/:token" element={<OauthGoogle />} />
          <Route path="/user" element={<GetUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<AuthRoutes />} />
          <Route path="/hotels/:id" element={<HotelInfo />} />
          <Route path="/flight-search" element={<Flight />} />
          <Route path="/search" element={<FlightSearchPage />} />
          <Route path="/home" element={<HomePage />} />
          
          <Route path="/combo" element={<Combo />} />
          <Route
            path="/combo/hotels/:id"
            element={<HotelInfo combo={true} />}
          />
          <Route path="/combo/flights" element={<ComboFlight />} />
          <Route path="/hotels" element={<Hotels />} />

          <Route element={<ProtectedRoute isAllowed={user.user != null} />}>
            <Route path="/tera" element={<TeraHomepage />} />
            <Route path="/bookinghotel" element={<ListBookingHotelStatus />} />
            <Route path="/customer-review/:id" element={<FrameComment />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route
              path="/bookingticket"
              element={<ListBookingAirplaneStatus />}
            />
            <Route path="/bookingcombo" element={<ListBookingComboStatus />} />
            <Route
              path="/hotels/booking/:id"
              element={<RoomContractPreview />}
            />
            <Route path="/table" element={<EditTable />} />
            <Route path="/review/:id" element={<ReviewHotel />} />
            <Route path="/mybonus" element={<EditBonus />} />
            <Route
              path="/tera/flight/register"
              element={<ProtectedTeraRoute element={<FlightTera />} />}
            />
            <Route
              path="/tera/hotel/register"
              element={<ProtectedTeraRoute element={<HotelTera />} />}
            />
            <Route
              path="/tera/room/register"
              element={<ProtectedTeraRoute element={<RoomTera />} />}
            />
            <Route
              path="/tera/hotel/detail/:id"
              element={<ProtectedTeraRoute element={<HotelDetail />} />}
            />
            <Route
              path="/tera/flight/detail/:id"
              element={<ProtectedTeraRoute element={<FlightDetail />} />}
            />
            <Route
              path="/tera/service"
              element={<ProtectedTeraRoute element={<HotelTeraHome />} />}
            />

            <Route
              path="/hotels/booking/:id"
              element={<RoomContractPreview />}
            />
            <Route path="/flight/booking" element={<FlightConfirm />} />
            <Route path="/flight/booking/:id" element={<FlightTicketPreview/>} />
            <Route
              path="/combo/room/:roomId/flight/:flightId"
              element={<ComboPreview />}
            />
            <Route path="/payment/:id" element={<ComboVNPay />} />

            <Route path="/combo/booking/:id" element={<ComboPreview />} />

            <Route
              path="/payment/contract/:contractId"
              element={<RoomContractPreview />}
            />

          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
