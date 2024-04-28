import PersonSmallIcon from "../../icon/PersonSmallIcon";
import TravelokaIcon from "../../icon/TravelokaIcon";
import CoinIcon from "../../icon/CoinIcon";
import { useEffect, useState } from "react";
import axios from "../../../config/privateAxios";
import { useNavigate, useDispatch } from "react-router-dom";
import {selectComboFlight } from "../../../redux/features/comboFlightSlice";
import { useSelector } from "react-redux";

function RoomCard(params) {
    const comboFlight = useSelector(selectComboFlight);
    const combo = params.combo;
    const room = params.room;
    const [utilities, setUtilities] = useState([]);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (room.id != null) {
            axios.get("/api/room/utilities", { params: { roomId: room.id } })
                .then(result => { setUtilities(result.data) })
                .catch(error => console.log(error))
        }
    }, [room]);
    useEffect(() => {
        if (room.id != null) {
            axios.get("/api/room/images", { params: { roomId: room.id } })
                .then(result => { setImages(result.data) })
                .catch(error => console.log(error))
        }
    }, [room]);
    function handleChooseRoom(params) {
        if (combo) {
            navigate(`/combo/room/${room.id}/flight/${comboFlight.id}`);
        } else {
            navigate(`/hotels/booking/${room.id}`);
        }
    }
    return (
        <div className="roomCard">
            <div className="roomCard-row1">
                <p>{room ? room.roomType ? room.roomType.name : null : null}</p>
            </div>
            <div className="roomCard-row2">
                <div className="roomCard-row2-left" >
                    <img src={images[0] ? images[0].url : null} alt="room" />
                </div>
                <div className="roomCard-row2-right">
                    <div className="roomCard-row2-right-card">
                        <div className="roomCard-row2-right-card-row1">
                            <div className="roomCard-row2-right-card-row1-left">
                                <PersonSmallIcon /> <span>{room ? room.maxPerson : null} Khách</span>
                            </div>
                        </div>
                        <div className="roomCard-row2-right-card-row2">
                            <div className="roomCard-row2-right-card-row2-left">
                                {utilities.map((util) => <div key={"div" + util.id} className="roomCard-row2-right-card-row2-left-utility">
                                    <TravelokaIcon /> <span key={"span" + util.id}>{util.roomUtility.name}</span>
                                </div>)}
                            </div>
                            <div className="roomCard-row2-right-card-row2-right">
                                <div className="roomCard-row2-right-card-row2-right-originPrice">{room.unitPriceOrigin ? room.unitPriceOrigin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : null}VND</div>
                                <div className="roomCard-row2-right-card-row2-right-sellPrice">{room.unitPriceSell ? room.unitPriceSell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : null} VND</div>
                                <div className="roomCard-row2-right-card-row2-right-text"><CoinIcon />Bao gồm thuế và phí</div>
                                <div className="roomCard-row2-right-card-row2-right-button"><button onClick={handleChooseRoom}>Đặt ngay</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RoomCard;