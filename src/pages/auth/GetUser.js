import { useEffect } from "react"
import axios from "../../config/privateAxios"
import { useNavigate } from "react-router-dom"
import { selectUser, saveUser } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function GetUser(params) {
    const userSelect = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get("/login/user")
            .then(result => {
                console.log(result.data);
                let user = { ...result.data, token: userSelect.user.token }
                console.log(user);
                dispatch(saveUser(user));
                navigate("/home");
            })
            .catch(error => console.log(error))
    }, [])
    return (
        <>
            <div></div>
        </>
    )
}
export default GetUser