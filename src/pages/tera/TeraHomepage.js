import React, { useEffect, useState } from "react";
import TeraHeader from "../../components/tera/TeraHeader";
import { useNavigate, Link } from "react-router-dom";
import RegisterTera from "./RegisterTera";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";

function TeraHomepage() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectUser);
  const isPartner =
    user && user.user
      ? user.user.authorities.some((auth) => auth.authority === "ROLE_PARTNER")
      : false;

  const navigate = useNavigate();
  const hotels = [
    {
      url: "https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415629396-fb66de9e5742a12f05b351d3cd6ffddf.png?tr=q-75",
      title: "Khách sạn",
      description:
        "Nơi lưu trú mang tính chất thương mại, có cung cấp phòng riêng, bao gồm các bữa ăn và một số dịch vụ cho khách.",
    },
    {
      url: "https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415625415-27502b7f6c0ee6c304c8a03d085dd5d9.png?tr=q-75",
      title: "Khách sạn bình dân",
      description:
        "Nơi lưu trú với ngân sách tiết kiệm, cung cấp chỗ ở căn bản, thường là các giường kiểu ký túc xá.",
    },
    {
      url: "https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415649485-4caf4e7967fcac5f21cd6c7e23072479.png?tr=q-75 ",
      title: "Biệt thự",
      description:
        "Một ngôi nhà lớn, thường nằm ở ngoại ô hoặc các địa điểm danh lam thắng cảnh. Đây có thể là một ngôi nhà độc lập hoặc thuộc một khu phức hợp gồm nhiều ngôi nhà.",
    },
    {
      url: "https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415639363-f619eb0ee7413f7ee1c62a7504b18b61.png?tr=q-75",
      title: "Khu nghĩ dưỡng",
      description:
        "Khu phức hợp gồm nhiều khu lưu trú có cung cấp phòng riêng và nhiều phương tiện, hoạt động giải trí.",
    },
  ];
  const handleClick = () => {
    setIsOpen(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <TeraHeader />
      <div>
        <div className="w-full" style={{ color: "rgb(76,76,76)" }}>
        </div>
        <div
          className="bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583410740412-16a042abff83626e0d5823b30c24403f.png?tr=q-75")',
            width: "100%",
            height: "600px",
          }}
        >
          <div className="w-4/5 mx-auto my-auto text-white gap-3 text-wrap text-center h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold">
              Cơ hội mở rộng và phát triển doanh nghiệp của bạn
            </h1>
            <p className="text-xl">
              Đăng bán nơi nghỉ của bạn và tiếp cận đến hàng triệu khách hàng
              tiềm năng. Dễ dàng quản lý nơi nghỉ với Traveloka. Không rắc rối,
              không bực mình.
            </p>
          </div>
        </div>

        <div
          className="bg-cover bg-center"
          style={{
            background:
              "linear-gradient(219deg, rgb(25, 65, 111), rgb(28, 74, 127) 53%, rgb(35, 93, 159))",
            width: "100%",
            height: "max-content",
          }}
        >
          <div className="w-4/5 mx-auto py-12 text-white text-wrap px-2">
            <div className="w-1/2 my-2">
              <h1 className="text-3xl font-semibold mb-4">
                Chúng tôi giúp bạn vận hành doanh nghiệp dễ dàng hơn
              </h1>
              <p className="leading-6">
                Bán nhiều phòng hơn với hệ thống kinh doanh tích hợp của chúng
                tôi, và tận hưởng nhiều quyền lợi của đối tác.
              </p>
            </div>
            <div className="w-full  flex items-center justify-between py-4 gap-4">
              <div className="w-1/2 flex items-center justify-between gap-4">
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415224753-ba7a95aaa6aa6fcd4a41c9448f725a6c.svg?tr=q-75"
                  alt="icon"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
                <div className="flex-grow text-left">
                  <h3 className="font-semibold text-left mb-3">Quản lý kênh</h3>
                  <p className="text-wrap text-sm leading-1">
                    Chúng tôi kết nối bạn với nhiều quản lý kênh để tránh đặt
                    chỗ trùng. Dễ dàng quản lý phòng trống và giá phòng ở các
                    OTA khác nhau mà bạn tham gia.
                  </p>
                </div>
              </div>
              <div className="w-1/2 flex items-center justify-between gap-4">
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415228240-62425d0794265981e8d08dd347399a1b.svg?tr=q-75"
                  alt="icon"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
                <div className="flex-grow text-left ">
                  <h3 className="font-semibold text-left mb-3">
                    Hỗ trợ từ Quản lý Thị trường
                  </h3>
                  <p className="text-wrap text-sm leading-1">
                    Đội ngũ Quản lý Thị trường của chúng tôi luôn sẵn sàng hướng
                    dẫn và giúp mở rộng doanh nghiệp của bạn.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full  flex items-center justify-between py-4 gap-4">
              <div className="w-1/2 flex items-center justify-between gap-4">
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415232461-887e52839db4a6c1570634d1c957820b.svg?tr=q-75"
                  alt="icon"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
                <div className="flex-grow text-left">
                  <h3 className="font-semibold text-left mb-3">
                    Thanh toán tiện lợi
                  </h3>
                  <p className="text-wrap text-sm leading-1">
                    Hình thức thanh toán linh hoạt phù hợp với nhu cầu của bạn.
                    Bạn muốn dùng VCC, chuyển khoản ngân hàng, hàng tháng hay
                    hàng tuần; chúng tôi đều có lựa chọn hợp lý dành cho bạn.
                  </p>
                </div>
              </div>
              <div className="w-1/2 flex items-center justify-between gap-4">
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415235978-170310e7b81c9a4dc09587338b4f6f3e.svg?tr=q-75"
                  alt="icon"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
                <div className="flex-grow text-left ">
                  <h3 className="font-semibold text-left mb-3">
                    Hỗ trợ từ đội Hỗ trợ Khách sạn
                  </h3>
                  <p className="text-wrap text-sm leading-1">
                    Với sự giúp đỡ 24/7 của đội ngũ Hỗ trợ Khách sạn, chúng tôi
                    luôn sẵn sàng khi bạn cần.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full  flex items-center justify-between py-4 gap-4">
              <div className="w-1/2 flex items-center justify-between gap-4">
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415239625-255deb42308af0bc7cdfaba1905e1618.svg?tr=q-75"
                  alt="icon"
                  style={{ maxWidth: "100px", height: "max-content" }}
                />
                <div className="flex-grow text-left">
                  <h3 className="font-semibold text-left mb-3">
                    Dễ dàng sử dụng
                  </h3>
                  <p className="text-wrap text-sm leading-1">
                    Chúng tôi thiết kế TERA như là một nền tảng “một cửa”, tích
                    hợp mọi tính năng bạn cần để quản lý nơi nghỉ của mình.
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-auto text-2xl font-semibold mt-6 text-center">
              <p>Chúng tôi chào đón tất cả các loại hình lưu trú</p>
            </div>
            <div className="grid grid-cols-4 gap-6 mt-8">
              {hotels.map((hotel, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <img
                    src={hotel.url}
                    alt="icon"
                    style={{ height: "100px", width: "auto" }}
                    className="mx-auto rounded-lg"
                  />
                  <h3 className="font-semibold">{hotel.title}</h3>
                  <p className="text-sm">{hotel.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="w-full bg-white flex justify-center items-center"
          style={{ height: "330px" }}
        >
          <div className="w-3/5 flex justify-center items-center gap-6 mx-auto">
            <div>
              <p
                className="text-wrap text-lg leading-1"
                style={{ color: "rgb(32, 84, 143)" }}
              >
                Sau khi gia nhập Traveloka, doanh thu của chúng tôi tăng theo
                từng năm và được tiếp cận với thị trường mới.
              </p>
              <p
                className="text-right italic mt-2 text-sm mr-2"
                style={{ color: "rgb(168, 176, 186)" }}
              >
                - Panyata Suriyawongwan Giám đốc Kinh doanh, Khách sạn & Khu
                nghỉ dưỡng Holiday Garden, Thái Lan
              </p>
            </div>
            <div>
              <img
                src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415909787-880b053cd2c59196206bd2e53b9f3880.jpeg?tr=q-75"
                alt=""
                style={{ maxWidth: "200px", height: "auto" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
        <div
          className="w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgb(244, 251, 255), rgb(236, 248, 255))",
          }}
        >
          <div
            className="w-4/5 h-max mx-auto py-12 flex items-center justify-between gap-12"
            style={{ color: "rgb(76, 76, 76)" }}
          >
            <div className="w-1/2 px-4 h-full">
              <h1 className="text-wrap text-3xl font-semibold mb-4">
                Hệ thống Đặt chỗ Extranet của Traveloka (TERA)
              </h1>
              <p>
                TERA là hệ thống giúp bạn quản lý phòng trống và giá phòng trên
                Traveloka.
              </p>
            </div>
            <div className="w-1/2">
              <div className="w-full flex items-center gap-4 mb-10">
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583410625419-6d638db708f7c06a542c895582417598.svg?tr=q-75"
                  alt="icon"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
                <div className="flex-grow">
                  <h3 className="font-semibold mb-3">
                    Làm việc mọi lúc mọi nơi
                  </h3>
                  <p className="leading-4 text-wrap ">
                    Bạn có thể truy cập vào TERA trên máy tính và ứng dụng di
                    động. Quản lý nơi nghỉ nay thật đơn giản dù bạn đang không ở
                    văn phòng.
                  </p>
                </div>
              </div>
              <div className="w-full flex items-center gap-4 mb-6">
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583410678956-f89ba7e46afa656fb473643878b1c94c.svg?tr=q-75"
                  alt="icon"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
                <div className="flex-grow">
                  <h3 className="font-semibold mb-3">
                    Quản lý đặt chỗ dễ dàng
                  </h3>
                  <p className="leading-4 text-wrap ">
                    Nhận thông báo thời gian thực với mọi đặt chỗ (kể cả yêu cầu
                    đặc biệt của khách). Quản lý đặt chỗ chưa bao giờ dễ dàng
                    hơn thế.
                  </p>
                </div>
              </div>
              <div className="w-full flex items-center gap-4 mb-6">
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583410683404-894ffed1c8d1dd9c6ea5a2c954369060.svg?tr=q-75"
                  alt="icon"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
                <div className="flex-grow">
                  <h3 className="font-semibold mb-3">
                    Kiểm soát phòng trống và giá phòng
                  </h3>
                  <p className="leading-4 text-wrap ">
                    Chỉ cần vài cú nhấp chuột, bạn đã có thể toàn quyền kiểm
                    soát cách thức bán phòng trên Traveloka.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white" style={{ color: "rgb(76, 76, 76)" }}>
          <div className="w-4/5 mx-auto py-12">
            <div className="w-full flex items-center justify-between gap-4 mb-16">
              <img
                src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583410852122-f7484143e6e6af146f127dafbcdd542a.svg?tr=q-75"
                alt="icon"
                style={{ width: "560px", height: "auto" }}
                className="w-1/2"
              />
              <div className="w-1/2">
                <h2 className="text-2xl font-semibold mb-3">
                  Tiếp cận với nhiều khách hàng hơn
                </h2>
                <p className="text-wrap leading-5">
                  Traveloka có nhiều dịch vụ đáp ứng mọi nhu cầu du lịch; mang
                  đến cơ hội tiếp cận nhiều khách hàng tiềm năng cho bạn. Bạn có
                  thể giới thiệu nơi nghỉ của mình với khách hàng đặt vé máy
                  bay, tàu, và thậm chí là hoạt động Xperience!
                </p>
              </div>
            </div>
            <div className="w-full relative mb-16">
              <h3
                className="absolute top-2 text-2xl font-semibold"
                style={{ left: "395px" }}
              >
                Tiếp cận đa quốc gia
              </h3>
              <p
                className="text-wrap text-center leading-5 w-6/12 absolute z-10"
                style={{ top: "430px", left: "250px" }}
              >
                Traveloka đã có mặt nhiều nơi trên thế giới và luôn tiếp tục mở
                rộng. Bạn sẽ có nhiều cơ hội thu hút được sự chú ý của nhiều
                khách hàng tiềm năng.
              </p>
              <img
                src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583410734803-4e7903996784ff79c6de54503bf327ea.svg?tr=q-75"
                alt="icon"
                style={{ width: "100%", height: "auto" }}
                className="z-0"
              />
            </div>
            <div className="w-full flex gap-8">
              <div className="w-1/3">
                <h3 className="text-2xl font-semibold mb-10">
                  Nhiều kênh quảng cáo tích hợp
                </h3>
                <p className="text-wrap leading-5">
                  Cơ hội đẩy mạnh doanh thu với các kênh quảng cáo tích hợp của
                  chúng tôi, giúp hàng triệu khách hàng tiềm năng có thể thấy
                  nơi nghỉ của bạn
                </p>
              </div>
              <div className="w-2/3 grid grid-cols-5 gap-6 justify-between gap-y-8 px-2">
                <div>
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583410760254-4c80c231cd3d5a68fdbebf248ba61c8b.svg?tr=q-75"
                    alt="icon"
                    style={{ height: "70px", width: "auto" }}
                    className="mx-auto"
                  />
                  <p className="text-sm tex-wrap mt-4 text-center">
                    Bản tin email định kỳ
                  </p>
                </div>
                <div>
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583410763925-6c35b2130386060d5fffc7bf538a6daa.svg?tr=q-75https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583410760254-4c80c231cd3d5a68fdbebf248ba61c8b.svg?tr=q-75"
                    alt="icon"
                    style={{ height: "70px", width: "auto" }}
                    className="mx-auto"
                  />
                  <p className="text-sm tex-wrap mt-4 text-center">
                    Banner trang chủ
                  </p>
                </div>
                <div>
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415100366-33e105e41c89b059f6e7b2eed2e093ef.svg?tr=q-75"
                    alt="icon"
                    style={{ height: "70px", width: "auto" }}
                    className="mx-auto"
                  />
                  <p className="text-sm tex-wrap mt-4 text-center">
                    Thông báo đẩy
                  </p>
                </div>
                <div>
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415107997-6cfc7d69f8eeb6ab83e0a5b355f5c7c4.svg?tr=q-75"
                    alt="icon"
                    style={{ height: "70px", width: "auto" }}
                    className="mx-auto"
                  />
                  <p className="text-sm tex-wrap mt-4 text-center">Instagram</p>
                </div>
                <div>
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415116167-6b9155a26df133e4a1a0e9dca34f25c1.svg?tr=q-75"
                    alt="icon"
                    style={{ height: "70px", width: "auto" }}
                    className="mx-auto"
                  />
                  <p className="text-sm tex-wrap mt-4 text-center">
                    Quảng cáo hiển thị
                  </p>
                </div>
                <div>
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415122116-cd1f05b666d3a62274db902d1a5d0b42.svg?tr=q-75"
                    alt="icon"
                    style={{ height: "70px", width: "auto" }}
                    className="mx-auto"
                  />
                  <p className="text-sm tex-wrap mt-4 text-center">SEM</p>
                </div>
                <div>
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415126785-a0ee6fd1748b6db044c68495641c691b.svg?tr=q-75"
                    alt="icon"
                    style={{ height: "70px", width: "auto" }}
                    className="mx-auto"
                  />
                  <p className="text-sm tex-wrap mt-4 text-center">Twitter</p>
                </div>
                <div className="px-4">
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415132373-0dfc49d1aa9119ad83d6880c35049add.svg?tr=q-75"
                    alt="icon"
                    style={{ height: "70px", width: "auto" }}
                    className="mx-auto"
                  />
                  <p className="text-sm tex-wrap mt-4 text-center">Facebook</p>
                </div>
                <div className="px-4">
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415141267-ff54dd3cfd565aeba26073a30c64ee57.svg?tr=q-75"
                    alt="icon"
                    style={{ height: "70px", width: "auto" }}
                    className="mx-auto"
                  />
                  <p className="text-sm tex-wrap mt-4 text-center">SEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-full"
          style={{
            background:
              "linear-gradient(109deg, rgb(21, 56, 95), rgb(28, 74, 127) 55%, rgb(35, 93, 159))",
            color: "rgb(255, 255, 255)",
          }}
        >
          <div className="w-4/5 px-4 mx-auto py-16">
            <div>
              <h3 className="text-center text-3xl font-semibold">
                Đăng bán nơi nghỉ của bạn ngay chỉ với vài bước đơn giản
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-10">
              <div>
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415213367-0c575271086dc118b6a318d545949f5f.svg?tr=q-75"
                  alt="icon"
                  style={{ height: "150px", width: "auto" }}
                  className="mx-auto"
                />
                <p className="text-center text-wrap mt-4">Tạo tài khoản TERA</p>
              </div>
              <div>
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415216478-f705fb20348ea623ea1e53226c404bd2.svg?tr=q-75"
                  alt="icon"
                  style={{ height: "150px", width: "auto" }}
                  className="mx-auto"
                />
                <p className="text-center text-wrap mt-4 leading-5">
                  Đăng ký nơi nghỉ của bạn và điền thông tin chi tiết.
                </p>
              </div>
              <div>
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415220400-92ec4ff9a361ebd8dd511ede604c23d8.svg?tr=q-75"
                  alt="icon"
                  style={{ height: "150px", width: "auto" }}
                  className="mx-auto"
                />
                <p className="text-center text-wrap mt-4 leading-5">
                  Quản lý Thị trường sẽ liênn hệ với bạn để kiểm tra thông tin
                  chi tiết và giúp mở bán phòng của bạn trên Traveloka.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-full bg-white flex justify-center items-center"
          style={{ height: "330px" }}
        >
          <div className="w-3/5 flex justify-center items-center gap-6 mx-auto">
            <div>
              <img
                src="https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415894605-ad638b44ac878de1d214c97051db7be3.jpeg?tr=q-75"
                alt=""
                style={{ maxWidth: "150px", height: "auto" }}
                className="rounded-lg"
              />
            </div>
            <div>
              <p
                className="text-wrap text-lg leading-1"
                style={{ color: "rgb(32, 84, 143)" }}
              >
                Sau khi làm đối tác với Traveloka, chúng tôi thấy doanh thu tăng
                đột biến. Các Quản lý thị trường luôn thân thiện và chủ động
                mang đến các khuyến mãi để tăng thêm doanh thu cho chúng tôi.
              </p>
              <p
                className="text-right italic mt-2 text-sm mr-2"
                style={{ color: "rgb(168, 176, 186)" }}
              >
                - Andhina Anggun Quản lý Khách sạn, Grand Edge Hotel Semarang,
                Indonesia
              </p>
            </div>
          </div>
        </div>
        <div
          className="w-full text-white bg-cover"
          style={{
            backgroundImage:
              "url('https://www.brightinternships.com/sites/default/files/Handshake.jpg')",
            height: "400px",
            opacity: "1",
          }}
        >
          <div
            className="w-1/2 mx-auto flex flex-col justify-center items-center"
            style={{ height: "400px" }}
          >
            <h1 className="text-3xl font-semibold">
              {isPartner
                ? "Chào mừng bạn trở lại, Đối tác Traveloka!"
                : "Cùng mở rộng kinh doanh với Traveloka?"}
            </h1>
            <div
              className=" text-white rounded-md w-4/12 mx-auto mb-5 mt-6"
              style={{ backgroundColor: "rgb(255, 94, 31)" }}
            >
              <div
                type="submit"
                className="text-center w-full text-lg font-semibold py-2 hover:cursor-pointer hover:bg-orange-600 hover:rounded-lg transition duration-300 ease-in-out"
                onClick={isPartner ? undefined : handleClick}
              >
                {isPartner ? "Quản lý dịch vụ của bạn" : "Đăng ký"}
              </div>
            </div>

            {isOpen && !isPartner && (
              <RegisterTera closeModal={() => setIsOpen(false)} />
            )}
          </div>
        </div>
        <div className="w-full" style={{ background: "rgb(3, 18, 26)" }}>
          <div className="w-4/5 mx-auto px-4 py-6 flex justify-between items-center text-white">
            <p>
              <span>Visit </span>
              <span
                className="hover:cursor-pointer underline"
                onClick={() => navigate("/home")}
              >
                Traveloka.com
              </span>
            </p>
            <p>Copyright © 2019 Traveloka</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeraHomepage;
