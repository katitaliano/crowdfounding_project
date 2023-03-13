import { Link } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";

function Nav(props) {
    const authToken = window.localStorage.getItem("token");


    if (authToken) {
        return (
            <nav>
                <Link to="/">Home</Link>
                <Link to="/newproject">New Project</Link>
            </nav>
            );
    }
    else {  
        return (
        <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Log In</Link> 
        </nav>
        ); 
    }
}
export default Nav;


//{/* <Link onClick={window.localStorage.removeItem("token")} to="/login">Log Out</Link> */}
//<Link to="/newuser">Register</Link>