import YellowStar from "../../icon/YellowStar"
import { addStar, removeStar, selectHotel } from "../../../redux/features/hotelSlice";
import { useDispatch, useSelector } from "react-redux";

function HotelFilterStarChecked(params) {

    const hotel = useSelector(selectHotel);
    const dispatch = useDispatch();

    function handleChecked(event) {
        if (event.target.checked) {
            dispatch(addStar(+event.target.value));
        } else {
            dispatch(removeStar(+event.target.value));
        }
    }

    return (
        <div className="hotelFilterStarChecked">
            <div className="row1-text">
                <p>Hạng sao</p>
            </div>
            <div className="row2-starGroup">
                <label htmlFor="1" className="group">
                    <input checked={hotel.stars ? hotel.stars.includes(1) : false} onChange={(event) => handleChecked(event)} value={1} hidden type="checkbox" name="star" id="1" />
                    <div className="box-outline"><div className="box-center"></div></div>
                    <label htmlFor="1"><YellowStar /></label>
                </label>
                <label htmlFor="2" className="group">
                    <input checked={hotel.stars ? hotel.stars.includes(2) : false} onChange={(event) => handleChecked(event)} value={2} hidden type="checkbox" name="star" id="2" />
                    <div className="box-outline"><div className="box-center"></div></div>
                    <label htmlFor="2"><YellowStar /><YellowStar /></label>
                </label>
                <label htmlFor="3" className="group">
                    <input checked={hotel.stars ? hotel.stars.includes(3) : false} onChange={(event) => handleChecked(event)} value={3} hidden type="checkbox" name="star" id="3" />
                    <div className="box-outline"><div className="box-center"></div></div>
                    <label htmlFor="3"><YellowStar /><YellowStar /><YellowStar /></label>
                </label>
                <label htmlFor="4" className="group">
                    <input checked={hotel.stars ? hotel.stars.includes(4) : false} onChange={(event) => handleChecked(event)} value={4} hidden type="checkbox" name="star" id="4" />
                    <div className="box-outline"><div className="box-center"></div></div>
                    <label htmlFor="4"><YellowStar /><YellowStar /><YellowStar /><YellowStar /></label>
                </label>
                <label htmlFor="5" className="group">
                    <input checked={hotel.stars ? hotel.stars.includes(5) : false} onChange={(event) => handleChecked(event)} hidden value={5} type="checkbox" name="star" id="5" />
                    <div className="box-outline"><div className="box-center"></div></div>
                    <label htmlFor="5"><YellowStar /><YellowStar /><YellowStar /><YellowStar /><YellowStar /></label>
                </label>
            </div>
        </div>
    )
}
export default HotelFilterStarChecked