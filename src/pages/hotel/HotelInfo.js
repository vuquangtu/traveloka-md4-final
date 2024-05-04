import { useEffect, useRef, useState } from "react";
import HotelStarSmall from "../../components/icon/HotelStarSmall";
import LocationIconBlack from "../../components/icon/LocationIconBlack";
import axios from "../../config/privateAxios";
import { selectHotel } from "../../redux/features/hotelSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import TravelokaIcon from "../../components/icon/TravelokaIcon";
import RoomCard from "../../components/layout/hotels/RoomCard";
import RoomContractPreview from "../../components/layout/hotels/RoomContractPreview";
import Header from "../../components/hompage/Header";
import HotelSearchBar from "../../components/layout/hotels/HotelSearchBar";
import { selectComboFlight } from "../../redux/features/comboFlightSlice";
import ComboFlightSearchBar from "../../components/layout/combo/ComboFlightSearchBar";
import ComboHotelSearchBar from "../../components/layout/combo/ComboHotelSearchBar";
import ComboFlightTicket from "../../components/layout/combo/ComboFlightTicket";
import FrameComment from "./FrameComment";
import BackButton from "../../components/buttons/BackButton";
import { useFetchhotelQuery } from "../../redux/features/hotelsApi";
import "react-image-gallery/styles/css/image-gallery.css";

