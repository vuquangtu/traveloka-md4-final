import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCity,
  changePageNumber,
  selectHotel,
} from "../../redux/features/hotelSlice";
import axios from "../../config/privateAxios";
import { changeHotels } from "../../redux/features/hotelsSlice";
import userSlice from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
function HotelDiscovery() {
  const dispatch = useDispatch();
  const hotel = useSelector(selectHotel);
  const navigate = useNavigate();
  const getHotels = (cityId, cityName) => {
    dispatch(changeCity({ id: cityId, name: cityName }));
    dispatch(changePageNumber(0));
    console.log(hotel);
    axios
      .post("/api/search/hotels", {
        cityId: cityId,
        pageNumber: 0,
      })
      .then((result) => {
        navigate("/hotels");
        dispatch(changeHotels(result.data.hotels));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container w-4/5 mx-auto">
      <div className="mt-5">
        <div className="">
          <h2>
            <div className="flex gap-2">
              <span>
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/01/1685631988109-4e2f068146d14d35aa47c5e9e9add5ff.png?_src=imagekit&tr=q-40,h-24"
                  importance="low"
                  loading="lazy"
                  alt=""
                  // srcSet="https://ik.imagekit.io/tvlk/image/imageResource/2024/03/21/1711002136291-9aa9885d81f33cafc62a860c5fc2e506.png?_src=imagekit&amp;tr=q-40,h-24 1x, https://ik.imagekit.io/tvlk/image/imageResource/2024/03/21/1711002136291-9aa9885d81f33cafc62a860c5fc2e506.png?_src=imagekit&amp;tr=dpr-2,q-40,h-24 2x, https://ik.imagekit.io/tvlk/image/imageResource/2024/03/21/1711002136291-9aa9885d81f33cafc62a860c5fc2e506.png?_src=imagekit&amp;tr=dpr-3,q-40,h-24 3x"
                  height="24"
                  style={{ objectFit: "fill", objectPosition: "50% 50%" }}
                />
              </span>
              <span className="font-bold text-xl">
                Tái khám phá bản thân ở Việt Nam và những nơi khác
              </span>
            </div>
          </h2>
        </div>
        <div className="mt-7">
          <div className="flex gap-5 justify-center">
            <div
              className="relative hover:cursor-pointer bg-white rounded-md shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
              style={{ maxWidth: "300px", height: "180px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1536086845112-89de23aa4772?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hình ảnh Hồ Chí Minh"
                onClick={() => getHotels(30, "Thành phố Hồ Chí Minh")}
                className="h-auto w-30 object-cover rounded-md"
              />
              <div className="absolute top-0 left-0 p-4">
                <div className="text-white font-bold text-l">Hồ Chí Minh</div>
                <p className="text-white">2000 accommodations</p>
              </div>
            </div>
            <div
              className="relative  hover:cursor-pointer bg-white rounded-md shadow-md overflow-hidden  transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
              style={{ maxWidth: "300px", height: "180px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hình ảnh Đà Nẵng"
                onClick={() => getHotels(15, "Thành phố Đà Nẵng")}
                className="h-auto w-30 object-cover rounded-md"
              />
              <div className="absolute top-0 left-0 p-4">
                <div className="text-white font-bold text-l">Đà Nẵng</div>
                <p className="text-white">1000 accommodations</p>
              </div>
            </div>
            <div
              className="relative bg-white hover:cursor-pointer rounded-md shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
              style={{ maxWidth: "300px", height: "180px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1599708153386-62bf3f035c78?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hình ảnh Hà Nội"
                onClick={() => getHotels(24, "Thành phố Hà Nội")}
                className="h-auto w-30 object-cover rounded-md"
              />
              <div className="absolute top-0 left-0 p-4">
                <div className="text-white font-bold text-l">Hà Nội</div>
                <p className="text-white">2000 accommodations</p>
              </div>
            </div>
          </div>
          <div className="hotel-discovery__images__item flex gap-5 justify-center mx-2 mt-5">
            <div
              className="relative rounded-md  shadow-md overflow-hidden transition duration-300 ease-in-out opacity-70 hover:opacity-100 hover:-translate-y-2 hover:scale-105 cursor-not-allowed"
              style={{ maxWidth: "300px", height: "180px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1671783180076-e906ffbd6663?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hình ảnh Đà Lạt"
                className="h-auto w-30 object-cover rounded-md"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
              <div className="absolute top-0 left-0 p-4">
                <div className="text-white font-bold text-l">Đà Lạt</div>
                <p className="text-white">1200 accommodations</p>
              </div>
            </div>

            <div
              className="relative rounded-md shadow-md overflow-hidden transition duration-300 ease-in-out opacity-70 hover:opacity-100 hover:-translate-y-2 hover:scale-105 cursor-not-allowed"
              style={{ maxWidth: "300px", height: "180px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hình ảnh Vịnh Hạ Long"
                className="h-auto w-30 object-cover rounded-md"
              />
              <div className="absolute top-0 left-0 p-4">
                <div className="text-white font-bold text-l">Quảng Ninh</div>
                <p className="text-white">1100 accommodations</p>
              </div>
            </div>
            <div
              className="relative rounded-md shadow-md overflow-hidden transition duration-300 ease-in-out opacity-70 hover:opacity-100 hover:-translate-y-2 hover:scale-105 cursor-not-allowed"
              style={{ maxWidth: "300px", height: "180px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1604971684445-0ac837a1c720?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aHVlfGVufDB8fDB8fHww"
                alt="Hình ảnh Huế"
                className="h-auto w-30 object-cover rounded-md"
              />
              <div className="absolute top-0 left-0 p-4">
                <div className="text-white font-bold text-l">Huế</div>
                <p className="text-white">900 accommodations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDiscovery;
