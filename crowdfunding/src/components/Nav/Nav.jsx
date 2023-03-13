import { Link } from "react-router-dom";

function Nav() {
    const authToken = window.localStorage.getItem("token");
    if (authToken) {
        return (
            <nav>
            <Link to="/home">Home</Link>
            <Link to="/newproject">New Project</Link>
            {/* Log out */}
            </nav>
        );
        }
    else
        return (
            <nav>
            <Link to="/home">Home</Link>
            <Link to="/login">Log In</Link> 
            {/* Register    */}
            </nav>
        );
}

export default Nav;