function HotelInfo(params) {
  const [seat, setSeat] = useState();
  const comboIsValid = params.combo;
  const combo = useSelector(selectComboFlight);
  const hotelSearch = useSelector(selectHotel);
  const { id } = useParams();

  const [rooms, setRooms] = useState([{}]);
  const [stars, setStars] = useState([]);

  const [gallery, setGallery] = useState([{}]);
  const gallaryRef = useRef();
  const [utilities, setUtilities] = useState([{ hotelUtility: { name: "" } }]);

  const { data: hotel, isFetching } = useFetchhotelQuery(id);

  const images = hotel?.imgs;

  useEffect(() => {
    if (images) {
      setGallery(
        images.map((image) => ({
          original: image,
        }))
      );
    }
  }, [images]);

  useEffect(() => {
    axios
      .get(
        "/api/rooms",
        {
          params: {
            startDate: hotelSearch.startDate,
            nights: hotelSearch.nights,
            personQuantity: hotelSearch.personQuantity,
            roomQuantity: hotelSearch.roomQuantity,
            hotelId: id,
          },
        },
        []
      )
      .then((result) => {
        setRooms(result.data.availableRooms);
        setHotel(result.data.availableRooms[0].hotel);
        let arr = [];
        for (
          let index = 0;
          index < result.data.availableRooms[0].hotel.hotelStar;
          index++
        ) {
          arr.push(index);
        }
        setStars(arr);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get("/api/images", { params: { hotelId: id } })
      .then((result) => {
        setImages(result.data);
        let arr = [];
        for (let index = 0; index < result.data.length; index++) {
          arr.push({
            original: result.data[index].url,
            thumbnail: result.data[index].url,
          });
        }
        setGallery(arr);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get("/api/utilities", { params: { hotelId: id } })
      .then((result) => {
        setUtilities(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (comboIsValid) {
      axios
        .get(`/api/flights/seats/${combo.id}`)
        .then((result) => {
          setSeat(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  function handleFullScreen() {
    console.log(gallaryRef);
    gallaryRef.current.toggleFullScreen();
  }
  console.log(gallery);

  return (
    <>
      <div className="hotelHeader">
        <Header />
      </div>
      <BackButton />
      {comboIsValid ? <ComboHotelSearchBar /> : <HotelSearchBar />}
      {comboIsValid ? <ComboFlightSearchBar /> : null}
      <div className="hotelInfo-flightTicket-container">
        {seat ? <ComboFlightTicket disableButton={true} seat={seat} /> : null}
      </div>
      <div className="hotelInfo">
        <div className="container">
          <div className="group1">
            <div className="left">
              <div className="hotelName">{hotel?.hotelName}</div>
              <div className="hotel-starGroup">
                <span className="text">Khách sạn</span>{" "}
                {stars.map((value, index) => (
                  <span key={index}>
                    <HotelStarSmall />
                  </span>
                ))}
              </div>
              <div className="location">
                {" "}
                <LocationIconBlack />
                <p>{hotel?.address}</p>
              </div>
            </div>
            <div className="right">
              <div className="text">Giá/phòng/đêm từ</div>
              <div className="price">{`${hotel?.minSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</div>
              <a href="#rooms">Chọn phòng</a>
            </div>
          </div>
          <div className="group2">
            <div className="left">
              <img src={images[0]} alt="" />
            </div>
            <div className="right">
              <img src={images[1]} alt="" />
              <img src={images[2]} alt="" />
              <img src={images[3]} alt="" />
              <img src={images[4]} alt="" />
              <img src={images[5]} alt="" />
              <div onClick={handleFullScreen} className="last-img">
                <img src={images[6]} alt="" />
                <div className="bg">Xem tất cả hình ảnh</div>
              </div>
            </div>
          </div>
          <div className="group3">
            <div className="left">
              <div className="row1">
                <h3>Giới thiệu cơ sở lưu trú</h3>{" "}
                <div className="loadmore">Xem thêm</div>
              </div>
              <div className="row2">
                <p>{hotel?.description}</p>
              </div>
            </div>
            <div className="right">
              <div className="facility">
                <div className="row1">
                  <h3>Tiện ích chính</h3>
                </div>
                <div className="row2">
                  {utilities.map((util) => (
                    <div key={"div" + util.id} className="group">
                      <TravelokaIcon />{" "}
                      <span key={"span" + util.id}>
                        {util.hotelUtility.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="preview-comment">
                <div className="row1">
                  <p>Khách nói gì về kỳ nghỉ của họ</p>
                </div>
                <div className="row2">
                  <div className="comment-tag">
                    <div className="comment-tag-row1">
                      <div className="comment-tag-left">
                        <span className="travelIcon">
                          <TravelokaIcon />
                        </span>
                        <span className="ratePoint">10.0</span>
                        <span className="staticPoint">/ 10</span>
                      </div>
                      <div className="comment-tag-right">
                        <span>Lam Chi Hung</span>
                      </div>
                    </div>
                    <div className="comment-tag-row2">
                      <p>
                        Khách sạn đối diện khúc biển cát rất êm, không hề có đá.
                        Lần đầu tắm biển mà cảm thấy không sợ bị xước da chảy
                        máu. Khúc biển đối diện cũng không đông đúc. Dậy sớm ăn
                        sáng rồi tắm luôn là hết sẩy. Nhân viên xách hành lý
                        lịch sự nhã nhặn. Nhìn rất hiền. Ra vô luôn có lễ tân
                        cúi chào. Anh quản lý làm nhân viên check in siêu nhanh.
                        Có welcome drink nữa. Nói chung là ổn trong tầm giá.
                        View biển khá đẹp.
                      </p>
                    </div>
                  </div>
                  <div className="comment-tag">
                    <div className="comment-tag-row1">
                      <div className="comment-tag-left">
                        <span className="travelIcon">
                          <TravelokaIcon />
                        </span>
                        <span className="ratePoint">10.0</span>
                        <span className="staticPoint">/ 10</span>
                      </div>
                      <div className="comment-tag-right">
                        <span>Lam Chi Hung</span>
                      </div>
                    </div>
                    <div className="comment-tag-row2">
                      <p>
                        Khách sạn đối diện khúc biển cát rất êm, không hề có đá.
                        Lần đầu tắm biển mà cảm thấy không sợ bị xước da chảy
                        máu. Khúc biển đối diện cũng không đông đúc. Dậy sớm ăn
                        sáng rồi tắm luôn là hết sẩy. Nhân viên xách hành lý
                        lịch sự nhã nhặn. Nhìn rất hiền. Ra vô luôn có lễ tân
                        cúi chào. Anh quản lý làm nhân viên check in siêu nhanh.
                        Có welcome drink nữa. Nói chung là ổn trong tầm giá.
                        View biển khá đẹp.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="rooms" className="group4">
            <div className="group4-title">
              Những phòng còn trống tại khách sạn
            </div>
            {rooms.map((room) => (
              <RoomCard
                combo={comboIsValid}
                key={"room" + room.id}
                room={room}
              />
            ))}
          </div>
        </div>
        <ImageGallery
          showIndex={true}
          ref={gallaryRef}
          className="gallary"
          items={gallery}
        />
        <div>
          <FrameComment />
        </div>
      </div>
    </>
  );
}
export default HotelInfo;
