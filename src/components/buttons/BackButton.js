import { useNavigate } from "react-router";

function BackButton(params) {
    const navigateToHome = params.home;
    const navigate = useNavigate()
    function handleBack() {
        if(navigateToHome){
            navigate("/home")
        }else{
            navigate(-1);
        }
    }

    return (
        <div onClick={handleBack} className="backButton">
            <img src="https://cdn-icons-png.freepik.com/256/5610/5610972.png" alt="backIcon" />
        </div>
    )
}
export default BackButton