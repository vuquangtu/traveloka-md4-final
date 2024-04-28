import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, saveUser } from "../../redux/features/userSlice";


function OauthGoogle(params) {
    const userSelect = useSelector(selectUser);
    const dispatch = useDispatch();
    const {token} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        const user = {token:token}
        dispatch(saveUser(user));
        navigate("/user")
    },[])
    return(
        <>
        <div></div>
        </>
    )
}
export default OauthGoogle;