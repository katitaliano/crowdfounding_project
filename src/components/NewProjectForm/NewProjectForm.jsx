import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProjectForm() {

    const navigate = useNavigate();

    const [projectData, setProjectData] = useState(
        {
            title: "",
            description: "",
            target: "",
            image: "",
            is_open: true,
            date_created: "",
        }
    )
    // State for the uploadImage file:
    const [uploadImage, setUploadImage] = useState(null);

    // Event handler for form input changes
    const handleChange = (event) => {
        // Handles changes in the title, description, target, and image fields
        const { name, value, type, checked, files } = event.target;
        if (name === "target" && type === "number") {
            // Directly set target as integer
            setProjectData((prevProjectData) => ({
                ...prevProjectData,
                [name]: parseInt(value, 10),
            }));
        } else if (type === "url") {
            // Update image link when input value changes
            setProjectData((prevProjectData) => ({
                ...prevProjectData,
                image: value, // Update image property
            }));
        } else if (type === "file" && files.length > 0) {
            // Update image data when a new file is selected
            const reader = new FileReader();
            reader.onload = (e) => {
                setProjectData((prevProjectData) => ({
                    ...prevProjectData,
                    image: e.target.result,
                }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            // Update other form input values
            setProjectData((prevProjectData) => ({
                ...prevProjectData,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };
      

    const handleFileUpload = (event) => {
        const { name, files } = event.target;
        const reader = new FileReader();
        reader.onload = (e) => {
            //Using functional form of setUploadImage, ensuring latest state value.
            setUploadImage(() => e.target.result);
        };
        reader.readAsDataURL(files[0]);
    };
      
    const handleSubmit = async (event) => {
        event.preventDefault();
        const authToken = window.localStorage.getItem("token");
    
        if (authToken) {
            const formData = new FormData();
            formData.append("title", projectData.title);
            formData.append("description", projectData.description);
            formData.append('target', projectData.target);
    
            // Get current date and time
            const currentDate = new Date();
            formData.append('date_created', currentDate.toISOString());
    
            // Append image link as a string to formData
            if (uploadImage) {
                formData.append("image", uploadImage);
            } else if (projectData.image) {
                formData.append("image", projectData.image);
            }
    
            const response = await fetch(`${import.meta.env.VITE_API_URL}projects/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${authToken}`,
                },
                body: formData,
            });
    
            if (response.ok) {
                // Parse the response JSON
                const data = await response.json();
    
                // Extract the `id` from the response
                const id = data.id;
    
                // Navigate to the project page with the extracted `id`
                navigate(`/project/${id}`);
            } else {
                console.log("Error:", response.statusText);
            }
            console.log(formData);
        }
    }
    
    
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-item">
                <label htmlFor="title">Project Title: </label>
                <input type="text" id="title" name="title" onChange={handleChange} />
            </div>
            <div className="form-item">
                <label htmlFor="description">Description: </label>
                <textarea id="description" name="description" onChange={handleChange} />
            </div>
            <div className="form-item">
                <label htmlFor="target">Project Target: </label>
                <input type="number" id="target" name="target" placeholder="$AU" onChange={handleChange}/>
            </div>
            <div className="form-item">
                <label htmlFor="image">Image: </label>
                <input type="url" id="image" name="image" onChange={handleChange} placeholder="Insert image link" />
                <p>OR</p>
                <input type="url" id="image" name="image" onChange={handleFileUpload} />
            </div>
            <div className="form-item">
                <button type="Submit">Post Project!</button>
            </div>
        </form>
    )
}

export default ProjectForm;