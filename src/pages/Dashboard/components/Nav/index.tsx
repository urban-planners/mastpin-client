import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";
import PlacesAutocomplete from "../../../../components/PlacesAutocomplete";
import {
  GeneratePinInterface,
  GenerateMapInterface,
  PinInfoInterface,
  ProjectDetailsInterface,
  RegionInterface,
  ConfigurationInterface,
  OptimizationInterface,
  PresentationInterface,
} from "../../../../types";
import { useEffect, useState } from "react";
import { IoPlayOutline } from "react-icons/io5";
import { switchTheme, toggleDisplayMode } from "../../../../redux/actions";
import { IoMdSunny } from "react-icons/io";
import { WiMoonAltWaningCrescent4 } from "react-icons/wi";
import { IoShareSocial } from "react-icons/io5";
import { IoSyncOutline } from "react-icons/io5";
import { sortConfiguration, sortOptimization } from "./utils";
import {
  setHasResult,
  setPresentation,
} from "../../../../redux/actions/result.action";
import { ToastContainer, toast } from "react-toastify";

const SERVER = process.env.REACT_APP_SERVER_URL;

const Nav = ({ isLoaded }: { isLoaded: boolean }) => {
  const projectDetails = useSelector(
    (state: any) => state.project.details,
  ) as ProjectDetailsInterface;
  const [title, setTitle] = useState(projectDetails.projectName);
  const dispatch = useDispatch();
  const displayMode = useSelector((state: any) => state.project.displayMode);
  const theme = useSelector((state: any) => state.project.theme);
  const currentMasts = useSelector(
    (state: any) => state.map.currentMasts,
  ) as PinInfoInterface[];
  const pins = useSelector(
    (state: any) => state.map.pins,
  ) as PinInfoInterface[];
  const regions = useSelector(
    (state: any) => state.map.regions,
  ) as RegionInterface[];

  const configuration = useSelector((state: any) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    const conf = stateCopy.project.configuration;
    conf.threshold.loadVariance =
      !conf.numberOfMasts.specific && conf.threshold.loadVariance;
    return conf;
  }) as ConfigurationInterface;
  const optimization = useSelector(
    (state: any) => state.project.optimization,
  ) as OptimizationInterface;
  const configurationCheck = useSelector(
    (state: any) => state.project.configurationCheck,
  );
  const optimizationCheck = useSelector(
    (state: any) => state.project.optimizationCheck,
  );
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    setTitle(projectDetails.projectName);
  }, [projectDetails.projectName]);

  const startGeneration = async () => {
    if (loading) return;
    if (regions.length === 0) return toast.error("Add regions to the map");
    if (pins.length === 0) return toast.error("Add pins to the map");
    if (regions.find((region) => region.bounds.length < 3))
      return toast.error("Map regions are not well defined");
    if (regions.length === 0) return toast.error("Add regions to the map");
    if (regions.find((region) => region.population === 0))
      return toast.error("Population of regions must be greater than 0");

    const map: GenerateMapInterface = {
      regions,
      pins: assignRegionsToPins(pins, regions),
      configuration: sortConfiguration(configuration, configurationCheck),
      optimization: sortOptimization(optimization, optimizationCheck),
    };

    try {
      setLoading(true);
      const response = await fetch(`${SERVER}/api/simulate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(map),
      });
      setLoading(false);
      const data = await response.json();
      const presentationData = data.data as PresentationInterface;
      dispatch(setPresentation(presentationData));
      dispatch(setHasResult(true));
    } catch (error: any) {
      setLoading(false);
      if (/failed to fetch|network *error/i.test(error.message))
        toast.error("Check your internet connection and try again");
      else toast.error(error.message);
    }
  };

  const startEvaluation = async () => {
    if (evaluating) return;
    if (!currentMasts.length) return toast.error("Add masts to the map");
  };

  return (
    <nav className="dashboard__nav">
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
        <div
          className={`nav__actions__item ${loading ? "disabled" : ""}`}
          onClick={startGeneration}
        >
          <IoPlayOutline className="nav__actions__icon" />
          <span>Generate optimal placements</span>
        </div>
        <div
          className={`nav__actions__item ${evaluating ? "disabled" : ""}`}
          onClick={startEvaluation}
        >
          <IoSyncOutline className="nav__actions__icon" />
          <span>Evaluate current placements</span>
        </div>
        <div
          className="nav__actions__item"
          onClick={() => dispatch(toggleDisplayMode())}
        >
          <div
            className={`nav__actions__icon nav__actions__switch ${
              displayMode === "mapping" ? "" : "active"
            }`}
          >
            <div className="nav__actions__switch__circle" />
          </div>
          {displayMode === "mapping" && <span>Switch to technical mode</span>}
          {displayMode === "technical" && <span>Switch to mapping mode</span>}
        </div>
        <div className="nav__actions__item nav__actions__share">
          <p>Share</p>
          <IoShareSocial className="nav__actions__icon" />
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
