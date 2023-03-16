import { useState } from "react";
import { useNavigate, useOutletContext} from "react-router-dom";

//outletContext = shared context between different components, e.g. shared state that lives in multiple components that you don't want to pass individually. Skips having to pass it all the way down (prop drilling - google this, avoid prop drilling where possible). There is also useContext in react, this is React Router's version.
// When you have a context you have to SET the context. 
// have created a default value for the following prop redirectURL
function LoginForm({redirectURL = "/"}) {
  const [, setLoggedIn] = useOutletContext();
  // // State
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Hooks 
  const navigate = useNavigate();

  // Actions
  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const postData = async () => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}api-token-auth/`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        }
    );
    return response.json();
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (credentials.username && credentials.password) {
        const { token } = await postData();
            window.localStorage.setItem("token", token);
            setLoggedIn(true)
            return navigate(redirectURL);
    }
     else {
            setLoggedIn(false)
            return navigate("/login");
            // good practice to add a return to the last line of a function
        }
    }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          onChange={handleChange}
          placeholder="Enter username"
        />
      </div>
      <div>
        <label htmlFor="password">Password:  </label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="Password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
