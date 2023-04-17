import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useState } from "react";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";
import NewProjectPage from "./pages/NewProjectPage";
import PledgePage from "./pages/PledgePage";
import ProjectEditPage from "./pages/ProjectEditPage";


// Components
import Nav from "./components/Nav/Nav";

// CSS
import "./App.css";


const HeaderLayout = () => {
  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("token") !== null);
    return (
      <div>
      <h1>Crowdfunding Project</h1>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      {/* need to tell the nav that it has these props/give that state to the nav */}
      <Outlet context={[loggedIn, setLoggedIn]} />
      {/* value of context is loggedIn & setLoggedIn, anything using this outlet has access to the value of logged in and the set logged in function. We access this via useOutletContext. Now any children elements are able to use the outletContext */}
      </div>)
}
 

{/* Outlet = this is where I want to render the page, i.e. under the nav */}
// createBrowserRouter creates navigation structure. Tells you - go to this particular path and render this element. Nav uses this to link to those pages on the front end. 
const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/project/:id/edit", element: <ProjectEditPage /> },
      { path: "/pledges/:id", element: <PledgePage />},
      { path: "/newproject/", element: <NewProjectPage />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
