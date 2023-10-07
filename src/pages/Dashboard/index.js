import "./Dashboard.css"
import { useLoadScript } from "@react-google-maps/api";
import Map from "../../components/Map"
import Loading from "../Loading";
import { useEffect, useState } from "react";
import DrawerLeft from "./components/DrawerLeft";
import DrawerRight from "./components/DrawerRight";
import Nav from "./components/Nav";

const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const Dashboard = () => {
  const [targets, setTargets] = useState([]);
  const [mapInfo, setMapInfo] = useState({
    zoom: 15,
    center: {
      lng: 3.7181452, 
      lat: 6.8920758
    }
  });
  const [counter, setCounter] = useState({
    pin: 1
  });
  const [selected, setSelected] = useState({
    asset: ""
  });
  const [fullScreen, setFullScreen] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ["places"]
  });

  useEffect(() => {
    document.querySelector("body")
      .addEventListener("keydown", e => {
        switch(e.key) {
          case "Escape":
            setSelected({
              asset: ""
            });
            break;
          case "/":
            setFullScreen(prev => !prev)
        }
      })
  }, [])

  return (
    <div className="dashboard-page">
      {
        !fullScreen && 
        <Nav isLoaded={isLoaded} setMapInfo={setMapInfo} />
      }
      <main className="dashboard__main">
        {
          !fullScreen &&
          <DrawerLeft 
            assets={targets} 
            selected={selected} 
            setSelected={setSelected} />
        }
        {
          !isLoaded ? <Loading /> :
          <Map 
            mapInfo={mapInfo}
            setMapInfo={setMapInfo}
            targets={targets}
            setTargets={setTargets}
            counter={counter}
            setCounter={setCounter}
            setSelected={setSelected}
          />
        }
        {
          !fullScreen && 
          <DrawerRight assets={targets} selected={selected} />
        }
      </main>
    </div>
  )
}

export default Dashboard