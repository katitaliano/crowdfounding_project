// Components
import { useOutletContext, useLocation } from "react-router-dom";
import SimplePledgeForm from "../components/PledgeForm/SimplePledgeForm.jsx"
import LoginForm from "../components/LoginForm/LoginForm.jsx";

function PledgePage() {
  const [loggedIn] = useOutletContext();
  const location = useLocation();
  if (!loggedIn) return <LoginForm redirectURL={location.pathname}/>; 
  // location.pathname gets the current url and passes it to redirectURL 
  return <SimplePledgeForm />;
}

export default PledgePage;
