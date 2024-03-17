import "./Dashboard.css";
import { useLoadScript } from "@react-google-maps/api";
import CustomMap from "./components/Map/CustomMap";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import DrawerLeft from "./components/Drawer/DrawerLeft";
import DrawerRight from "./components/Drawer/DrawerRight";
import Nav from "./components/Nav";
import { MapInfoInterface } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  setConfiguration,
  setConfigurationCheck,
  setMapLink,
  setMapVisibility,
  setOptimization,
  setOptimizationCheck,
  setPins,
  setProjectDetails,
  setRegions,
  showMapLabels,
} from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Dispatch } from "@reduxjs/toolkit";
import { SyncLoader } from "react-spinners";

const SERVER = process.env.REACT_APP_SERVER_URL;
const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const Dashboard = () => {
  let { id, publicId } = useParams();
  if (publicId) id = publicId;

  const mapInfo = useSelector(
    (state: any) => state.map.mapInfo,
  ) as MapInfoInterface;
  const [fullScreen, setFullScreen] = useState(false);
  const dispatch = useDispatch();
  const showLabels = useSelector(
    (state: any) => state.map.mapInfo.showLabels,
  ) as boolean;
  const navigate = useNavigate();
  const location = new URL(window.location.href);
  const clientUrl = location.origin;

  const [gettingProject, setGettingProject] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY as string,
    libraries: ["places"],
  });

  useEffect(() => {
    const keyBindingsFtn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
      }
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        return setFullScreen((prev) => !prev);
      }
      if (e.ctrlKey && e.key === "l") {
        e.preventDefault();
        dispatch(showMapLabels(!showLabels));
      }
    };
    document.querySelector("body")?.addEventListener("keydown", keyBindingsFtn);

    return () => {
      document
        .querySelector("body")
        ?.removeEventListener("keydown", keyBindingsFtn);
    };
  }, [showLabels]);

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
        {!isLoaded ? <Loading /> : <CustomMap mapInfo={mapInfo} />}
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
  const projectName = data.data.title;
  const createdAt = data.data.createdAt;
  const regions = data.data.regions;
  const pins = data.data.pins;
  const visibility = data.data.visibility;
  const configuration = data.data.configuration.configuration;
  const configurationCheck = data.data.configuration.configurationOptions;
  const optimization = data.data.optimization.optimization;
  const optimizationCheck = data.data.optimization.optimizationOptions;

  dispatch(
    setProjectDetails({
      projectName,
      createdAt,
    }),
  );
  dispatch(setRegions(regions));
  dispatch(setPins(pins));
  dispatch(setMapLink(`${clientUrl}/maps/${id}`));
  dispatch(setMapVisibility(visibility === "public"));
  dispatch(setConfiguration(configuration));
  dispatch(setConfigurationCheck(configurationCheck));
  dispatch(setOptimization(optimization));
  dispatch(setOptimizationCheck(optimizationCheck));
};
