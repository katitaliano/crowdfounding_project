import { useParams, useNavigate } from "react-router-dom";

function DeleteProjectButton() {
  const navigate = useNavigate();
  const projectId = useParams().id; // use .id to get the project ID
  const authToken = window.localStorage.getItem("token");
  const handleClick = () => {
    fetch(`${import.meta.env.VITE_API_URL}projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
    .then(response => {
      if (response.ok) {
        // project successfully deleted
        navigate('/');
      } else {
        // project deletion failed
        console.log("Error:", response.statusText);
      }
    });
  };
  console.log("TOKEN: ", authToken)

  return <button onClick={handleClick}>Delete Project</button>;
}

export default DeleteProjectButton;
