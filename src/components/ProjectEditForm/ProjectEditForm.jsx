import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProjectEditForm = () => {
  // Access the URL parameter using useParams
  const { id } = useParams();
  const navigate = useNavigate();

  // State to store form data
  const [projectFormData, setProjectFormData] = useState({
    title: "",
    description: "",
    target: "",
    image: "",
    isOpen: true,
  });

  // Fetch initial object data from backend using useEffect
  useEffect(() => {
    const fetchProjectData = async () => {
      // Fetch the data for the project to be edited from the backend
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}projects/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProjectFormData(data);
        } else {
          console.error("Failed to fetch project data:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      }
    };
    fetchProjectData();
  }, [id]); // Runs only when id prop changes

  /// Event handler for form field changes
  const handleChange = (event) => {
    // Using destructuring assignment to extract properties from the event.target object and storing them in separate variables.The event.target object represents the DOM element that triggered the event.
    const { name, value, type, checked, files } = event.target;
    // Update form data state with new values. 
    if (name === 'target' && type === 'number') {
      // Format the target value as a currency value in AUD
      const formattedValue = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD'
      }).format(value);
      // Update the state of projectFormData object using the useState hook.The updated property is determined by the value of the name variable, extracted in destructuring assignment above. The name variable is used as a dynamic key to update the corresponding property in prevProjectFormData with a new value formattedValue.
      setProjectFormData((prevProjectFormData) => ({
        ...prevProjectFormData,
        [name]: formattedValue,
      }));
    } else if (type === "file" && files.length > 0) {
      // Check if the input type is 'file' and files are selected
      // Read the selected file as Data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProjectFormData((prevProjectFormData) => ({
          ...prevProjectFormData,
          [name]: e.target.result, // Set image value as Data URL
          imageLink: "" // Clear image link if file is uploaded
        }));
      };
      reader.readAsDataURL(files[0]);
    } else if (name === 'imageLink') {
      // If user provides a value for imageLink, clear the file value
      setProjectFormData((prevProjectFormData) => ({
        ...prevProjectFormData,
        image: "", // Clear file value
        [name]: value
      }));
    } else {
      setProjectFormData((prevProjectFormData) => ({
        ...prevProjectFormData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  // Event handler for file upload
  const handleFileUpload = (event) => {
    const { name, files } = event.target;
    // Check if the input type is 'file' and files are selected
    // Read the selected file as Data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setProjectFormData((prevProjectFormData) => ({
        ...prevProjectFormData,
        [name]: e.target.result, // Set image value as Data URL
      }));
    };
    reader.readAsDataURL(files[0]);
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make API call to update the project with edited data
      const response = await fetch(`/api/objects/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          // Include Token-based authentication credentials in the headers
            "Authorization": `Token ${authToken}` // Replace 'authToken' with your actual token value
        },
        body: JSON.stringify(projectFormData),
      });
      if (response.ok) {
        // Handle success, e.g., show success message, redirect, etc.
        navigate(`/project/${id}`);
      } else {
        console.error("Failed to update project:", response.statusText);
        // Handle error, e.g., show error message, etc.
      }
    } catch (error) {
      console.error("Failed to update project:", error);
      // Handle error, e.g., show error message, etc.
    }
  };
 // Render the form
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields with their respective values and change handlers */}
      <div className="form-item">
        <label htmlFor="title">Project Title: </label>
        <input type="text" id="title" name="title" defaultValue={projectFormData.title} onChange={handleChange} />
      </div>
      <div className="form-item">
        <label htmlFor="description">Description: </label>
        <textarea id="description" name="description" defaultValue={projectFormData.description} onChange={handleChange} />
      </div>
      <div className="form-item">
      <label htmlFor="image">Image: </label>
      <input type="url" id="image" name="image" onChange={handleChange} placeholder="Insert image link" />
        <p>OR</p>
        <input type="file" id="image" name="image" onChange={handleFileUpload} />
        {/* {projectFormData.image && (
          <img src={projectFormData.image} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />
        )} */}
      </div>
      <div className="form-item">
        <label htmlFor="target">Target: </label>
        <input type="number" id="target" name="target" defaultValue={projectFormData.target} onChange={handleChange} />
      </div>
      <div className="form-item">
        <label htmlFor="isOpen">Is Open: </label>
        <input type="checkbox" id="isOpen" name="isOpen" checked={projectFormData.isOpen} onChange={handleChange} />
      </div>
      <button type="submit">Update Project</button>
    </form>
  );   
};

export default ProjectEditForm;

// Here are some suggestions to improve the code:

// Add form validation: You can add form validation to ensure that the user enters valid data in the form fields before submitting the form. For example, you can check if the required fields are filled, validate the format of the target amount, and validate the format of the image link.

// Handle form submission errors: The handleSubmit function currently catches errors when making the API call, but it does not provide any feedback to the user about the error. You can display an error message or toast notification to inform the user if the form submission fails.

// Provide feedback on form field changes: Currently, the form fields are updated in the state using the handleChange function, but there is no feedback provided to the user about the changes. You can add feedback, such as highlighting the changed fields or displaying a success message, to indicate to the user that their changes have been saved.

// Use better error handling: The error handling in the fetchProjectData function and handleSubmit function can be improved. For example, you can catch specific types of errors, such as network errors or server errors, and provide more meaningful error messages to the user.

// Securely handle authentication: The handleSubmit function includes a placeholder for an authorization token (authToken) in the headers of the API call. It's important to handle authentication securely, such as using a secure token storage mechanism (e.g., HTTP-only cookies, local storage with proper encryption) and validating the token on the server side to prevent unauthorized access to the API.

// Improve file upload security: The handleFileUpload function currently reads the file as a Data URL and sets it as the image value in the state. Data URLs can be large and may not be suitable for storing large images in the state. Additionally, using Data URLs may expose the image data in the URL, which can be a security risk. It's recommended to upload the file to the server and store the file on the server or a file storage service, and then store the URL or file path in the state.

// Use the appropriate HTTP method for updates: The handleSubmit function currently uses the HTTP PUT method for updating the project data. Depending on the backend API, the appropriate HTTP method for updates may be different, such as PATCH or POST. Make sure to use the correct HTTP method according to the API documentation.

// Consider using a form library: If the form requirements become more complex, you may consider using a form library, such as Formik or React Hook Form, to simplify form management, validation, and error handling. These libraries provide additional features and abstractions for handling form data in a more declarative and efficient way.