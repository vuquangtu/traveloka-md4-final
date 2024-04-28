import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer
        className="bg-footer"
        style={{
          backgroundColor: "rgb(27 27 27 / 1)",
        }}
      >
        <div className="container px-32">
          <div className="flex py-6 gap-20">
            <div className="w-1/4">
              <div className="w-44">
                <img src="assets/icons/logo-black.svg" alt="" />
              </div>
              <div className="flex gap-4 flex-wrap">
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2017/12/13/1513150321127-5096be77d2a19401b476853e54ba2cc6.svg?tr=h-35,q-75"
                  alt=""
                />
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2021/05/10/1620638808154-e6c02ed786235ab59252628a9aa9b715.png?tr=h-35,q-75"
                  alt=""
                />
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2019/09/23/1569229181629-eeb038ad844874f951326d0a8534bf48.png?tr=q-75,w-100"
                  alt=""
                />
                <img
                  className="w-12"
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2019/09/23/1569229181629-eeb038ad844874f951326d0a8534bf48.png?tr=q-75,w-100"
                  alt=""
                />
              </div>
              <div className="my-6 py-5 items-center px-4 flex gap-4 cursor-pointer rounded-lg border-2 border-slate-50">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  data-id="IcMarketingPartnership"
                >
                  <path
                    d="M4 18L10.0629 20.8531C11.5362 21.5464 13.2827 21.2775 14.4792 20.1731L14.6667 20M4 18L2.22271 17.2891C1.79769 17.1191 1.54238 16.6822 1.60287 16.2284L2.36862 10.4853C2.44131 9.9402 2.94055 9.55607 3.4861 9.6255L6.42857 10M4 18L6 11.125M18.6908 14.5778L19 16L16.7003 18.1228M17 8.5L13.1902 7.35707C12.4281 7.12844 11.6064 7.21192 10.9059 7.58914L5.5 10.5L6.05408 11.1926C6.90599 12.2575 8.36893 12.6138 9.61511 12.06L12 11L15.4212 14.0791C16.3672 14.9305 17.7474 15.0923 18.8647 14.4829L19.75 14M17 8.5L19.75 14M17 8.5L19.4377 7.45529C19.9979 7.21519 20.6408 7.52784 20.7978 8.11677L22.29 13.7124C22.4123 14.171 22.1954 14.6523 21.771 14.8645L21.3944 15.0528C20.9004 15.2998 20.2998 15.0996 20.0528 14.6056L19.75 14M14.6667 20L12.5 18.5M14.6667 20L16.7003 18.1228M16.7003 18.1228L14.5 16.5"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 2.5V3.5M7 4L8 5M17 4L16 5"
                    stroke="#20BF55"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <h4 className="text-slate-300 text-sm">
                  Hợp tác với Traveloka
                </h4>
              </div>
              <div>
                <h3 className="text-slate-50 text-base font-semibold">
                  Partner Pembayaran
                </h3>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339548088-c536c896b175cb38f99a31f5dd2a989a.png?tr=h-19,q-75,w-57"
                      alt=""
                    />
                  </div>
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339578215-99466ea3d377ada2939bf2117df21b11.png?tr=h-19,q-75,w-57"
                      alt="visa"
                    />
                  </div>
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2022/07/08/1657286372391-45dab552eed9b787bfc93547e26c6d87.png?tr=h-19,q-75,w-57"
                      alt=""
                    />
                  </div>
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339553631-9cebb9f6a7a3b0e427b7a2d9da2fd8c0.png?tr=h-19,q-75,w-57"
                      alt=""
                    />
                  </div>
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339557703-5697f31b3e12a942eabc0f613bff8fb9.png?tr=h-19,q-75,w-57"
                      alt=""
                    />
                  </div>
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339567663-c7c5e25757f0d69375aa6de6ad57958f.png?tr=h-19,q-75,w-57"
                      alt=""
                    />
                  </div>
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2021/04/07/1617781232473-330f36367feac4132c5af1b3df54d3f1.png?tr=h-19,q-75,w-57"
                      alt=""
                    />
                  </div>
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339648624-307f4a5f54e873a6c9f272673f193062.png?tr=h-19,q-75,w-57"
                      alt=""
                    />
                  </div>
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339548088-c536c896b175cb38f99a31f5dd2a989a.png?tr=h-19,q-75,w-57"
                      alt=""
                    />
                  </div>
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339578215-99466ea3d377ada2939bf2117df21b11.png?tr=h-19,q-75,w-57"
                      alt="visa"
                    />
                  </div>
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2022/07/08/1657286372391-45dab552eed9b787bfc93547e26c6d87.png?tr=h-19,q-75,w-57"
                      alt=""
                    />
                  </div>
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339553631-9cebb9f6a7a3b0e427b7a2d9da2fd8c0.png?tr=h-19,q-75,w-57"
                      alt=""
                    />
                  </div>
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339557703-5697f31b3e12a942eabc0f613bff8fb9.png?tr=h-19,q-75,w-57"
                      alt=""
                    />
                  </div>
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339567663-c7c5e25757f0d69375aa6de6ad57958f.png?tr=h-19,q-75,w-57"
                      alt=""
                    />
                  </div>
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2021/04/07/1617781232473-330f36367feac4132c5af1b3df54d3f1.png?tr=h-19,q-75,w-57"
                      alt=""
                    />
                  </div>
                  <div className="px-2 py-4 bg-white rounded shadow">
                    <img
                      src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339648624-307f4a5f54e873a6c9f272673f193062.png?tr=h-19,q-75,w-57"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/4 pt-4 grid grid-cols-3 justify-between">
              <div className="">
                <div>
                  <h3 className="text-white text-base font-semibold">
                    Về Traveloka
                  </h3>
                  <ul>
                    <li>
                      <Link
                        className="flex py-1 text-gray-400 text-sm hover:underline"
                        href="#"
                      >
                        Cách đặt chỗ
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex py-1 text-gray-400 text-sm hover:underline"
                        href="#"
                      >
                        Liên hệ chúng tôi
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex py-1 text-gray-400 text-sm hover:underline"
                        href="#"
                      >
                        Trợ giúp
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex py-1 text-gray-400 text-sm hover:underline"
                        href="#"
                      >
                        Tuyển dụng
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex py-1 text-gray-400 text-sm hover:underline"
                        href="#"
                      >
                        Về chúng tôi
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mt-10">
                  <h3 className="text-white text-base font-semibold">
                    Theo dõi chúng tôi trên
                  </h3>
                  <ul>
                    <li>
                      <div className="flex content-center items-center gap-2">
                        <img
                          importance="low"
                          loading="lazy"
                          src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/4/471f17c1510d49a98bec08a48b84c607.svg"
                          decoding="async"
                          className="r-1b7u577"
                          alt="Tiktok icon"
                          style={{
                            filter: "grayscale(1)",
                            objectFit: "fill",
                            objectPosition: "50% 50%",
                          }}
                        />
                        <Link
                          className="flex py-1 text-gray-400 text-sm hover:underline"
                          href="#"
                        >
                          Twitter
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex content-center items-center gap-2">
                        <img
                          importance="low"
                          loading="lazy"
                          src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6904cd2e74ef73120833cff12185a320.svg"
                          decoding="async"
                          alt="Facebook Icon"
                          className="r-1b7u577"
                          style={{
                            filter: "grayscale(1)",
                            objectFit: "fill",
                            objectPosition: "50% 50%",
                          }}
                        />
                        <Link
                          className="flex py-1 text-gray-400 text-sm hover:underline"
                          href="#"
                        >
                          Facebook
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex content-center items-center gap-2">
                        <img
                          importance="low"
                          loading="lazy"
                          src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/62a2fc240d7e00b05d0d6f6b4e785110.svg"
                          decoding="async"
                          className="r-1b7u577"
                          alt="Instagram icon"
                          style={{
                            filter: "grayscale(1)",
                            objectFit: "fill",
                            objectPosition: "50% 50%",
                          }}
                        />
                        <Link
                          className="flex py-1 text-gray-400 text-sm hover:underline"
                          href="#"
                        >
                          Instagram
                        </Link>
                      </div>
                    </li>

                    <li>
                      <div className="flex content-center items-center gap-2">
                        <img
                          importance="low"
                          loading="lazy"
                          src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/b/b593add66303beb2a0cae9e96963e68b.svg"
                          decoding="async"
                          className="r-1b7u577"
                          alt="Youtube icon"
                          style={{
                            filter: "grayscale(1)",
                            objectFit: "fill",
                            objectPosition: "50% 50%",
                          }}
                        />
                        <Link
                          className="flex py-1 text-gray-400 text-sm hover:underline"
                          href="#"
                        >
                          Youtube
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-white text-base font-semibold">Sản phẩm</h3>
                <ul>
                  <li>
                    <Link
                      className="flex py-1 text-gray-400 text-sm hover:underline"
                      to={""}
                    >
                      Vé máy bay
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex py-1 text-gray-400 text-sm hover:underline"
                      to={""}
                    >
                      Khách sạn
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex py-1 text-gray-400 text-sm hover:underline"
                      to={""}
                    >
                      Combo tiết kiệm
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <div>
                  <h3 className="text-white text-base font-semibold">Khác</h3>
                  <ul className="">
                    <li>
                      <Link
                        className="flex py-1 text-gray-400 text-sm hover:underline"
                        to={""}
                      >
                        Traveloka Affiliate
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex py-1 text-gray-400 text-sm hover:underline"
                        to={""}
                      >
                        Traveloka Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex py-1 text-gray-400 text-sm hover:underline"
                        to={""}
                      >
                        Chính Sách Quyền Riêng
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex py-1 text-gray-400 text-sm hover:underline"
                        to={""}
                      >
                        Điều khoản & Điều kiện
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex py-1 text-gray-400 text-sm hover:underline"
                        to={""}
                      >
                        Quy chế hoạt động
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex py-1 text-gray-400 text-sm hover:underline"
                        to={""}
                      >
                        Đăng ký nơi nghỉ của bạn
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex py-1 text-gray-400 text-sm hover:underline"
                        to={""}
                      >
                        Đăng ký doanh nghiệp hoạt động du lịch của bạn{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex py-1 text-gray-400 text-sm hover:underline"
                        to={""}
                      >
                        Khu vực báo chí
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mt-5">
                  <h3 className="text-white text-base font-semibold">
                    Download Traveloka App
                  </h3>
                  <ul>
                    <li className="my-4">
                      <Link to={""}>
                        <img
                          src="http://localhost:63342/homepage-traveloka-clone/public/assets/icons/footer/googleplay.svg"
                          alt=""
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to={""}>
                        <img
                          src="http://localhost:63342/homepage-traveloka-clone/public/assets/icons/footer/appstore.svg"
                          alt=""
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
