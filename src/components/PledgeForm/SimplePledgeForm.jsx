import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

function PledgeForm(props) 
{
    const { project } = props;
    
    // accesses project ID so the pledge can be connected to it
    const { id } = useParams();
    // enables redirect
    const navigate = useNavigate();

    const[pledgeFormData, setPledgeFormData] = useState(
        { 
            amount: "",
            anonymous: false,
            comment: "",
            project: id,
        }
    );
    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setPledgeFormData((prevPledgeFormData) => ({
          ...prevPledgeFormData,
          [id]: type === "checkbox" ? checked : value,
        }));
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // get auth token from local storage
        const authToken = window.localStorage.getItem("token");
    
        if (authToken) {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}pledges/`,
            //   fetching the page (assigning to a specific project ID)
              {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${authToken}`,
                },
                body: JSON.stringify({ project:id, ...pledgeFormData }),
              }
            );
            if (!response.ok) {
              throw new Error(await response.text());
            }
            location.reload();
          } catch (err) {
            console.error(err);
            alert(`Error: ${err.message}`);
          }
        } else {
          //REDIRECT TO LOGIN PAGE
          navigate(`/login`);
        }
    };     

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="form-item">
                    <label htmlFor="Amount">Pledges Amount: $</label>
                    <input type="number" id="amount" onChange={handleChange} value={pledgeFormData.amount}
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="anonymous">Pledge anonymously?</label>
                    <input type="checkbox" id="anonymous" name="anonymous" onChange={handleChange} checked={pledgeFormData.anonymous.true}
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="comment">Comments:</label>
                    <textarea 
                    type="text" 
                    id="comment" 
                    placeholder="Leave a comment or message here..." 
                    maxLength="200" 
                    onChange={handleChange} value={pledgeFormData.comment}
                    />
                </div>
                  <div className="form-item">
                      <button type="submit">Submit Pledge!</button>
                  </div>
              </div> 
        </form>
     );
}
export default PledgeForm;



    // const handleChange = (event) => {
    //     // console.log(event);
    //     const { id, value, type, checked } = event.target;
    //     // pass to the setter function a callback function that takes the previous formData as argument. It should then return an object since our state value is an object. This new object to be returned should contain all the data from the previous formData ...prevFormData.
    //     setPledgeFormData(prevPledgeFormData => {
    //         return {
    //             ...prevPledgeFormData,
    //             // And then, to know the property in the State whose value is to be updated, we should check the type of form input or element. If it is a checkbox, then we use checked. Otherwise, we'll use value.
    //             [id]: type === "checkbox" ? checked : value
    //         };
    //     });
    // };


 // async function handleSubmit(event) {
        //     event.preventDefault();
        //     const authToken = window.localStorage.getItem("token");
        //     const res = await fetch(`${import.meta.env.VITE_API_URL}/pledges/`,
        //     { method: "POST", 
        //         headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Token ${authToken}`,
        //         },
        //         body: JSON.stringify({...pledgeFormData}),}
        //     )
        //         .then((response) => response.json())
        //         .then((pledgeFormData) => {
        //         console.log("Success:", pledgeFormData);
        //         }
        //         )
        //         .catch((err) => {
        //         console.error(`Error:, ${err.message}`);
        //         });
        //     }
        
    // function handleSubmit(event) { event.preventDefault();
    //     console.log(pledgeFormData);  } 