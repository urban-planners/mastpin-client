import "./Dashboard.css";
import { useLoadScript } from "@react-google-maps/api";
import CustomMap from "./CustomMap";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import DrawerLeft from "./components/Drawer/DrawerLeft";
import DrawerRight from "./components/Drawer/DrawerRight";
import Nav from "./components/Nav";
import { MapInfoInterface, PinInfoInterface } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { showMapLabels } from "../../redux/actions";

const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const Dashboard = () => {
  const mapInfo = useSelector(
    (state: any) => state.map.mapInfo,
  ) as MapInfoInterface;
  const [fullScreen, setFullScreen] = useState(false);
  const dispatch = useDispatch();
  const showLabels = useSelector(
    (state: any) => state.map.mapInfo.showLabels,
  ) as boolean;

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

  return (
    <div className="dashboard-page">
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
