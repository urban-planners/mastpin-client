import "./CustomMap.css";
import { GoogleMap, Marker, Polygon } from "@react-google-maps/api";
import pin from "../../../../assets/svgs/pin.svg";
import modalPin from "../../../../assets/svgs/modal-pin.svg";
import mastPin from "../../../../assets/svgs/mast.svg";
import currentMastPin from "../../../../assets/svgs/CellTower2.svg";
import { Fragment, useState } from "react";
import {
  MapActionType,
  MapInfoInterface,
  PinInfoInterface,
  PresentationInterface,
  RegionInterface,
} from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  addMast,
  addPin,
  removeMast,
  removePin,
  selectRegion,
  setMapAction,
  showMapLabels,
  updateMapZoom,
  updateMast,
  updatePin,
} from "../../../../redux/actions";
import { nanoid } from "nanoid";
import { FaHand, FaMapPin } from "react-icons/fa6";
import { MdCellTower, MdOutlineDocumentScanner } from "react-icons/md";
import ResultOverlay from "../../overlay/ResultOverlay";
import ShareOverlay from "../../overlay/ShareOverlay";

const CustomMap = ({ mapInfo }: { mapInfo: MapInfoInterface }) => {
  const [map, setMap] = useState<google.maps.Map>();
  const dispatch = useDispatch();
  const pins = useSelector(
    (state: any) => state.map.pins,
  ) as PinInfoInterface[];
  const currentMasts = useSelector(
    (state: any) => state.map.currentMasts,
  ) as PinInfoInterface[];
  const selectedRegion = useSelector(
    (state: any) => state.map.selectedRegion,
  ) as string;
  const regions = useSelector(
    (state: any) => state.map.regions,
  ) as RegionInterface[];
  const mapOptions = useSelector(
    (state: any) => state.map.mapInfo.options,
  ) as google.maps.MapOptions;
  const showLabels = useSelector(
    (state: any) => state.map.mapInfo.showLabels,
  ) as boolean;
  const simulation = useSelector(
    (state: any) => state.result.simulation,
  ) as PresentationInterface;
  const selectedMapAction = useSelector(
    (state: any) => state.map.selectedMapAction,
  ) as MapActionType;
  const hasSimulation = useSelector(
    (state: any) => state.result.hasSimulation,
  ) as boolean;
  const hasEvaluation = useSelector(
    (state: any) => state.result.hasEvaluation,
  ) as boolean;
  const showShareDialog = useSelector(
    (state: any) => state.project.showShareDialog,
  ) as boolean;

  const onClick = (e: google.maps.MapMouseEvent | undefined) => {
    if (!e) return;
    if (selectedMapAction === "pin")
      dispatch(
        addPin({
          title: "",
          id: nanoid(),
          regionId: selectedRegion,
          loc: {
            lat: e.latLng?.lat() as number,
            lng: e.latLng?.lng() as number,
          },
        }),
      );
    if (selectedMapAction === "mast")
      dispatch(
        addMast({
          title: "",
          id: nanoid(),
          regionId: selectedRegion,
          loc: {
            lat: e.latLng?.lat() as number,
            lng: e.latLng?.lng() as number,
          },
        }),
      );
  };

  const mapChanged = {
    zoom: () => {
      map && dispatch(updateMapZoom(map.getZoom() as number));
    },
  };

  return (
    <div className="map-page">
      {selectedRegion && (
        <span className="selected__region-title">
          {regions.find((region) => region.id === selectedRegion)?.title}
        </span>
      )}
      <label className="show__landmarks-label">
        Show Landmarks
        <input
          type="checkbox"
          checked={showLabels}
          onChange={() => dispatch(showMapLabels(!showLabels))}
        />
      </label>
      {selectedMapAction === "doc" && <ResultOverlay />}
      {showShareDialog && <ShareOverlay />}
      <GoogleMap
        zoom={mapInfo.zoom}
        center={mapInfo.center}
        mapContainerClassName="map__container"
        mapTypeId={window.google.maps.MapTypeId.HYBRID}
        onLoad={(map: google.maps.Map) => setMap(map)}
        onClick={onClick}
        onZoomChanged={mapChanged.zoom}
        clickableIcons={false}
        options={{
          ...mapOptions,
          draggableCursor: (() => {
            let cursor = "grab";
            if (selectedMapAction === "pin") return "crosshair";
            if (selectedMapAction === "mast") return "cell";
            return cursor;
          })(),
          styles: !showLabels
            ? [
                {
                  featureType: "all",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }],
                },
              ]
            : undefined,
        }}
      >
        <Marker
          position={mapInfo.center}
          icon={{
            url: pin,
            scaledSize: new window.google.maps.Size(showLabels ? 60 : 0, 60),
          }}
          animation={window.google.maps.Animation.DROP}
        />
        {pins.map((pin, index) => {
          return (
            <Marker
              key={index}
              position={pin.loc}
              icon={{
                url: modalPin,
                scaledSize: new window.google.maps.Size(25, 25),
              }}
              onClick={() => dispatch(removePin(pin.id))}
              draggable={true}
              onDrag={(e) => {
                dispatch(
                  updatePin({
                    ...pin,
                    loc: {
                      lat: e.latLng?.lat() as number,
                      lng: e.latLng?.lng() as number,
                    },
                  }),
                );
              }}
              onDragEnd={(e) => {
                dispatch(
                  updatePin({
                    ...pin,
                    loc: {
                      lat: e.latLng?.lat() as number,
                      lng: e.latLng?.lng() as number,
                    },
                  }),
                );
              }}
            />
          );
        })}
        {currentMasts.map((mast, index) => {
          return (
            <Marker
              key={index}
              position={mast.loc}
              icon={{
                url: currentMastPin,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              onClick={() => dispatch(removeMast(mast.id))}
              draggable={true}
              onDrag={(e) => {
                dispatch(
                  updateMast({
                    ...mast,
                    loc: {
                      lat: e.latLng?.lat() as number,
                      lng: e.latLng?.lng() as number,
                    },
                  }),
                );
              }}
              onDragEnd={(e) => {
                dispatch(
                  updateMast({
                    ...mast,
                    loc: {
                      lat: e.latLng?.lat() as number,
                      lng: e.latLng?.lng() as number,
                    },
                  }),
                );
              }}
            />
          );
        })}
        {pins.length > 0 && regions.length > 0 && (
          <Fragment>
            {regions.map((region, index) => {
              return (
                <Polygon
                  key={index}
                  path={region.bounds}
                  options={{
                    fillColor: region.fillColor,
                    strokeColor: region.strokeColor,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillOpacity: 0.35,
                  }}
                  onClick={(e) => {
                    e.stop();
                    if (selectedMapAction === "hand")
                      return dispatch(selectRegion(region.id));
                    onClick(e);
                  }}
                />
              );
            })}
          </Fragment>
        )}
        {simulation &&
          simulation.mast_loc_coord &&
          simulation.mast_loc_coord.map((mast, index) => (
            <Marker
              key={index}
              position={{
                lat: mast?.[1] || 0,
                lng: mast?.[0] || 0,
              }}
              icon={{
                url: mastPin,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              options={{
                clickable: false,
                draggable: false,
                optimized: true,
              }}
            />
          ))}
      </GoogleMap>
      <div className="map__actions__container">
        <div
          className={`map__actions__item ${selectedMapAction === "hand" ? "active" : ""}`}
          onClick={() => dispatch(setMapAction("hand"))}
        >
          <FaHand />
        </div>
        <div
          className={`map__actions__item ${selectedMapAction === "pin" ? "active" : ""}`}
          onClick={() => dispatch(setMapAction("pin"))}
        >
          <FaMapPin />
        </div>
        <div
          className={`map__actions__item ${selectedMapAction === "mast" ? "active" : ""}`}
          onClick={() => dispatch(setMapAction("mast"))}
        >
          <MdCellTower />
        </div>
        <div
          className={`map__actions__item ${selectedMapAction === "doc" ? "active" : ""} ${!hasSimulation && !hasEvaluation ? "disabled" : ""}`}
          onClick={() =>
            hasSimulation || hasEvaluation ? dispatch(setMapAction("doc")) : {}
          }
        >
          <MdOutlineDocumentScanner />
        </div>
      </div>
    </div>
  );
};

export default CustomMap;
