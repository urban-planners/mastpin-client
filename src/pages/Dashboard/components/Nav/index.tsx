import PlacesAutocomplete from "../../../../components/PlacesAutocomplete";
import { MapInfoInterface } from "../../../../types";
import "./Nav.css";

const Nav = ({ isLoaded }: { isLoaded: boolean }) => {
  return (
    <nav className="dashboard__nav">
      <div className="drawer project-name__container">
        <label>
          <small>Project Name</small>
          <input value="Untitled-1" disabled />
        </label>
      </div>
      <div className="search__container">
        {isLoaded && <PlacesAutocomplete />}
      </div>
      <div className="drawer switch__container"></div>
    </nav>
  );
};

export default Nav;
