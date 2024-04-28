import { useParams } from "react-router-dom";
import BackButton from "../buttons/BackButton";
import PaymentNote from "../utils/PaymentNote";
import axios from "../../config/privateAxios";
import PreviewComboFlightTicket from "../layout/combo/PreviewComboFlightTicket";
import { useEffect, useState } from "react";
function FlightTicketPreview(params) {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        axios.get(`/api/ticket/${id}`)
            .then(result => {
                setTicket(result.data)
                console.log(result.data)
            })
            .catch(error => console.log(error))
    },[])

    function handleSubmit(){
        axios.get("/api/v1/payment/flight",{
            params:{
                price: ticket.totalMoney,
                ticketId: ticket.id
            }
        })
        .then(result=>window.location.replace(result.data.data))
        .catch(error=>console.log(error))
    }

    return (
        <>
            <div className="roomContractPreview" style={{minHeight:"100vh"}}>
                <BackButton />
                <PaymentNote />
                {ticket!=null?<PreviewComboFlightTicket seat={ticket} />:null}
                <div onClick={handleSubmit} style={{ backgroundColor:"rgb(255, 94, 31)"}}  className="comboPreview-summary-confirm">
                    Tiếp tục thanh toán
                </div>
            </div>
        </>
    )
}


export default FlightTicketPreview;