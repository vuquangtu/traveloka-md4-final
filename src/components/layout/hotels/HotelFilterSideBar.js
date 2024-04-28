import { useNavigate } from "react-router-dom";
import HotelFilterBanner from "./HotelFilterBanner";
import HotelFilterMoneyRange from "./HotelFilterMoneyRange";
import HotelFilterStarChecked from "./HotelFilterStarChecked";
import { useDispatch, useSelector } from "react-redux";
import { selectHotel, changeHotelId, changePageNumber } from "../../../redux/features/hotelSlice";
import { changeHotels } from "../../../redux/features/hotelsSlice";
import axios from "../../../config/privateAxios";
import { changeCombos } from "../../../redux/features/combosSlice";
import { selectComboFlight } from "../../../redux/features/comboFlightSlice";


function HotelFilterSideBar(params) {
    const combo = params.combo;
    const comboFlight = useSelector(selectComboFlight);
    const hotel = useSelector(selectHotel);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleFilter(){
        if(combo){
            dispatch(changePageNumber(0));
            axios.post("/api/combo/search", {
                searchFlightDetailsRequestDTO: comboFlight,
                hotelSearchDTO: hotel,
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
        } else{
            navigate("/hotels");
            dispatch(changeHotelId(null))
            dispatch(changePageNumber(0));
            axios.post("/api/search/hotels", {
                ...hotel, pageNumber: 0, hotelId: null
            })
                .then((result) => dispatch(changeHotels(result.data.hotels)))
                .catch(error => console.log(error))
        }
        
    }

    return (
        <div className="hotelFilterSideBar">
            <div className="hotelFilterSideBar-container">
                <HotelFilterBanner />
                <HotelFilterMoneyRange />
                <HotelFilterStarChecked />
                <button onClick={handleFilter} className="hotelFilterSideBar-container-button">Lọc kết quả tìm kiếm</button>
            </div>
        </div>
    )
}
export default HotelFilterSideBar;