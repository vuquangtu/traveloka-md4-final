import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import HoverRating from "../icon/HoverRating";
import { useRef } from "react";
import axios from "../../config/privateAxios";
import { Checkbox } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function HotelTeraForm({ sendSubmitStatus }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    hotelName: null,
    description: null,
    hotelStar: 2,
    address: null,
    cityId: null,
    utilitiesId: [],
    images: [],
  });
  const prevForm = form;
  const [cities, setCities] = useState([]);
  const [utilityTypes, setUtilityTypes] = useState([]);
  const [utilityList, setUtilityList] = useState([]);

  const [show, setShow] = useState({
    div1: false,
    div2: false,
    div3: false,
    div4: false,
    div5: false,
    div6: false,
    div7: false,
    div8: false,
    div9: false,
    div10: false,
    div11: false,
    div12: false,
    div13: false,
    div14: false,
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  const city = [
    { id: 1, name: "Hà Nội" },
    { id: 2, name: "Hồ Chí Minh" },
    { id: 3, name: "Đà Nẵng" },
  ];

  const handleShow = (key, value) => {
    setShow({ ...show, [key]: value });
  };

  const [checked, setChecked] = useState([]);
  const handleChangeCheckbox = (row, col) => {
    const newChecked = checked.map((rowItem, rowIndex) =>
      rowIndex === row
        ? rowItem.map((colItem, colIndex) =>
            colIndex === col ? !colItem : colItem
          )
        : rowItem
    );
    setChecked(newChecked);
  };

  const handleSubmit = (values, { resetForm }) => {
    sendSubmitStatus(true);
    axios
      .post("http://localhost:8080/api/hotels", form, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Đăng ký khách sạn thành công !");
        setTimeout(() => {
          navigate("/tera/room/register");
        }, 1000);

        sendSubmitStatus(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Đăng ký khách sạn thất bại");

        sendSubmitStatus(false);
      });
  };
  const validationSchema = Yup.object().shape({
    hotelName: Yup.string().required("Tên khách sạn không được để trống"),
    hotelStar: Yup.number().required("Số sao không được để trống"),
    address: Yup.string().required("Địa chỉ không được để trống"),
    description: Yup.string().required("Mô tả không được để trống"),
    city: Yup.string().required("Thành phố không được để trống"),
    utitlities: Yup.array()
      .required("Tiện ích không được để trống")
      .test("is-required", "Chọn ít nhất một tiện ích", (value) => {
        return value.length > 0;
      }),
    images: Yup.array()
      .required("Hình ảnh không được để trống")
      .test("is-iamge", "Chứa file không phải hình ảnh", (value) => {
        if (!value) return true;
        return value.every((file) => file.type.startsWith("image/"));
      })
      .min(7, "Chọn ít nhất 7 hình ảnh"),
  });

  const handleFileChange = () => {
    const selectedFiles = form.images;
    const previews = [];
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previews.push(reader.result);
        setImagePreviews([...previews]);
      };
      reader.readAsDataURL(file);
    });
  };

  const initialValues = { ...form, city: null, utitlities: [] };
  const formikProps = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const { errors, touched, values, handleChange, handleBlur } = formikProps;
  const selectRef = useRef([null, null, null]);

  useEffect(() => {
    handleFileChange();
  }, [form.images]);

  useEffect(() => {
    function handleClickOutside(event) {
      for (let i = 0; i < selectRef.current.length; i++) {
        const ref = selectRef.current[i];
        if (ref && !ref.contains(event.target)) {
          setShow({
            div1: false,
            div2: false,
            div3: false,
            div4: false,
            div5: false,
            div6: false,
            div7: false,
            div8: false,
            div9: false,
            div10: false,
            div11: false,
            div12: false,
            div13: false,
            div14: false,
          });
        }
      }
    }

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const updatedUtilities = checked
      .map((row, rowIndex) =>
        row.map((isChecked, colIndex) =>
          isChecked ? utilityList[rowIndex][colIndex].id : null
        )
      )
      .flat()
      .filter((id) => id !== null);
    setForm({
      ...form,
      utilitiesId: updatedUtilities,
    });

    setForm({
      ...form,
      utilitiesId: updatedUtilities,
    });
    formikProps.setFieldValue("utitlities", updatedUtilities);
    formikProps.validateField("utitlities");
  }, [checked]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/cities").then((res) => {
      setCities(res.data);
      formikProps.setFieldValue("city", res.data[0].name);
      setForm((prev) => ({ ...prev, cityId: res.data[0].id }));
    }, []);
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/hotel-utility-types").then((res) => {
      setUtilityTypes(res.data);
      setUtilityList(Array(res.data.length).fill([]));
      setChecked(Array(res.data.length).fill([]));
    }, []);
  }, []);

  const fetchHotelUtil = (index, id) => {
    axios.get(`http://localhost:8080/api/hotel-utilities/${id}`).then((res) => {
      const newUtilityList = utilityList.map((item, idx) => {
        return idx === index ? res.data : item;
      });
      const newChecked = checked.map((item, idx) => {
        return idx === index ? Array(res.data.length).fill(false) : item;
      });
      setUtilityList(newUtilityList);
      setChecked(newChecked);
    });
  };
  return (
    <div className="w-full px-2" style={{ backgroundColor: "#ebf1f5" }}>
      <div className="w-3/5 mx-auto  bg-white relative">
        <div className="w-full mx-auto">
          <div className="w-full border mx-auto border-solid border-slate-200 px-2">
            <form onSubmit={formikProps.handleSubmit} className="my-4">
              <div className="font-bold text-2xl mb-4 ml-1">
                Đăng ký khách sạn
              </div>
              <div className="w-full border-t border-solid border-slate-200">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="hotelName">
                      Tên khách sạn
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="hotelName"
                      id="hotelName"
                      value={values.hotelName || ""}
                      onChange={(event) => {
                        handleChange(event);
                        setForm({ ...form, hotelName: event.target.value });
                      }}
                      onBlur={handleBlur}
                      className="px-2 border border-solid border-slate-200 w-64 mr-14 h-8 rounded-md"
                    />
                  </div>
                  <div>
                    {errors.hotelName && touched.hotelName && (
                      <div className="text-red-400 italic text-sm w-full mt-1">
                        <p
                          className="text-end"
                          style={{ marginRight: "5.3rem" }}
                        >
                          {errors.hotelName}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full ">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="description">
                      Mô tả khách sạn{" "}
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      value={values.description || ""}
                      onChange={(event) => {
                        handleChange(event);
                        setForm({ ...form, description: event.target.value });
                      }}
                      onBlur={handleBlur}
                      className="px-3 pt-2 border border-solid border-slate-200 w-64 mr-14 h-20 rounded-md"
                    />
                  </div>
                  <div>
                    {errors.description && touched.description && (
                      <div className="text-red-400 italic text-sm w-full mt-1">
                        <p
                          className="text-end"
                          style={{ marginRight: "8.8rem" }}
                        >
                          {errors.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full ">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="hotelRating">
                      Đánh giá khách sạn{" "}
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </label>
                    <div style={{ marginRight: "7rem" }}>
                      <HoverRating
                        rating={(data) => {
                          setForm({ ...form, hotelStar: data });
                          formikProps.setFieldValue("hotelStar", data);
                          formikProps.validateField("hotelStar");
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    {errors.hotelStar && touched.hotelStar && (
                      <div className="text-red-400 italic text-sm w-full mt-1">
                        <p
                          className="text-end"
                          style={{ marginRight: "9.1rem" }}
                        >
                          {errors.hotelStar}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="address">
                      Địa chỉ khách sạn
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={values.address || ""}
                      onChange={(event) => {
                        handleChange(event);
                        setForm({ ...form, address: event.target.value });
                      }}
                      onBlur={handleBlur}
                      className="px-2 border border-solid border-slate-200 w-64 mr-14 h-8 rounded-md"
                    />
                  </div>
                  <div>
                    {errors.address && touched.address && (
                      <div className="text-red-400 italic text-sm w-full mt-1">
                        <p
                          className="text-end"
                          style={{ marginRight: "8.3rem" }}
                        >
                          {errors.address}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full relative">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="city">
                      Thành phố
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </label>
                    <div className="border border-solid border-slate-200  w-64 text-start h-8 mr-14 pt-1 px-2 rounded-md">
                      <div className="flex items-center justitfy-between">
                        <div className="w-1/2 self-center whitespace-nowrap ">
                          {values.city || city[0].name}
                        </div>
                        <div
                          onClick={() => {
                            handleShow("div1", !show.div1);
                          }}
                          className="w-1/2 text-end"
                        >
                          <KeyboardArrowDownIcon
                            className="hover:cursor-pointer self-center"
                            style={{ color: "#0194F3" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {show.div1 && (
                    <div
                      ref={(el) => (selectRef.current[0] = el)}
                      className="absolute top-14 rounded-md z-10 bg-white border border-solid border-slate-200 w-64 max-h-20 overflow-y-scroll"
                      style={{ right: "3.4rem", maxHeight: "300px" }}
                    >
                      {cities.map((item) => (
                        <div
                          onClick={() => {
                            formikProps.setFieldValue("city", item.name);
                            formikProps.validateField("city");
                            setForm({ ...form, cityId: item.id });
                            setShow({ ...show, div1: false });
                          }}
                          className="px-2 py-1 hover:cursor-pointer hover:bg-slate-100"
                        >
                          <p>{item.name}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    {errors.city && touched.city && (
                      <div className="text-red-400 italic text-sm w-full mt-1">
                        <p
                          className="text-end"
                          style={{ marginRight: "7.6rem" }}
                        >
                          {errors.city}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full relative">
                <div className="mx-4 pt-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="utilities">
                      Tiện ích
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </label>
                    <div>
                      {errors.utitlities && touched.utitlities && (
                        <div className="text-red-400 italic text-sm w-full mt-1">
                          <p
                            className="text-end"
                            style={{ marginRight: "10rem" }}
                          >
                            {errors.utitlities}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {utilityTypes.map((item, index) => (
                    <div className="relative" key={item.id}>
                      <div
                        className={`flex justify-between items-center  px-4 py-4 ${
                          index !== utilityTypes.length - 1
                            ? "border-b border-dotted border-slate-200"
                            : ""
                        }`}
                      >
                        <p>{item.name}</p>
                        <div className="px-10 flex gap-2 justify-centers items-center ">
                          <span>Lựa chọn tiện ích | </span>
                          <div
                            className=" hover:cursor-pointer flex items-center"
                            onClick={() => {
                              handleShow(
                                `div${index + 2}`,
                                !show[`div${index + 2}`]
                              );
                              fetchHotelUtil(index, item.id);
                            }}
                          >
                            <span style={{ color: "rgb(87, 167, 237" }}>
                              Mở rộng
                            </span>
                            <span>
                              <KeyboardArrowDownIcon
                                className="fa-solid fa-chevron-down  hover:cursor-pointer"
                                style={{ color: "#0194F3", top: "0.22rem" }}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      {show[`div${index + 2}`] && (
                        <div className="z-10 bg-white text-gray-500">
                          {utilityList[index].map((item, id) => (
                            <p
                              key={id}
                              className="max-h-max flex items-center hover:cursor-pointer  px-4 py-1 border-b border-dotted border-slate-200"
                              onClick={() => {
                                handleChangeCheckbox(index, id);
                              }}
                            >
                              <span>
                                <Checkbox
                                  checked={checked[index][id]}
                                  onChange={() => {
                                    handleChangeCheckbox(index, id);
                                  }}
                                  sx={{
                                    color: "#0194F3",
                                    "&.Mui-checked": {
                                      color: "#0194F3",
                                    },
                                  }}
                                />
                              </span>
                              <span>{item.name}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <p>
                      Hình ảnh khách sạn
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </p>
                    <label htmlFor="images" className="custom-file-button">
                      Chọn ảnh
                    </label>
                    <input
                      type="file"
                      name="images"
                      id="images"
                      multiple
                      onChange={(event) => {
                        const uploadedFiles = Array.from(event.target.files);
                        formikProps.setFieldValue("images", [
                          ...uploadedFiles,
                          ...form.images,
                        ]);
                        formikProps.validateField("images");

                        if (!errors.images?.min) {
                          setForm((prevForm) => ({
                            ...prevForm,
                            images: [...prevForm.images, ...uploadedFiles],
                          }));
                        }
                      }}
                      onBlur={handleBlur}
                      className=" px-2 absolute border border-solid border-slate-200 w-64 mr-14 h-12 rounded-md"
                      style={{ left: "-9999px" }}
                    />
                    <style jsx="true">{`
                      .custom-file-button {
                        display: inline-block;
                        cursor: pointer;
                        padding: 0.5rem 1rem;
                        background-color: #4a90e2;
                        color: #fff;
                        border: none;
                        border-radius: 4px;
                        font-size: 1rem;
                        margin-right: 8rem;
                      }

                      /* Style the file input label to look like a button */
                      .custom-file-button:hover {
                        background-color: #357bd8;
                      }
                    `}</style>
                  </div>
                  <div className="w-full">
                    <div
                      className="ml-60 mt-2"
                      style={{ marginLeft: "19rem", width: "50%" }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 pl-4">
                        {imagePreviews.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt="preview"
                              className="w-full h-auto"
                            />
                            <button
                              type="button"
                              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 flex items-center justify-center"
                              style={{ width: "2rem", height: "2rem" }}
                              onClick={() => {
                                const updatedPreviews = imagePreviews.filter(
                                  (_, i) => i !== index
                                );
                                setImagePreviews(updatedPreviews);

                                setForm((prevForm) => ({
                                  ...prevForm,
                                  images: prevForm.images.filter(
                                    (_, i) => i !== index
                                  ),
                                }));
                                validationSchema();
                              }}
                            >
                              <span className="sr-only">Xóa</span>{" "}
                              <span aria-hidden="true">X</span>{" "}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    {errors.images && touched.images && (
                      <div className="text-red-400 italic text-sm w-full">
                        <p className="text-end" style={{ marginRight: "6rem" }}>
                          {errors.images}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className=" text-white rounded-md w-1/3 mx-auto mb-5 mt-6"
                style={{ backgroundColor: "rgb(255, 94, 31)" }}
              >
                <button
                  type="submit"
                  className="text-center  w-full text-lg font-semibold py-2 hover:cursor-pointer hover:bg-orange-600 hover:rounded-lg transition duration-300 ease-in-out"
                  disabled={formikProps.isSubmitting}
                  onClick={() => {
                    console.log(form);
                  }}
                >
                  Lưu và tiếp tục đăng ký phòng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelTeraForm;
