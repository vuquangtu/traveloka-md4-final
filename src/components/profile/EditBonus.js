import React from "react";
import { Link } from "react-router-dom";
import EditProfileContent1 from "./EditTable";
import EditTable from "./EditTable";

function EditProfileContent2() {
  return (
    <div className="edit-bonus mx-auto my-auto w-8/12 pt-5">
      <div className="flex gap-2">
        <EditTable />
        <div className="right-content w-4/5 pl-5 ">
          <div className="flex justify-between pb-4 ">
            <h1 className="font-bold text-2xl">Điểm thưởng của tôi</h1>
            <a href="#">
              <p
                className="font-semibold mt-2"
                style={{ color: "rgba(1, 148, 243, 1)" }}
              >
                Tìm hiểu thêm
              </p>
            </a>
          </div>
          <div className="bg-gray flex h-48 w-auto rounded-lg border-solid border-2 border-gray-200">
            <div
              className="w-1/3"
              style={{
                backgroundColor: "rgb(27, 160, 226)",
                color: "white",
              }}
            >
              <a href="#">
                <p
                  className="mt-2 mx-3 font-semibold"
                  style={{
                    fontFamily: "Arial",
                  }}
                >
                  ĐIỂM KHẢ DỤNG
                </p>
              </a>

              <div className="gap-4">
                <p className="mt-9 mx-3 font-semibold text-4xl">0</p>
                <p className="mt-1 mx-3 font-semibold text-base">
                  (Trị giá VND0)
                </p>
                <p className="mt-6 mx-3 text-lg font-bold opacity-50	">
                  +0 Điểm đang chờ
                </p>
              </div>
            </div>

            <div
              className="w-2/3 mt-2 ms-3 font-semibold"
              style={{ color: "rgb(104, 113, 118)" }}
            >
              <div className="flex justify-between items-center ">
                <h1>TIẾN TRÌNH TÍCH ĐIỂM</h1>
                <Link>
                  <div
                    className="whitespace-nowrap mt-2 me-3 font-bold"
                    style={{ color: "rgb(1, 148, 243, 1)" }}
                  >
                    <h1>Chi tiết</h1>
                  </div>
                </Link>
              </div>

              <div className="flex gap-2">
                <div
                  className="mt-8 ms-2  rounded-full border flex items-center justify-center"
                  style={{
                    height: "70px",
                    width: "70px",
                    backgroundColor: "rgb(48, 197, 247)",
                  }}
                >
                  <img
                    importance="low"
                    loading="lazy"
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416825930-fae0f0b3b42305f47e30ada2fbc7c74f.png?tr=q-75,w-24"
                    srcSet="https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416825930-fae0f0b3b42305f47e30ada2fbc7c74f.png?tr=q-75,w-24 1x, https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416825930-fae0f0b3b42305f47e30ada2fbc7c74f.png?tr=dpr-2,q-75,w-24 2x, https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416825930-fae0f0b3b42305f47e30ada2fbc7c74f.png?tr=dpr-3,q-75,w-24 3x"
                    decoding="async"
                    width="24"
                    alt="icon-ariplane"
                    style={{ filter: "grayscale(1) brightness(8)" }}
                  />
                </div>

                <div
                  className="mt-8 ms-4  rounded-full border flex items-center justify-center"
                  style={{
                    height: "70px",
                    width: "70px",
                    backgroundColor: "rgb(35, 93, 159)",
                  }}
                >
                  <img
                    importance="low"
                    loading="lazy"
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416821839-8752dc371576af3bdebdbbb09ffdc7a6.png?tr=q-75,w-24"
                    srcSet="https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416821839-8752dc371576af3bdebdbbb09ffdc7a6.png?tr=q-75,w-24 1x, https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416821839-8752dc371576af3bdebdbbb09ffdc7a6.png?tr=dpr-2,q-75,w-24 2x, https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416821839-8752dc371576af3bdebdbbb09ffdc7a6.png?tr=dpr-3,q-75,w-24 3x"
                    decoding="async"
                    width="24"
                    alt="icon-city"
                    style={{ filter: "grayscale(1) brightness(8)" }}
                  />
                </div>

                <div
                  className="mt-8 ms-4  rounded-full border flex items-center justify-center"
                  style={{
                    height: "70px",
                    width: "70px",
                    backgroundColor: "rgb(147, 22, 130)",
                  }}
                >
                  <img
                    importance="low"
                    loading="lazy"
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416848403-0f73dda9b166e07508c3b4557569b43b.png?tr=q-75,w-24"
                    srcSet="https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416848403-0f73dda9b166e07508c3b4557569b43b.png?tr=q-75,w-24 1x, https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416821839-8752dc371576af3bdebdbbb09ffdc7a6.png?tr=dpr-2,q-75,w-24 2x, https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416821839-8752dc371576af3bdebdbbb09ffdc7a6.png?tr=dpr-3,q-75,w-24 3x"
                    decoding="async"
                    width="24"
                    alt="airplane & city icon"
                    style={{ filter: "grayscale(1) brightness(8)" }}
                  />
                </div>

                <div
                  className="mt-8 ms-4  rounded-full border flex items-center justify-center"
                  style={{
                    height: "70px",
                    width: "70px",
                    backgroundColor: "rgb(255, 109, 112)",
                  }}
                >
                  <img
                    importance="low"
                    loading="lazy"
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2019/04/29/1556513556492-24e6ab3befed82339645252ca51d4805.png?tr=q-75,w-24"
                    srcSet="https://ik.imagekit.io/tvlk/image/imageResource/2019/04/29/1556513556492-24e6ab3befed82339645252ca51d4805.png?tr=q-75,w-24 1x, https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416821839-8752dc371576af3bdebdbbb09ffdc7a6.png?tr=dpr-2,q-75,w-24 2x, https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416821839-8752dc371576af3bdebdbbb09ffdc7a6.png?tr=dpr-3,q-75,w-24 3x"
                    decoding="async"
                    width="24"
                    alt=""
                    style={{ filter: "grayscale(1) brightness(8)" }}
                  />
                </div>

                <div
                  className="mt-8 ms-4 rounded-full border flex items-center justify-center"
                  style={{
                    height: "70px",
                    width: "70px",
                    backgroundColor: "rgb(32, 191, 85)",
                  }}
                >
                  <img
                    importance="low"
                    loading="lazy"
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2020/01/08/1578481025234-35a0e71da79753d9ce56989a3523ab72.png?tr=q-75,w-24"
                    srcSet="https://ik.imagekit.io/tvlk/image/imageResource/2020/01/08/1578481025234-35a0e71da79753d9ce56989a3523ab72.png?tr=q-75,w-24 1x, https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416821839-8752dc371576af3bdebdbbb09ffdc7a6.png?tr=dpr-2,q-75,w-24 2x, https://ik.imagekit.io/tvlk/image/imageResource/2020/01/08/1578481025234-35a0e71da79753d9ce56989a3523ab72.png?tr=q-75,w-24 3x"
                    decoding="async"
                    width="24"
                    alt=""
                    style={{ filter: "grayscale(1) brightness(8)" }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="mt-5 ms-5">
                  <p>1 to go</p>
                </div>

                <div className="mt-5 ms-8">
                  <p>1 to go</p>
                </div>

                <div className="mt-5 ms-8">
                  <p>1 to go</p>
                </div>

                <div className="mt-5 ms-8">
                  <p>1 to go</p>
                </div>

                <div className="mt-5 ms-8">
                  <p>1 to go</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileContent2;
