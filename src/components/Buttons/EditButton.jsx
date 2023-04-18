import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditButton = ({ editUrl }) => {
    const navigate = useNavigate();
  

  const handleEditClick = () => {
    // Navigate to the edit URL
    navigate(editUrl);
  };

  return (
    <button type="button" onClick={handleEditClick}>
      Edit
    </button>
  );
};

export default EditButton;

// For projects
{/* <EditButton editUrl={`/projects/${projectId}/edit`} buttonText="Edit Project" /> */}

// For pledges
{/* <EditButton editUrl={`/pledges/${pledgeId}/edit`} buttonText="Edit Pledge /> */}
