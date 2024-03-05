import { useSelector } from "react-redux";
import PlacesAutocomplete from "../../../../components/PlacesAutocomplete";
import "./Nav.css";
import { ProjectDetailsInterface } from "../../../../types";
import { useEffect, useState } from "react";

const Nav = ({ isLoaded }: { isLoaded: boolean }) => {
  const projectDetails = useSelector(
    (state: any) => state.project.details,
  ) as ProjectDetailsInterface;
  const [title, setTitle] = useState(projectDetails.projectName);

  useEffect(() => {
    setTitle(projectDetails.projectName);
  }, [projectDetails.projectName]);

  return (
    <nav className="dashboard__nav">
      <form className="drawer project-name__container">
        <label>
          <small>Project Name</small>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
      </form>
      <div className="search__container">
        {isLoaded && <PlacesAutocomplete />}
      </div>
      <div className="drawer switch__container"></div>
    </nav>
  );
};

export default Nav;
