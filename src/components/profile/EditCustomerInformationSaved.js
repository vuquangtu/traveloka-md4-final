import React from "react";
import "../../style/scss/main.scss";
import EditTable from "./EditTable";

function EditCustomerInformationSaved() {
  return (
    <div className="edit-customer-information mx-auto my-auto w-7/12 pt-5">
      <div className="flex gap 4">
        <EditTable />
        <div className="passenger-list">
          <h2>Danh sách hành khách</h2>
          <p>Bạn có thể lưu tối đa thông tin 20 hành khách</p>
          <div className="passenger">
            <div className="picture">
              <img
                src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/d/d84dda4ae99f70460825cb810aa2968a.svg"
                alt="customer-icon"
              />
            </div>
            <span>1. Việt Vũ</span>
            <button className="edit">Chỉnh sửa</button>
            <button className="remove">Gỡ bỏ</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCustomerInformationSaved;
