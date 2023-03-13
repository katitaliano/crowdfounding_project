// import { useState, } from "react";
// import { useNavigate, useOutletContext } from "react-router-dom";

// function PledgeForm(props) {

//   const { project } = props;
//   const authToken = window.localStorage.getItem("token")
//   const [loggedIn] = useOutletContext();

//   // State
//   const [pledgeData, setPledgeData] = useState({
//     amount: null,
//     anonymous: false,
//     comment: "",
//   });

//   // Hooks
//   // enables redirect, useNavigate returns a function that lets you navigate programmatically
//   const navigate = useNavigate();

//   // Effects

//   // Actions
// // copy original data, replace with input from form
//   const handleChange = (event) => {
    
//   };
// // submit new data (state change) from handleChange
//   const postData = async () => {
//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL}pledges/`,
//       {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
          
//         },
//         body: JSON.stringify(credentials),
//       }
//     );
//     return response.json();
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//   };
  
// return (
//     <form onSubmit={handleSubmit}>
//         <div>
//         <h2>Make a Pledge: {projectData.title}</h2>
//         </div>
//           <div>
//             <div className="form-item">
//                   <label htmlFor="Amount">Pledges Amount:</label>
//                   <input type="number" id="amount" name="amount" onChange={handleChange}/>
//               </div>
//               <div className="form-item">
//                   <label htmlFor="anonymous">Pledge anonymously?</label>
//                   <input type="checkbox" id="anonymous" name="anonymous" onChange={handleChange}/>
//               </div>
//               <div className="form-item">
//                   <label htmlFor="comment">Comment:</label>
//                   <textarea id="comment" name="comment" defaultValue={""} onChange={handleChange}/>
//               </div>
//                   <div className="form-item">
//                   <button type="submit">Submit Pledge!</button>
//               </div>
//           </div>
//     </form>
//  );
// }

// export default PledgeForm;



// // const handleChange = (event) => {
// //     const { id, value } = event.target;

// //     setCredentials((prevCredentials) => ({
// //       ...prevCredentials,
// //       [id]: value,
// //     }));
// //   };

// //   const postData = async () => {
// //     const response = await fetch(
// //       `${import.meta.env.VITE_API_URL}api-token-auth/`,
// //       {
// //         method: "post",
// //         headers: {
// //           "Content-Type": "application/json",
          
// //         },
// //         body: JSON.stringify(credentials),
// //       }
// //     );
// //     return response.json();
// //   };

// //   
// //   };