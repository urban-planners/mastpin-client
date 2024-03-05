import "./Dashboard.css";
import { useLoadScript } from "@react-google-maps/api";
import CustomMap from "./CustomMap";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import DrawerLeft from "./components/Drawer/DrawerLeft";
import DrawerRight from "./components/Drawer/DrawerRight";
import Nav from "./components/Nav";
import { MapInfoInterface, PinInfoInterface } from "../../types";
import { useSelector } from "react-redux";

const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const Dashboard = () => {
  const mapInfo = useSelector(
    (state: any) => state.map.mapInfo,
  ) as MapInfoInterface;
  const [counter, setCounter] = useState<{ pin: number }>({
    pin: 1,
  });
  const [selected, setSelected] = useState<{
    asset: string;
  }>({
    asset: "",
  });
  const [fullScreen, setFullScreen] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY as string,
    libraries: ["places"],
  });

  useEffect(() => {
    document
      .querySelector("body")
      ?.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          return setSelected({
            asset: "",
          });
        }
        if (e.ctrlKey && e.key === "/") {
          e.preventDefault();
          return setFullScreen((prev) => !prev);
        }
      });
  }, []);

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
