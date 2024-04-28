import React from "react";

function HotelTeraService() {
  return (
    <div
      className="flex bg-white rounded-lg shadow-md hover:border-blue-300 hover:border-solid hover:border-2 overflow-hidden h-34 border-2 border-gray-200 p-4 m-4 transition duration-300 transform hover:-translate-y-1"
      style={{ width: "30%" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img
          src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/06/1583477339900-b6bbc823a58cd2512e7765d6ddc6fbbb.svg?tr=q-75"
          width={80}
          height={80}
          alt="Hình ảnh"
        />
      </div>
      <div className="flex flex-col justify-between p-2">
        <h2 className="text-xl font-semibold text-gray-900">Hotel</h2>
        <p className="text-gray-700">
          Một loại chỗ ở thương mại cung cấp phòng riêng với bữa ăn và dịch vụ
          cho khách
        </p>
      </div>
    </div>
  );
}

export default HotelTeraService;
