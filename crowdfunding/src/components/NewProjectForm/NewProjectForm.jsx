import React from "react";
import { useState } from "react";

function ProjectForm() {
    const [projectFormData, setProjectFormData] = useState(
        {
            title: "",
            description: "",
            target: "$",
            // image: "",
            // isopen: true,
            // datecreated: "",
            // owner: "",
        }
    )

    function handleChange (event) {
        const {name, value, type, checked} = event.target
        setProjectFormData(prevProjectFormData => {
            return {
                ...prevProjectFormData,
                [name]: type === "checked" ? checked: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(projectFormData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Project Title: </label>
                <input type="text" id="title" name="title" onChange={handleChange} value={projectFormData.title}/>
            </div>
            <div>
                <label htmlFor="description">Description: </label>
                <textarea type="text" id="title" name="title" onChange={handleChange} value={projectFormData.description}/>
            </div>
            <div>
                <label htmlFor="target">Project Target: </label>
                <input type="number" id="target" name="target" onChange={handleChange} value={projectFormData.target}/>
            </div>
            <div>
                <button type="Submit">Post Project!</button>
            </div>
        </form>
    )
}

export default ProjectForm