import "./Dashboard.css";
import { useLoadScript } from "@react-google-maps/api";
import CustomMap from "../../components/CustomMap";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import DrawerLeft from "./components/Drawer/DrawerLeft";
import DrawerRight from "./components/Drawer/DrawerRight";
import Nav from "./components/Nav";
import { MapInfoInterface, PinInfoInterface } from "../../types";

const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const Dashboard = () => {
  const [targets, setTargets] = useState<PinInfoInterface[]>([]);
  const [mapInfo, setMapInfo] = useState<MapInfoInterface>({
    zoom: 15,
    center: {
      lng: 3.7181452,
      lat: 6.8920758,
    },
  });
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
        switch (e.key) {
          case "Escape":
            setSelected({
              asset: "",
            });
            break;
          case "/":
            setFullScreen((prev) => !prev);
        }
      });
  }, []);

  return (
    <div className="dashboard-page">
      {!fullScreen && <Nav isLoaded={isLoaded} setMapInfo={setMapInfo} />}
      <main className="dashboard__main">
        {!fullScreen && (
          <DrawerLeft
            targets={targets}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        {!isLoaded ? (
          <Loading />
        ) : (
          <CustomMap
            mapInfo={mapInfo}
            setMapInfo={setMapInfo}
            targets={targets}
            setTargets={setTargets}
            counter={counter}
            setCounter={setCounter}
            setSelected={setSelected}
          />
        )}
        {!fullScreen && <DrawerRight targets={targets} selected={selected} />}
      </main>
    </div>
  );
};

export default Dashboard;
