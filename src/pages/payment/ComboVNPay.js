import { useEffect } from "react";
import axios from "../../config/privateAxios";
import { useNavigate, useParams } from "react-router-dom";
function ComboVNPay(params) {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(`/api/combo/vnpay/${id}`)
      .then((result) => {
        window.location.replace(result.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return <div></div>;
}
export default ComboVNPay;
