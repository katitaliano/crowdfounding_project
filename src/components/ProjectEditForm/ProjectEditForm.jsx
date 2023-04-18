import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProjectEditForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    // State for the uploadImage file:
    const [uploadImage, setUploadImage] = useState(null);

    const [projectFormData, setProjectFormData] = useState(
        {
            title: "",
            description: "",
            target: "",
            image: "",
            is_open: "",
            date_created: "",
        }
    )
    useEffect(() => {
      const fetchProject = async () => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}projects/${id}`
          );
          const data = await res.json();
          setProjectFormData(data);
          console.log('project data:', projectFormData)
         
        } catch (err) {
          console.log(err);
        }
      };
      fetchProject();
    }, []);

    // Event handler for form input changes
    const handleChange = (event) => {
        // Handles changes in the title, description, target, and image fields
        const { name, value, type, checked, files } = event.target;
        if (name === "target" && type === "number") {
            // Directly set target as integer
            setProjectFormData((prevProjectFormData) => ({
                ...prevProjectFormData,
                [name]: parseInt(value, 10),
            }));
        } else if (type === "url") {
            // Update image link when input value changes
            setProjectFormData((prevProjectFormData) => ({
                ...prevProjectFormData,
                image: value, // Update image property
            }));
        } else if (type === "file" && files.length > 0) {
            // Update image data when a new file is selected
            const reader = new FileReader();
            reader.onload = (e) => {
                setProjectFormData((prevProjectFormData) => ({
                    ...prevProjectFormData,
                    image: e.target.result,
                }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            // Update other form input values
            setProjectFormData((prevProjectFormData) => ({
                ...prevProjectFormData,
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
            formData.append("title", projectFormData.title);
            formData.append("description", projectFormData.description);
            formData.append('target', projectFormData.target);
    
            // Get current date and time
            const currentDate = new Date();
            formData.append('date_created', currentDate.toISOString());
    
            // Append image link as a string to formData
            if (uploadImage) {
                formData.append("image", uploadImage);
            } else if (projectFormData.image) {
                formData.append("image", projectFormData.image);
            }
    
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Token ${authToken}`,
                },
                body: formData,
            });
    
            if (response.ok) {
                // Parse the response JSON
                const data = await response.json();
    
                // Extract the `id` from the response
                // const id = data.id;
    
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
                <input type="text" id="title" name="title" defaultValue={projectFormData.title} onChange={handleChange} />
            </div>
            <div className="form-item">
                <label htmlFor="description">Description: </label>
                <textarea id="description" name="description" defaultValue={projectFormData.description} onChange={handleChange} />
            </div>
            <div className="form-item">
                <label htmlFor="target">Project Target: </label>
                <input type="number" id="target" name="target" placeholder="$AU" defaultValue={projectFormData.target} onChange={handleChange}/>
            </div>
            <div className="form-item">
                <label htmlFor="image">Image: </label>
                <input type="url" id="image" name="image" defaultValue={projectFormData.image} onChange={handleFileUpload} />
            </div>
            <div className="form-item">
                <button type="Submit">Update Project</button>
            </div>
        </form>
    )
}

export default ProjectEditForm;

// Call fetchProject when component mounts to fetch project data using project ID from useParams
// Set fetched project data to projectFormData state using setProjectFormData
// Update form input values using handleChange event handler
// Allow user to upload an image file or link using handleFileUpload and handleChange event handlers
// When form is submitted, create a new FormData instance and append form input values to it
// Use fetch API to send PUT request to update project on the server with the new form data
// If the request is successful, extract the project ID from the response and navigate to the updated project page