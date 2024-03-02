import "./CustomMap.css";
import { GoogleMap, Marker } from "@react-google-maps/api";
import pin from "../assets/svgs/pin.svg";
import modalPin from "../assets/svgs/modal-pin.svg";
import { nanoid } from "nanoid";
import { useState } from "react";
import { MapInfoInterface, PinInfoInterface } from "../types";

const CustomMap = ({
  mapInfo,
  setMapInfo,
  targets,
  setTargets,
  counter,
  setCounter,
  setSelected,
}: {
  mapInfo: MapInfoInterface;
  setMapInfo: React.Dispatch<React.SetStateAction<MapInfoInterface>>;
  targets: PinInfoInterface[];
  setTargets: React.Dispatch<React.SetStateAction<PinInfoInterface[]>>;
  counter: { pin: number };
  setCounter: React.Dispatch<React.SetStateAction<{ pin: number }>>;
  setSelected: React.Dispatch<React.SetStateAction<{ asset: string }>>;
}) => {
  const [map, setMap] = useState<google.maps.Map>();

  const onClick = (e: google.maps.MapMouseEvent | undefined) => {
    if (!e) return;

    setTargets((prev: PinInfoInterface[]): PinInfoInterface[] => {
      return [
        {
          title: `pin-${counter.pin}`,
          pop: 0,
          loc: {
            lat: e.latLng?.lat() as number,
            lng: e.latLng?.lng() as number,
          },
        },
        ...prev,
      ];
    });
    setCounter((prev: { pin: number }) => ({
      ...prev,
      pin: prev.pin + 1,
    }));
    setSelected((prev: { asset: string }) => ({
      ...prev,
      asset: `${e.latLng?.lng() as number} ${e.latLng?.lat() as number}`,
    }));
  };

  const targetClicked = (e: google.maps.MapMouseEvent | undefined) => {
    if (!e) return;
    setTargets((prev: PinInfoInterface[]): PinInfoInterface[] => {
      return prev.filter((target: PinInfoInterface) => {
        return (
          target.loc.lng !== (e.latLng?.lng() as number) &&
          target.loc.lat !== (e.latLng?.lat() as number)
        );
      });
    });
  };

  const mapChanged = {
    zoom: () => {
      map &&
        setMapInfo(
          (prev: MapInfoInterface): MapInfoInterface => ({
            ...prev,
            zoom: map.getZoom() as number,
          }),
        );
    },
  };

  return (
    <div className="map-page">
      <GoogleMap
        zoom={mapInfo.zoom}
        center={mapInfo.center}
        mapContainerClassName="map__container"
        mapTypeId={window.google.maps.MapTypeId.HYBRID}
        onLoad={(map: google.maps.Map) => setMap(map)}
        onClick={onClick}
        onZoomChanged={mapChanged.zoom}
      >
        <Marker
          position={mapInfo.center}
          icon={{
            url: pin,
            scaledSize: new window.google.maps.Size(60, 60),
          }}
          animation={window.google.maps.Animation.DROP}
        />
        {targets.map((target) => {
          return (
            <Marker
              key={nanoid()}
              position={target.loc}
              icon={{
                url: modalPin,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              onClick={targetClicked}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default CustomMap;
