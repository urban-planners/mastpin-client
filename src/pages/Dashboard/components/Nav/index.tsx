import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";
import PlacesAutocomplete from "../../../../components/PlacesAutocomplete";
import {
  GeneratePinInterface,
  GenerateMapInterface,
  PinInfoInterface,
  ProjectDetailsInterface,
  RegionInterface,
} from "../../../../types";
import { useEffect, useState } from "react";
import { IoPlay } from "react-icons/io5";
import { switchTheme, toggleDisplayMode } from "../../../../redux/actions";
import { IoMdSunny } from "react-icons/io";
import { WiMoonAltWaningCrescent4 } from "react-icons/wi";

const SERVER = process.env.REACT_APP_SERVER_URL;

const Nav = ({ isLoaded }: { isLoaded: boolean }) => {
  const projectDetails = useSelector(
    (state: any) => state.project.details,
  ) as ProjectDetailsInterface;
  const [title, setTitle] = useState(projectDetails.projectName);
  const dispatch = useDispatch();
  const displayMode = useSelector((state: any) => state.project.displayMode);
  const theme = useSelector((state: any) => state.project.theme);
  const pins = useSelector(
    (state: any) => state.map.pins,
  ) as PinInfoInterface[];
  const regions = useSelector(
    (state: any) => state.map.regions,
  ) as RegionInterface[];

  useEffect(() => {
    setTitle(projectDetails.projectName);
  }, [projectDetails.projectName]);

  const startSimulation = async () => {
    const map: GenerateMapInterface = {
      regions,
      pins: assignRegionsToPins(pins, regions),
      resolution: 100,
    };

    try {
      const response = await fetch(`${SERVER}/api/simulate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(map),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {}
  };

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
      <div className="drawer nav__actions__container">
        <div className="nav__actions__item" onClick={startSimulation}>
          <IoPlay className="nav__actions__icon" />
          <span>Start Simulation</span>
        </div>
        <div className="nav__actions__item">
          <div
            className={`nav__actions__icon nav__actions__switch ${
              displayMode === "mapping" ? "" : "active"
            }`}
            onClick={() => dispatch(toggleDisplayMode())}
          >
            <div className="nav__actions__switch__circle" />
          </div>
          {displayMode === "mapping" && <span>Switch to technical mode</span>}
          {displayMode === "technical" && <span>Switch to mapping mode</span>}
        </div>
        <div
          className="nav__actions__item"
          onClick={() => dispatch(switchTheme())}
        >
          {theme === "light" ? (
            <IoMdSunny className="nav__actions__icon" />
          ) : (
            <WiMoonAltWaningCrescent4 className="nav__actions__icon" />
          )}
          {theme === "light" && <span>Switch to dark theme</span>}
          {theme === "dark" && <span>Switch to light theme</span>}
        </div>
      </div>
    </nav>
  );
};

export default Nav;

function assignRegionsToPins(
  pins: PinInfoInterface[],
  regions: RegionInterface[],
): GeneratePinInterface[] {
  const result: GeneratePinInterface[] = [];

  pins.forEach((pin) => {
    const regionsContainingPin = regions
      .filter((region) => {
        return google.maps.geometry.poly.containsLocation(
          pin.loc,
          new google.maps.Polygon({ paths: region.bounds }),
        );
      })
      .map((region) => region.title);

    result.push({
      id: pin.id,
      regionId: pin.regionId,
      title: pin.title,
      x: pin.loc.lng,
      y: pin.loc.lat,
      regions: regionsContainingPin,
    });
  });

  return result;
}
