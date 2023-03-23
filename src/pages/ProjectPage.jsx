import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ProjectPage() {
  // Hooks
  const { id } = useParams();
  // State
  const [projectData, setProjectData] = useState({ pledges: [] })

   // Effects
   useEffect(() => {
     const fetchProject = async () => {
       try {
         const res = await fetch(
           `${import.meta.env.VITE_API_URL}projects/${id}`
         );
         const data = await res.json();
         setProjectData(data);
         console.log('project data:', projectData)
        
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
          <img src={projectData.image} className="projectimage" />
      </div>
      <div>
        <h3>Project Description:</h3>
        <p>{projectData.description}</p>
        <h3>Project Status:</h3>
        <p>{projectData.is_open ? "Open" : "Closed"}
        </p>
        <h3>Project target: </h3>
        <p> ${projectData.target}.00</p>
        <h3><Link to={`/pledges/${id}`}>Click here to make a pledge!</Link></h3>
        <h3>Supporters:</h3>
        <ul>
         {projectData.pledges.map((pledgeData, key) => {
           return (
             <li key={key}>
               ${pledgeData.amount} from Supporter ID {pledgeData.supporter}
             </li>
           );
         })}
       </ul>
        <i>Project created {new Date(projectData.date_created).toDateString()}</i>
      </div>
      
      {/* <div>
        <h3>Supporters:</h3>
        <ul>
          {projectData.pledges.map((pledgeData, key) => {
            const name = getUserName(pledgeData.supporter)
            return (
              <li key={key}>
                {/* ${pledgeData.amount} from {pledgeData.anonymous ? 'anonymous' : getUserName(pledgeData.supporter)} */}
                {/* {
                  pledgeData.anonymous ?
                    `$${pledgeData.amount} from anonymous`
                  :
                    `$${pledgeData.amount} from ${name}`
                } */}
                {/* username not rerendering from the fetch */}
              {/* </li>
            );
          })}
        </ul>
        </div>
        <div>
        <h3>Total pledged:</h3>
        </div> */} 
    </div>
   );
 }

 export default ProjectPage;


// NOTES
//declaring a variable from a hook - useParams. Libraries create a hook and you can pull stuff out with this syntax.
//* ? "" : "" = ternary operator, short for if else */
// summing up total pledges look at array.reduce function
// display username or anonymous - fetch request supporter via ID and get username from that
// date - to date string look up in JS docs

//  JS is a 'single threaded coding language' works line by line top to bottom. Async tells project what to fetch and where to get the data from (what URL). Console logging results then adding data, then seeing if any errors, then get
//   // need to get an item by a property (the id in this case) from from the allProject array. 
//   const project = allProjects.filter(project => {
//     return project.id == id 
//   })[0]
//   //second id is referencing our useParams, which is getting the id from the URL
//   //filter is going to return an array, we want the first item
//   //in the data the id has a type of number, but in our id that we're referencing is a string. === requires and exact match. We have use == in this case so that our project id and our params types match. We are not meant to do use == in JavaScript because it's not exact. Need to replace with a slug or something else instead of useParams (something that also uses a string). When fetching from the api it will come back as a string. 


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

   // .then = chaining multiple functions, not nesting function

    // function sumpledges() 
    //   const amounts = projectData.pledges.map((pledgeData.amount) {
    //   })
    //   console.log(amounts);
    //   const sum = amounts.reduce((a, i) a + i, 0) 

      // function getUserName(supporterId) {
  //     fetch(`${import.meta.env.VITE_API_URL}users/${supporterId}`)
  //     .then((results) => {
  //       return results.json();
  //     })
  //     .then((data) => {
  //       console.log('data:',data)
  //       return data.username
  //     }); 
    