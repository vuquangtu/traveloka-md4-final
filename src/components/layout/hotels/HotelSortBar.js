import { useDispatch, useSelector } from "react-redux";
import {
    changePageNumber,
    changeSort,
    selectHotel,
} from "../../../redux/features/hotelSlice";
import {
    changeHotels,
    selectHotels,
} from "../../../redux/features/hotelsSlice";
import axios from "../../../config/privateAxios";
import { changeCombos } from "../../../redux/features/combosSlice";
import { selectComboFlight } from "../../../redux/features/comboFlightSlice";

function HotelSortBar(params) {
    const combo = params.combo;
    const comboFlight = useSelector(selectComboFlight);
    const hotel = useSelector(selectHotel);
    const hotels = useSelector(selectHotels).hotels;
    const dispatch = useDispatch();
    function handleChangeSort(event) {
        dispatch(changeSort(event.target.value));
        dispatch(changePageNumber(0))
        if (combo) {
            axios.post("/api/combo/search", {
                searchFlightDetailsRequestDTO: comboFlight,
                hotelSearchDTO: { ...hotel, sort: event.target.value },
                page: 0
            }).then(result => {
                if (result.data.length !== 0) {
                    dispatch(changeCombos(result.data.unitComboResponDTOs));
                } else {
                    dispatch(changeCombos([]));
                }
            }).catch(
                error => console.log(error)
            )
        } else {
            axios.post("/api/search/hotels", {
                ...hotel,
                pageNumber: 0,
                sort: event.target.value
            })
                .then((result) => dispatch(changeHotels(result.data.hotels)))
                .catch(error => console.log(error))
        }
    }
    return (
        <div className="hotelSortBar">
            <input onChange={handleChangeSort} value={"booked"} type="radio" name="sort" id="booked" hidden />
            <label htmlFor="booked" className="group">
                <p className="text-1">Sắp xếp theo</p>
                <p className="text-2">Độ phổ biến</p>
            </label>
            <input onChange={handleChangeSort} value={"point"} type="radio" name="sort" id="point" hidden />
            <label htmlFor="point" className="group">
                <p className="text-1">Sắp xếp theo</p>
                <p className="text-2">Điểm đánh giá</p>
            </label>
            <input onChange={handleChangeSort} value={"minPrice"} type="radio" name="sort" id="minPrice" hidden />
            <label htmlFor="minPrice" className="group">
                <p className="text-1">Sắp xếp theo</p>
                <p className="text-2">Giá thấp nhất</p>
            </label>
            <input onChange={handleChangeSort} value={"maxPrice"} type="radio" name="sort" id="maxPrice" hidden />
            <label htmlFor="maxPrice" className="group">
                <p className="text-1">Sắp xếp theo</p>
                <p className="text-2">Giá cao nhất</p>
            </label>
        </div>
    )
}
export default HotelSortBar;
