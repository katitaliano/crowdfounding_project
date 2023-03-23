import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProjectForm() {

    const navigate = useNavigate();

    const [projectData, setProjectData] = useState(
        {
            title: "",
            description: "",
            target: "$",
            image: "",
            // isopen: true,
            // datecreated: "",
            // owner: "",
        }
    )

    function handleChange(event) {
        setProjectData(event.target.value)
    }

    // function handleChange(event) {
    //     const value = event.target.value;
    //     setProjectData({
    //         ...projectData,
    //         [event.target.name]: value,
    //       });
    //     };
   
    async function handleSubmit (event) {
        event.preventDefault();
        // get auth token from local storage
        const authToken = window.localStorage.getItem("token");

        if (authToken) {
            // try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}projects/`,
            //   fetching the page (assigning to a specific project ID)
                {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${authToken}`},
                body: JSON.stringify({...projectData }),

            })
                .then((response) => response.json())
                .then((...projectData) => {
                    console.log("Success:", projectData);
                })
                .catch((error) => {
                    console.log("Error:", error);
                })
            // if (!response.ok) {
            //     throw new Error(await response.text());
            // }
            // location.reload();
            // } catch (err) {
            // console.error(err);
            // alert(`Error: ${err.message}`);
            // }
        } else {
            //REDIRECT TO LOGIN PAGE
            navigate(`/login`);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-item">
                <label htmlFor="title">Project Title: </label>
                <input type="text" id="title" name="title" value={projectData.title} onChange={handleChange} />
            </div>
            <div className="form-item">
                <label htmlFor="description">Description: </label>
                <textarea id="title" name="title" value={projectData.description} onChange={handleChange} />
            </div>
            <div className="form-item">
                <label htmlFor="target">Project Target: </label>
                <input type="number" id="target" name="target" placeholder="$AU" value={projectData.target} onChange={handleChange}/>
            </div>
            <div className="form-item">
                <label htmlFor="image">Image link: </label>
                <input type="url" id="image" name="image" value={projectData.image} onChange={handleChange} />
            </div>
            <div className="form-item">
                <button type="Submit">Post Project!</button>
            </div>
        </form>
    )
}

export default ProjectForm