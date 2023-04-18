import ProjectEditForm from "../components/ProjectEditForm/ProjectEditForm";
import DeleteProjectButton from "../components/Buttons/DeleteButton";
import { Link, useParams } from "react-router-dom";

function ProjectEditPage() {
    const id = useParams;
  return (
    <div>
        <div>
        <ProjectEditForm />
        </div>
        <Link to={`/project/${id}`}>
        <div className="form-item">
        <button type="button">Cancel</button>
        </div>
        </Link>
        <div className="form-item">
        <DeleteProjectButton />
        </div>
    </div>
      
  );
}

export default ProjectEditPage;
