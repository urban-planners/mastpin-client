import "./Dashboard.css";
import { Libraries, useLoadScript } from "@react-google-maps/api";
import CustomMap from "./components/Map/CustomMap";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import DrawerLeft from "./components/Drawer/DrawerLeft";
import DrawerRight from "./components/Drawer/DrawerRight";
import Nav from "./components/Nav";
import { MapInfoInterface } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPin,
  selectRegion,
  setConfiguration,
  setConfigurationCheck,
  setCurrentMasts,
  setMapLink,
  setMapVisibility,
  setOptimization,
  setOptimizationCheck,
  setPins,
  setProjectDetails,
  setRegions,
  setSaved,
} from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { SyncLoader } from "react-spinners";
import { useAutosave, useShortkeys } from "../../hooks";
import {
  setEvaluation,
  setHasEvaluation,
  setHasSimulation,
  setSimulation,
} from "../../redux/actions/result.action";

const SERVER = process.env.REACT_APP_SERVER_URL;
const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;
const libraries = ["places"] as Libraries;

const Dashboard = () => {
  let { id, publicId } = useParams();
  if (publicId) id = publicId;

  const saved = useSelector((state: any) => state.project.saved);
  const [fullScreen, setFullScreen] = useState(false);
  const dispatch = useDispatch();
  const showLabels = useSelector(
    (state: any) => state.map.present.mapInfo.showLabels,
  ) as boolean;
  const navigate = useNavigate();
  const location = new URL(window.location.href);
  const clientUrl = location.origin;
  const [gettingProject, setGettingProject] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY as string,
    libraries,
  });

  useEffect(() => {
    window.onbeforeunload = (e: BeforeUnloadEvent) => {
      if (!saved) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [saved]);

  useEffect(() => {
    (async () => {
      try {
        setGettingProject(true);
        await getProject({
          id: id as string,
          publicId,
          dispatch,
          clientUrl,
        });
        setGettingProject(false);
      } catch (error: any) {
        toast.error(error.message, {
          onClose: () => navigate(`/dashboard`, { replace: true }),
        });
      }
    })();
  }, [id]);

  const manualSave = useAutosave();
  useShortkeys({ manualSave, showLabels, setFullScreen });

  return (
    <div className="dashboard-page">
      {gettingProject && (
        <div className="dashboard__loading">
          <div />
          <SyncLoader color="#fff" />
        </div>
      )}
      {!fullScreen && <Nav isLoaded={isLoaded} />}
      <main className="dashboard__main">
        {!fullScreen && <DrawerLeft />}
        {!isLoaded ? <Loading /> : <CustomMap />}
        {!fullScreen && <DrawerRight />}
      </main>
    </div>
  );
};

export default Dashboard;

const getProject = async ({
  id,
  publicId,
  dispatch,
  clientUrl,
}: {
  id: string;
  publicId: string | undefined;
  dispatch: Dispatch;
  clientUrl: string;
}): Promise<Error | void> => {
  if (!id) throw new Error("ID is required");
  const privateUrl = `${SERVER}/projects/one/${id}`;
  const publicUrl = `${SERVER}/public/map/${id}`;
  const url = publicId ? publicUrl : privateUrl;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  if (data.error) throw new Error(data.message);
  const title = data.data.title;
  const updatedAt = data.data.updatedAt.toString();
  const regions = data.data.regions;
  const pins = data.data.pins;
  const currentMasts = data.data.currentMasts;
  const visibility = data.data.visibility;
  const configuration = data.data.configuration.configuration;
  const configurationCheck = data.data.configuration.configurationOptions;
  const optimization = data.data.optimization.optimization;
  const optimizationCheck = data.data.optimization.optimizationOptions;
  const presentation = data.data.presentation?.map((item: any) => ({
    ...item,
    data: {
      coverage: item.data.coverage,
      load_max: item.data.loadMax,
      load_min: item.data.loadMin,
      load_std: item.data.loadStd,
      load_values: item.data.loadValues,
      mast_loc: item.data.mastLocations,
      mast_loc_coord: item.data.mastLocationCoordinates,
      region_signal_strength: item.data.regionSignalStrength,
      signal_strength: item.data.signalStrength,
    },
  }));

  const simulation = presentation.filter(
    (item: any) => item.type === "optimization",
  );
  const evaluation = presentation.filter(
    (item: any) => item.type === "evaluation",
  );

  dispatch(
    setProjectDetails({
      title,
      updatedAt,
    }),
  );
  dispatch(setRegions(regions));
  dispatch(setPins(pins));
  if (regions.length > 0) {
    const regionId = regions[0].id;
    dispatch(selectRegion(regionId));
    const pinId = pins.find((pin: any) => pin.regionId === regionId)?.id;
    if (pinId) dispatch(selectPin(pinId));
  }
  dispatch(setCurrentMasts(currentMasts));
  dispatch(setMapLink(`${clientUrl}/maps/${id}`));
  dispatch(setMapVisibility(visibility === "public"));
  dispatch(setConfiguration(configuration));
  dispatch(setConfigurationCheck(configurationCheck));
  dispatch(setOptimization(optimization));
  dispatch(setOptimizationCheck(optimizationCheck));
  if (simulation.length > 0) {
    dispatch(setSimulation(simulation[0].data));
    dispatch(setHasSimulation(true));
  }
  if (evaluation.length > 0) {
    dispatch(setEvaluation(evaluation[0].data));
    dispatch(setHasEvaluation(true));
  }
};
