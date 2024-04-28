import { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { selectHotel, changeMoneyFrom, changeMoneyTo } from "../../../redux/features/hotelSlice"
import { useDispatch, useSelector } from 'react-redux';

function HotelFilterMoneyRange(params) {
    const hotel = useSelector(selectHotel);
    const dispatch = useDispatch();

    function handleChangeRange(value) {
        dispatch(changeMoneyFrom(value[0]));
        dispatch(changeMoneyTo(value[1]));
    }

    function handleChangeMin(event) {
        dispatch(changeMoneyFrom(+event.target.value.replaceAll(".", "")));
    }
    function handleChangeMax(event) {
        dispatch(changeMoneyTo(+event.target.value.replaceAll(".", "")));
    }

    return (
        <div className="hotelFilterMoneyRange">
            <div className="row1-text">
                <p className="subtitle">Phạm vi giá</p>
                <p className="content">1 phòng, 1 đêm</p>
            </div>
            <div className="row2-input">
                <div className='input'>
                    <p>VND</p><input type="text" value={hotel.moneyFrom.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} onChange={(event) => handleChangeMin(event)
                    } />
                </div>
                <div className="line"></div>
                <div className='input'>
                    <p>VND</p><input type="text" value={hotel.moneyTo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} onChange={(event) => handleChangeMax(event)
                    } />
                </div>
            </div>
            <div>
                <RangeSlider step={20000} value={[hotel.moneyFrom, hotel.moneyTo]} onInput={handleChangeRange} min={0} max={106000000} />
            </div>
        </div>
    )
}
export default HotelFilterMoneyRange;