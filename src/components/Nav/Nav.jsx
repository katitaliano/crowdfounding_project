import { Link } from "react-router-dom";
// import LoginForm from "../LoginForm/LoginForm";

// destructured props inside braces. We've told the nav what these props are in app.jsx

function Nav({loggedIn, setLoggedIn}) {

    const handleLogout = () => {
        window.localStorage.removeItem("token")
        return setLoggedIn(false)
    };

    if (loggedIn) {
        return (
            <nav>
                <Link to="/">Projects Home</Link>
                <Link to="/newproject">New Project</Link>
                <Link onClick={handleLogout} to="/login" >Log Out</Link>
            </nav>
            );
    }
    else {  
        return (
        <nav>
        <Link to="/">Projects Home</Link>
        <Link to="/login">Log In</Link> 
        </nav>
        ); 
    }
}
export default Nav;


//{/* <Link onClick={window.localStorage.removeItem("token")} to="/login">Log Out</Link> */}
//<Link to="/newuser">Register</Link>