import React, { useEffect, useState } from "react";
import EditTable from "./EditTable";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/privateAxios";
import { getCustomer } from "../../redux/features/customerSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../buttons/BackButton";
import Header from "../hompage/Header";

function EditProfile() {
  const dispatch = useDispatch();
  const customer = useSelector(getCustomer);
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    date: 1,
    month: 1,
    year: 2024,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/customers`);
        dispatch(getCustomer(response.data));
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  const updateData = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      setErrorMessage("Vui lòng không để trống");
      toast.error("Cập nhập hồ sơ thất bại");
      return;
    } else if (formData.name && /\d/.test(formData.name)) {
      setErrorMessage("Vui lòng chỉ ghi tên, không được ghi số");
      toast.error("Cập nhập hồ sơ thất bại");
      return;
    } else {
      setErrorMessage("");
    }

    try {
      const response = await axios.put(`/api/update/customers`, formData);
      toast.success("Cập nhật hồ sơ thành công");
      setErrorMessage("");
    } catch (error) {
      toast.error("Cập nhật hồ sơ thất bại");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="hotelHeader">
        <Header />
      </div>
      <div className="edit-profile mx-auto w-3/5 mt-20">
        <div className="flex gap 5">
          <EditTable />
          <div className="right-content w-4/5 pl-5">
            <div className="flex pb-4">
              <h1 className="font-bold text-2xl mt-2">Dữ liệu cá nhân</h1>
            </div>
            <form>
              <div className="mt-2 bg-gray rounded-lg border-solid border-2 border-gray-200">
                <div className="ms-2 my-3">
                  <div className="px-2 me-2">
                    <label className="text-sm leading-6 text-gray-900">
                      Tên
                    </label>
                    <div className="mt-1">
                      <input
                        type="hidden"
                        name="id"
                        value={customer.customerId}
                      />
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow border outline-none rounded-md w-full py-2 px-3 text-gray-700 focus:border-[#6A64F1] focus:shadow-md"
                      />
                      {errorMessage && (
                        <p className="text-red-500 italic font-semibold mt-2">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 px-2 flex">
                    <div className="w-full sm:w-1/3">
                      <div className="mb-5">
                        <label
                          htmlFor="gender"
                          className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                          Giới tính
                        </label>

                        <select
                          id="gender"
                          name="gender"
                          className="shadow-md w-20 rounded-md border-2 border-solid  py-2 px-2 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          value={formData.gender}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              gender: event.target.value,
                            })
                          }
                        >
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                          <option value="Khác">Khác</option>
                        </select>
                      </div>
                    </div>

                    <div className="w-full px-3 sm:w-1/6">
                      <div className="mb-5">
                        <label
                          htmlFor="Date"
                          className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                          Ngày sinh
                        </label>
                        {/* <input
                        type="text"
                        name="date"
                        id="lName"
                        value={formData.date}
                        onChange={handleChange}
                        className="shadow w-full rounded-md border py-2 px-3 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      /> */}

                        <select
                          id="month"
                          name="month"
                          className="shadow-md w-16 rounded-md border-2 border-solid  py-2 px-2 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          value={formData.date}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              date: Number(event.target.value),
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
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                          <option value="21">21</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                          <option value="24">24</option>
                          <option value="25">25</option>
                          <option value="26">26</option>
                          <option value="27">27</option>
                          <option value="28">28</option>
                          <option value="29">29</option>
                          <option value="30">30</option>
                          <option value="31">31</option>
                        </select>
                      </div>
                    </div>

                    <div className="w-full px-3 sm:w-1/6">
                      <div className="mt-9">
                        {/* <input
                        type="text"
                        name="month"
                        id="lName"
                        value={formData.month}
                        onChange={handleChange}
                        className="shadow w-full rounded-md border py-2 px-3 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      /> */}
                        <select
                          id="month"
                          name="month"
                          className="shadow-md w-16 rounded-md border-2 border-solid  py-2 px-2 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          value={formData.month}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              month: Number(event.target.value),
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
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                      </div>
                    </div>

                    <div className="w-full px-3 sm:w-1/6">
                      <div className="mt-9">
                        {/* <input
                        type="text"
                        name="year"
                        id="lName"
                        value={formData.year}
                        onChange={handleChange}
                        className="shadow w-full rounded-md border py-2 px-3 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      /> */}
                        <select
                          id="month"
                          name="year"
                          className="shadow-md w-20 rounded-md border-2 border-solid py-2 px-2 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          value={formData.year}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              year: Number(event.target.value),
                            })
                          }
                        >
                          <option value="2023">2023</option>
                          <option value="2022">2022</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                          <option value="2019">2019</option>
                          <option value="2018">2018</option>
                          <option value="2017">2017</option>
                          <option value="2016">2016</option>
                          <option value="2015">2015</option>
                          <option value="2014">2014</option>
                          <option value="2013">2013</option>
                          <option value="2012">2012</option>
                          <option value="2011">2011</option>
                          <option value="2010">2010</option>
                          <option value="2009">2009</option>
                          <option value="2008">2008</option>
                          <option value="2007">2007</option>
                          <option value="2006">2006</option>
                          <option value="2005">2005</option>
                          <option value="2004">2004</option>
                          <option value="2003">2003</option>
                          <option value="2002">2002</option>
                          <option value="2001">2001</option>
                          <option value="2000">2000</option>
                          <option value="1999">1999</option>
                          <option value="1998">1998</option>
                          <option value="1997">1997</option>
                          <option value="1996">1996</option>
                          <option value="1995">1995</option>
                          <option value="1994">1994</option>
                          <option value="1993">1993</option>
                          <option value="1992">1992</option>
                          <option value="1991">1991</option>
                          <option value="1990">1990</option>
                          <option value="1989">1989</option>
                          <option value="1988">1988</option>
                          <option value="1987">1987</option>
                          <option value="1986">1986</option>
                          <option value="1985">1985</option>
                          <option value="1984">1984</option>
                          <option value="1983">1983</option>
                          <option value="1982">1982</option>
                          <option value="1981">1981</option>
                          <option value="1980">1980</option>
                          <option value="1979">1979</option>
                          <option value="1978">1978</option>
                          <option value="1977">1977</option>
                          <option value="1976">1976</option>
                          <option value="1975">1975</option>
                          <option value="1974">1974</option>
                          <option value="1973">1973</option>
                          <option value="1972">1972</option>
                          <option value="1971">1971</option>
                          <option value="1970">1970</option>
                          <option value="1969">1969</option>
                          <option value="1968">1968</option>
                          <option value="1967">1967</option>
                          <option value="1966">1966</option>
                          <option value="1965">1965</option>
                          <option value="1964">1964</option>
                          <option value="1963">1963</option>
                          <option value="1962">1962</option>
                          <option value="1961">1961</option>
                          <option value="1960">1960</option>
                          <option value="1959">1959</option>
                          <option value="1958">1958</option>
                          <option value="1957">1957</option>
                          <option value="1956">1956</option>
                          <option value="1955">1955</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <hr className="ms-2 me-5 mt-3 border border-gray-200" />

                  <div className="mt-5 me-5 flex justify-end items-center gap-5">
                    <button
                      type="button"
                      className="text-lg rounded-md text-sky-600 font-bold leading-6 px-3 py-2 bg-gray-100 hover:bg-gray-200"
                    >
                      Huỷ
                    </button>

                    <button
                      type="submit"
                      className="rounded-md bg-sky-600 px-3 py-2 text-lg font-bold text-white shadow-md hover:bg-blue-500 "
                      onClick={updateData}
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
    </>
  );
}

export default EditProfile;
