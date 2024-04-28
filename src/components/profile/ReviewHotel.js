import React, { useEffect } from "react";
import EditTable from "./EditTable";
import axios from "../../config/privateAxios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HotelIcon from "../icon/HotelIcon";
import { Link } from "react-router-dom";

function ReviewHotel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    hotelName: "",
    ratingPoint: 1,
    comment: "",
    images: [],
  });

  const [review, setReview] = useState({ nice: "", bad: "", other: "" });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (review.nice) formData.comment = "Phòng đẹp, sạch sẽ";
    if (review.bad) formData.comment = "Phòng xấu, dơ";
    if (review.other) formData.comment = review.other;

    const formDataToSend = new FormData();
    formDataToSend.append("contractId", id);
    formDataToSend.append("ratingPoint", formData.ratingPoint);
    formDataToSend.append("comment", formData.comment);
    if (formData.images)
      Array.from(formData.images).forEach((image, index) => {
        formDataToSend.append(`images[${index}]`, image);
      });
    axios
      .post("/api/review", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      .then((response) => {
        toast.success("Đánh giá đã được gửi", response.data);
        navigate("/bookinghotel");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đánh giá không thành công", error);
      });
  };
  const [imageCount, setImageCount] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);

  const deleteImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setImageCount(selectedImages.length - 1);
  };

  useEffect(() => {
    axios
      .get(`/api/profile/contract/${id}`, formData)
      .then((response) => {
        setFormData({ ...response.data, ratingPoint: 1 });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCheckChange = (event) => {
    const { name, checked } = event.target;
    setReview({
      nice: false,
      bad: false,
      other: false,
      [name]: checked,
    });
  };
  const handleInputChange = (event) => {
    setReview({ ...review, [event.target.name]: event.target.value });
  };

  return (
    <div className="edit-profile mx-auto my-auto w-8/12 pt-5">
      <div className="flex gap-3">
        <EditTable />
        <div className="right-content w-4/5 pl-5 font-sans">
          <div className="flex flex-col justify-between pb-4">
            <div className="flex gap-3 items-center align-center">
              <HotelIcon />
              <h1 className="font-bold text-2xl mt-2">{formData.hotelName}</h1>
            </div>
            <p className="font-medium mt-3">
              Bạn chỉ có thể đánh giá khách sạn sau khi đã đặt phòng
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-2 bg-gray rounded-lg border-solid border-2 border-gray-200 font-sans">
              <div className="ms-2 my-3">
                <div className="px-2 me-2">
                  <label className="text-base leading-6 text-gray-900">
                    Bạn có nhận xét gì về khách sạn chúng tôi ?
                  </label>
                  <div className="mt-3">
                    <div className="mt-5 flex flex-col gap-3">
                      <label>
                        <input
                          type="radio"
                          name="nice"
                          value="nice"
                          checked={review.nice}
                          onChange={handleCheckChange}
                          className="mr-2"
                        />
                        Phòng đẹp, sạch sẽ
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="bad"
                          value="bad"
                          checked={review.bad}
                          onChange={handleCheckChange}
                          className="mr-2"
                        />
                        Phòng xấu, dơ
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="other"
                          value="other"
                          checked={review.other}
                          onChange={handleCheckChange}
                          className="mr-2"
                        />
                        Other
                      </label>
                      {review.other && (
                        <input
                          type="text"
                          name="other"
                          id="comment"
                          onChange={handleInputChange}
                          placeholder="Viết nhận xét của bạn..."
                          className="my-3 shadow border outline-none rounded-md h-16 w-full px-3 text-gray-700 focus:border-[#6A64F1] focus:shadow-md"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 px-2 flex">
                  <div className="w-full sm:w-1/3">
                    <div className="mb-5">
                      <label
                        htmlFor="gender"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Điểm đánh giá
                      </label>

                      <select
                        id="point"
                        name="ratingPoint"
                        defaultValue={"1"}
                        className="shadow-md w-16 rounded-md border-2 border-solid  py-2 px-2 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            ratingPoint: Number(event.target.value),
                          })
                        }
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-full px-3 sm:w-2/4">
                    <div className="mb-5 flex flex-col">
                      <label
                        htmlFor="Image"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Hình ảnh
                      </label>

                      <div className="custom-file-upload flex">
                        <label className="w-24 shadow rounded-md border py-2 px-2 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md cursor-pointer hover:bg-sky-300">
                          <input
                            type="file"
                            name="image"
                            id="image"
                            className="hidden"
                            multiple
                            onChange={(event) => {
                              setFormData({
                                ...formData,
                                images: event.target.files,
                              });
                              setImageCount(event.target.files.length);
                              setSelectedImages(
                                Array.from(event.target.files).map((file) =>
                                  URL.createObjectURL(file)
                                )
                              );
                            }}
                          />
                          Chọn ảnh
                        </label>
                        <p className="ms-3 mt-1 font-sans text-base">
                          Đã chọn {imageCount} ảnh
                        </p>
                      </div>

                      <div>
                        {selectedImages.map((image, index) => (
                          <div key={index} className="relative inline-block">
                            <img
                              src={image}
                              alt={`Selected ${index}`}
                              className="w-32 h-32 object-cover"
                            />
                            <button
                              onClick={() => deleteImage(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="ms-2 me-5 mt-3 border border-gray-200" />

                <div className="mt-5 me-5 flex justify-end items-center gap-5">
                  <Link to="/bookinghotel">
                    <button
                      type="button"
                      className="text-lg rounded-md text-sky-600 font-bold leading-6 px-3 py-2 bg-gray-100 hover:bg-gray-200"
                    >
                      Huỷ
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="rounded-md bg-sky-600 px-3 py-2 text-lg font-bold text-white shadow-md hover:bg-blue-500 "
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewHotel;
