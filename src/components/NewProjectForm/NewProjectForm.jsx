import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import formatCurrency from "../Helpers/FormatCurrency";

function ProjectForm() {

    const navigate = useNavigate();

    const [projectData, setProjectData] = useState(
        {
            title: "",
            description: "",
            target: "",
            image: "",
        }
    )
    // States for the uploadImage file and formattedTarget currency value:
    const [uploadImage, setUploadImage] = useState(null);
    const [formattedTarget, setFormattedTarget] = useState("");

    // Updates the formattedTarget whenever target changes
    useEffect(() => {
        setFormattedTarget(formatCurrency(projectData.target));
      }, [projectData.target]);      
   
    // Handles changes in the title, description, target, and image fields
    // Event handler for form input changes
    const handleChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        if (name === "target" && type === "number") {
        // Format target amount as currency
            const formattedValue = new Intl.NumberFormat("en-AU", {
                style: "currency",
                currency: "AUD",
            }).format(value);
            setProjectData((prevProjectData) => ({
                ...prevProjectData,
                [name]: formattedValue,
            }));
        } else if (type === "file" && files.length > 0) {
        // Update image data when a new file is selected
        const reader = new FileReader();
        reader.onload = (e) => {
            setProjectData((prevProjectData) => ({
            ...prevProjectData,
            image: e.target.result,
            imageLink: "",
            }));
        };
        reader.readAsDataURL(files[0]);
        } else if (name === "imageLink") {
        // Update image link when input value changes
        setProjectData((prevProjectData) => ({
            ...prevProjectData,
            image: "",
            [name]: value,
        }));
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
      

    // Event handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const authToken = window.localStorage.getItem("token");

        if (authToken) {
        const formData = new FormData();
        formData.append("title", projectData.title);
        formData.append("description", projectData.description);
        formData.append("target", projectData.target);
        formData.append("image", uploadImage);

        // Send form data to API endpoint for project creation
        const response = await fetch(`${import.meta.env.VITE_API_URL}projects/`, {
            method: "POST",
            headers: {
            Authorization: `Token ${authToken}`,
            },
            body: formData,
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log("Success:", responseData);
        } else {
            console.log("Error:", response.statusText);
        }
        } else {
        // Redirect to login page if user is not authenticated
        navigate(`/login`);
        }
        console.log(projectData);
    };
  
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
                <input type="file" id="image" name="image" onChange={handleFileUpload} />
            </div>
            <div className="form-item">
                <button type="Submit">Post Project!</button>
            </div>
        </form>
    )
}

export default ProjectForm