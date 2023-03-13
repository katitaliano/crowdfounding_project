import { useNavigate } from "react-router-dom";


function Logout() {
    const navigate = useNavigate();
        window.localStorage.removeItem("token")
        navigate("/home");
}

export default Logout;