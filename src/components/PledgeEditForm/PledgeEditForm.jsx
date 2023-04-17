import React, { useState, useEffect } from "react";

const EditForm = ({ objectId }) => {
  // State to store form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    // ... other form fields
  });

  // Fetch initial object data from backend using useEffect
  useEffect(() => {
    const fetchObjectData = async () => {
      // Fetch the data for the object to be edited from the backend
      try {
        const response = await fetch(`/api/objects/${objectId}/`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error("Failed to fetch object data:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch object data:", error);
      }
    };
    fetchObjectData();
  }, [objectId]); // Runs only when objectId prop changes

    // Event handler for form field changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    // Update form data state with new values

    // Format the target value as a currency value in AUD
    if (name === 'target' && type === 'number') {
      const formattedValue = Number(value).toLocaleString(undefined, {
        style: 'currency',
        currency: 'AUD' // Update to AUD for Australian Dollars
      });
      setProjectFormData((prevProjectFormData) => ({
        ...prevProjectFormData,
        [name]: formattedValue,
      }));
    } else {
      setProjectFormData((prevProjectFormData) => ({
        ...prevProjectFormData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };


  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make API call to update the object with edited data
      const response = await fetch(`/api/objects/${objectId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Include Token-based authentication credentials in the headers
          "Authorization": `Token ${authToken}` // Replace 'authToken' with your actual token value
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Handle success, e.g., show success message, redirect, etc.
      } else {
        console.error("Failed to update object:", response.statusText);
        // Handle error, e.g., show error message, etc.
      }
    } catch (error) {
      console.error("Failed to update object:", error);
      // Handle error, e.g., show error message, etc.
    }
  };

  // Render the form
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields with their respective values and change handlers */}
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      {/* ... other form fields */}
      {/* Submit button */}
      <button type="submit">Save</button>
    </form>
  );
};

export default EditForm;


{/* <EditButton editUrl={`/pledges/${pledgeId}/edit`} /> */}
