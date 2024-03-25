import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";
import PlacesAutocomplete from "../../../../components/PlacesAutocomplete";
import {
  GenerateMapInterface,
  PinInfoInterface,
  ProjectDetailsInterface,
  RegionInterface,
  ConfigurationInterface,
  OptimizationInterface,
  PresentationInterface,
  ConfigurationCheckInterface,
  OptimizationCheckInterface,
} from "../../../../types";
import { useState } from "react";
import { IoPlayOutline } from "react-icons/io5";
import {
  setMapAction,
  setProjectName,
  showExportDisplay,
  showShareDisplay,
  toggleDisplayMode,
} from "../../../../redux/actions";
import { IoShareSocial } from "react-icons/io5";
import { IoSyncOutline } from "react-icons/io5";
import {
  assignRegionsToPins,
  sortConfiguration,
  sortOptimization,
} from "./utils";
import {
  setHasSimulation,
  setSimulation,
  setHasEvaluation,
  setEvaluation,
} from "../../../../redux/actions/result.action";
import { ToastContainer, toast } from "react-toastify";
import { IoIosCheckmark } from "react-icons/io";
import { BsDot } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { PiExport } from "react-icons/pi";

const SERVER = process.env.REACT_APP_SERVER_URL;

const Nav = ({ isLoaded }: { isLoaded: boolean }) => {
  const { id } = useParams();

  const isPublic = useSelector(
    (state: any) => state.project.shareDetails.isPublic,
  ) as boolean;

  const projectDetails = useSelector(
    (state: any) => state.project.details,
  ) as ProjectDetailsInterface;
  const dispatch = useDispatch();
  const displayMode = useSelector((state: any) => state.project.displayMode);
  const currentMasts = useSelector(
    (state: any) => state.map.present.currentMasts,
  ) as PinInfoInterface[];
  const pins = useSelector(
    (state: any) => state.map.present.pins,
  ) as PinInfoInterface[];
  const regions = useSelector(
    (state: any) => state.map.present.regions,
  ) as RegionInterface[];

  const configurationCheck = useSelector(
    (state: any) => state.project.configurationCheck,
  ) as ConfigurationCheckInterface;
  const optimizationCheck = useSelector(
    (state: any) => state.project.optimizationCheck,
  ) as OptimizationCheckInterface;
  const configuration = useSelector((state: any) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    const conf = stateCopy.project.configuration as ConfigurationInterface;
    conf.threshold.loadVariance =
      !configurationCheck.numberOfMasts.specific && conf.threshold.loadVariance;
    return conf;
  }) as ConfigurationInterface;
  const optimization = useSelector(
    (state: any) => state.project.optimization,
  ) as OptimizationInterface;
  const saved = useSelector((state: any) => state.project.saved);
  const [simulating, setSimulating] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  const startGeneration = async () => {
    if (simulating) return;
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
      configuration: sortConfiguration(
        "simulation",
        currentMasts,
        configuration,
        configurationCheck,
      ),
      optimization: sortOptimization(optimization, optimizationCheck),
    };

    try {
      setSimulating(true);
      dispatch(setMapAction("hand"));
      dispatch(setHasSimulation(false));
      const response = await fetch(`${SERVER}/api/simulate/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(map),
      });
      setSimulating(false);
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      const presentationData = data.data as PresentationInterface;
      presentationData.coverage = (() => {
        const totalPopulation = regions.reduce(
          (acc, curr: RegionInterface) => acc + Number(curr.population),
          0,
        );
        return (presentationData.coverage / totalPopulation) * 100;
      })();
      dispatch(setSimulation(presentationData));
      dispatch(setHasSimulation(true));
    } catch (error: any) {
      setSimulating(false);
      if (/failed to fetch|network *error/i.test(error.message))
        toast.error("Check your internet connection and try again");
      else toast.error(error.message);
    }
  };

  const startEvaluation = async () => {
    if (evaluating) return;
    if (regions.length === 0) return toast.error("Add regions to the map");
    if (!currentMasts.length) return toast.error("Add masts to the map");

    const map: GenerateMapInterface = {
      regions,
      pins: assignRegionsToPins(pins, regions),
      configuration: sortConfiguration(
        "evaluation",
        currentMasts,
        configuration,
        configurationCheck,
      ),
      optimization: sortOptimization(optimization, optimizationCheck),
    };

    try {
      setEvaluating(true);
      dispatch(setMapAction("hand"));
      dispatch(setHasEvaluation(false));
      const response = await fetch(`${SERVER}/api/evaluate/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(map),
      });
      setEvaluating(false);
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      const presentationData = data.data as PresentationInterface;
      presentationData.coverage = (() => {
        const totalPopulation = regions.reduce(
          (acc, curr: RegionInterface) => acc + Number(curr.population),
          0,
        );
        return (presentationData.coverage / totalPopulation) * 100;
      })();
      dispatch(setEvaluation(presentationData));
      dispatch(setHasEvaluation(true));
    } catch (error: any) {
      setEvaluating(false);
      if (/failed to fetch|network *error/i.test(error.message))
        toast.error("Check your internet connection and try again");
      else toast.error(error.message);
    }
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
        <Link
          to="/dashboard"
          className="project-name__container__icon__container"
        >
          <FiHome className="project-name__container__icon" />
        </Link>
        <Link
          to={""}
          className="project-name__container__icon__container"
          onClick={(e) => e.preventDefault()}
        >
          <AiOutlineMenu className="project-name__container__icon" />
        </Link>
        <div className="project-name__content">
          <input
            value={projectDetails.title}
            onChange={(e) => dispatch(setProjectName(e.target.value))}
            onFocus={(e) => e.target.select()}
          />
          <p onClick={() => dispatch(showShareDisplay(true))}>
            {isPublic ? "Public" : "Private"}
          </p>
        </div>
        <div
          className={`project-name__container__status ${saved ? "saved" : ""}`}
        >
          {saved && <IoIosCheckmark />}
          {!saved && <BsDot />}
        </div>
      </form>
      <div className="search__container">
        {isLoaded && <PlacesAutocomplete />}
      </div>
      <div className="drawer nav__actions__container">
        <div
          className={`nav__actions__item ${simulating ? "disabled" : ""}`}
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
        <div
          className="nav__actions__item"
          onClick={() => dispatch(showExportDisplay(true))}
        >
          <PiExport className="nav__actions__icon" />
          <span>Export analysis</span>
        </div>
        <div
          className="nav__actions__item nav__actions__share"
          onClick={() => dispatch(showShareDisplay(true))}
        >
          <p>Share</p>
          <IoShareSocial className="nav__actions__icon" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
