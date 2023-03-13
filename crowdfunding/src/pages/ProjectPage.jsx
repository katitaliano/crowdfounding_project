import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import SimplePledgeForm from "../components/PledgeForm/SimplePledgeForm";
import ProjectCard from "../components/ProjectCard/ProjectCard";

//declaring a variable from a hook - useParams. Libraries create a hook and you can pull stuff out with this syntax.

function ProjectPage(props) {
  // Hooks
  const { id } = useParams();
  // State
  const [projectData, setProjectData] = useState({ pledges: [] });

   // Effects

//  useEffect = how you want your app to be used
//  JS is a 'single threaded coding language' works line by line top to bottom. Async tells project what to fetch and where to get the data from (what URL). Console logging results then adding data, then seeing if any errors, then get

   useEffect(() => {
     const fetchProject = async () => {
       try {
         const res = await fetch(
           `${import.meta.env.VITE_API_URL}projects/${id}`
         );
         console.log(res);
         const data = await res.json();
         setProjectData(data);
       } catch (err) {
         console.log(err);
       }
     };
     fetchProject();
   }, []);
 
   return (
    <div>
      <div>
        <h2>{projectData.title}</h2>
        <img src={projectData.image} className= ".projectimage" ></img>
      </div>
      <div>
        <h3>Project Description</h3>
        <p>{projectData.description}</p>
        <h3>Project Status</h3>
        <p>{`${projectData.is_open}`}</p>
      </div>
      <div>
        <h3>Make a Pledge:</h3>
        <button><Link to={`/pledges/${id}`}>Pledge Here!</Link></button>
        <h3>Total pledged:</h3>
        <p></p>
        <h3>Project target:</h3>
        <p>${projectData.target}.00</p>
      </div>
      <div>
        <h3>Pledges:</h3>
        <ul>
          {projectData.pledges.map((pledgeData, key) => {
            return (
              <li key={key}>
                ${pledgeData.amount} from supporter ID {pledgeData.supporter}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>Project created at:</h3>
        <p>{projectData.date_created}</p>
      </div>
    </div>
   );
 }


 export default ProjectPage;



//  {/* <SimplePledgeForm /> */}

//   // need to get an item by a property (the id in this case) from from the allProject array. 
//   const project = allProjects.filter(project => {
//     return project.id == id 
//   })[0]
//   //second id is referencing our useParams, which is getting the id from the URL
//   //filter is going to return an array, we want the first item
//   //in the data the id has a type of number, but in our id that we're referencing is a string. === requires and exact match. We have use == in this case so that our project id and our params types match. We are not meant to do use == in JavaScript because it's not exact. Need to replace with a slug or something else instead of useParams (something that also uses a string). When fetching from the api it will come back as a string. 

//   console.log(project)

//   return (
//     <div>
//       <h2>{project.title}</h2>
//       <h3>Created at: {project.date_created}</h3>
//       <h3>{`Status: ${project.is_open}`}</h3>
//       {/* <h3>Pledges:</h3>
//       <ul>
//         {project.pledges.map((pledgeData, key) => {
//           return (
//             <li>
//               {pledgeData.amount} from {pledgeData.supporter}
//             </li>
//           );
//         })}
//       </ul> */}
//     </div>
//   );
// }

// useEffect(() => {
   //   fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
   //     .then((results) => {
   //       return results.json();
   //     })
   //     .then((data) => {
   //       setProjectData(data);
   //     });
   // }, []);