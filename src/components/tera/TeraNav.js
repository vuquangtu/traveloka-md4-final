import React, { useState } from "react";

function TeraNav() {
  const [selectedItem, setSelectedItem] = useState(null);
  const list = [
    "Thông tin khách sạn",
    "Thông tin phòng",
    "Số phòng đã đặt",
    "Doanh thu",
    "Đánh giá",
    "Hình ảnh",
  ];
  return (
    <div>
      <div className=" text-white bg-blue-900 h-screen">
        <h3 className="text-xl font-bold pt-12 text-center">Danh sách</h3>
        <ul className="mt-8 leading-6">
          {list.map((item, index) => (
            <li
              onClick={() => {
                setSelectedItem(index);
              }}
              className={`hover:bg-blue-300 hover:cursor-pointer px-4 mx-6 h-10 pt-2 rounded-md  ${
                index === selectedItem ? "bg-indigo-400" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeraNav;
