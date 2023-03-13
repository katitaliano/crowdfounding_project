import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";
import NewProjectPage from "./pages/NewProjectPage";
import PledgePage from "./pages/PledgePage";

// Components
import Nav from "./components/Nav/nav";

// CSS
import "./App.css";


const HeaderLayout = () => (
  <div>
    <Nav />
    <Outlet />
  </div>
);
// createBrowserRouter creates navigation structure. Tells you - go to this particular path and render this element. Nav uses this to link to those pages on the front end. 
const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/pledges/:id", element: <PledgePage />},
      { path: "/newproject/", element: <NewProjectPage />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
