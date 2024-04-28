import React from "react";
import PromotionIcon from "../icon/PromotionIcon";

function FlightPromotion() {
  return (
    <div className="">
      <p className="flex items-center gap-2">
        <PromotionIcon />
        <span className="text-sm pt-1">Khuyến mãi</span>
      </p>
      <div className="shadow-md rounded-md px-2 py-2 mt-4 w-4/5 mx-auto">
        <div className="flex justify-start gap-2 ">
          <img
            src="https://ik.imagekit.io/tvlk/image/imageResource/2023/11/01/1698810160376-89502fd494dc7735e6d79b440f754556.png?tr=dpr-2,h-60,q-75,w-60"
            alt="promotion"
            style={{ width: "60px", height: "auto" }}
          />
          <p className="text-wrap text-sm font-semibold ml-1">
            Tiết kiệm tới 300K VNĐ cho vé bay,..{" "}
          </p>
          <p className="text-sm px-2 pt-1 bg-yellow-300 rounded-xl h-6 flex-grow text-nowrap">
            Giới hạn
          </p>
        </div>
        <div className="flex text-xs items-center mt-8 justify-between px-3 py-2 border border-dashed bg-slate-100 rounded-md">
          <span>PAYLATER300</span>
          <span style={{ color: "rgb(1, 148, 243)" }}>Sao chép</span>
        </div>
      </div>
    </div>
  );
}

export default FlightPromotion;
