import React from "react";
import { Link } from "react-router-dom";
function Banner() {
  return (
    <div>
      <main>
        <div className="homepage-banner" id="bn">
          <div className="homepage-banner-container">
            <div className="homepage-banner-container-row1">
              <div className="homepage-banner-container-row1-col-empty"></div>
              <div className="homepage-banner-container-row1-col-content">
                <div className="homepage-banner-container-row1-col-content-detail">
                  <div className="text">
                    <h1 style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>VIỆT NAM </h1>
                    <p className="leading-8">
                      Khám phá Hà Nội, Sài Gòn, Đà Nẵng, Hội An, Huế, Nha Trang,
                      Đà Lạt, Phú Quốc, Sapa, Hạ Long, Cần Thơ, Mỹ Tho, và nhiều
                      địa điểm khác. Khởi hành hàng tuần, luôn có tour vào lễ,
                      tết, cao điểm.
                    </p>
                  </div>
                  <div className="btn">
                    <Link to={""}>Xem thêm</Link>
                  </div>
                  <div className="lan">
                    <Link to={""}>EN</Link>
                    <Link to={""}>VI</Link>
                  </div>
                </div>
              </div>

              <div className="homepage-banner-container-row1-col-content-2">
                <div className="homepage-banner-container-row1-col-content-2-image">
                  <div className="homepage-banner-container-row1-col-content-2-image-detail">
                    <div className="box">
                      <div className="text2">
                        <h4>Vịnh Hạ Long</h4>
                        <img
                          src="https://i0.wp.com/www.pngall.com/wp-content/uploads/4/5-Star-PNG.png"
                          alt="sao"
                          width="100px"
                        />
                      </div>
                      <Link to={""}>
                        <img
                          src="https://toigingiuvedep.vn/wp-content/uploads/2021/06/anh-ha-long-cuc-dep-cho-dien-thoai.jpeg"
                          alt="homepage-banner"
                          width="auto"
                          style={{ height: "300px" }}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="homepage-banner-container-row1-col-content-2-image-detail">
                    <div className="box">
                      <div className="text2">
                        <h4>Phố cổ Hội An</h4>
                        <img
                          src="https://i0.wp.com/www.pngall.com/wp-content/uploads/4/5-Star-PNG.png"
                          alt="sao"
                          width="100px"
                        />
                      </div>
                      <Link to={""}>
                        <img
                          src="https://www.planetware.com/photos-large/VIE/vietnam-hoi-an-riverfront.jpg"
                          alt="homepage-banner"
                          width="auto"
                          style={{ height: "300px" }}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="homepage-banner-container-row1-col-content-2-image-detail">
                    <div className="box">
                      <div className="text2">
                        <h4>Hang én</h4>
                        <img
                          src="https://i0.wp.com/www.pngall.com/wp-content/uploads/4/5-Star-PNG.png"
                          alt="sao"
                          width="100px"
                        />
                      </div>
                      <Link to={""}>
                        <img
                          src="https://lp-cms-production.imgix.net/2021-03/Hang_En_Cave_Vietnam.jpg?auto=format&q=75&w=1024"
                          alt="homepage-banner"
                          width="auto"
                          style={{ height: "300px" }}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Banner;
