function PaymentNote(params) {
    return (
        <div className="paymentNote">
            <p className="paymentNote-note">Hãy sử dụng thông tin tài khoản được cung cấp dưới đây để thanh toán hóa đơn Traveloka: </p>
            <div>
                <span className="paymentNote-sub">Số thẻ: </span>
                <span className="paymentNote-info">9704198526191432198</span>
            </div>
            <div>
                <span className="paymentNote-sub">Tên chủ thẻ: </span>
                <span className="paymentNote-info">NGUYEN VAN A</span>
            </div>
            <div>
                <span className="paymentNote-sub">Ngày phát hành: </span>
                <span className="paymentNote-info">07/15</span>
            </div>
            <div>
                <span className="paymentNote-sub">Mật khẩu OTP: </span>
                <span className="paymentNote-info">123456</span>
            </div>

        </div>
    )
}
export default PaymentNote;