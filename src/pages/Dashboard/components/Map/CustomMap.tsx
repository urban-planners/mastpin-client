import "./CustomMap.css";
import {
  GoogleMap,
  Marker,
  Polygon,
  HeatmapLayer,
} from "@react-google-maps/api";
import modalPin from "../../../../assets/svgs/modal-pin.svg";
import mastPin from "../../../../assets/svgs/mast.svg";
import currentMastPin from "../../../../assets/svgs/CellTower2.svg";
import { Fragment, useState } from "react";
import {
  MapActionType,
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
import ExportOverlay from "../../overlay/ExportOverlay";

const CustomMap = () => {
  const mapZoom = useSelector(
    (state: any) => state.map.present.mapInfo.zoom,
  ) as number;
  const mapCenter = useSelector(
    (state: any) => state.map.present.mapInfo.center,
  ) as google.maps.LatLngLiteral;
  const [map, setMap] = useState<google.maps.Map>();
  const dispatch = useDispatch();
  const pins = useSelector(
    (state: any) => state.map.present.pins,
  ) as PinInfoInterface[];
  const currentMasts = useSelector(
    (state: any) => state.map.present.currentMasts,
  ) as PinInfoInterface[];
  const selectedRegion = useSelector(
    (state: any) => state.map.present.selectedRegion,
  ) as string;
  const regions = useSelector(
    (state: any) => state.map.present.regions,
  ) as RegionInterface[];
  const mapOptions = useSelector(
    (state: any) => state.map.present.mapInfo.options,
  ) as google.maps.MapOptions;
  const showLabels = useSelector(
    (state: any) => state.map.present.mapInfo.showLabels,
  ) as boolean;
  const simulation = useSelector(
    (state: any) => state.result.simulation,
  ) as PresentationInterface;
  const selectedMapAction = useSelector(
    (state: any) => state.map.present.selectedMapAction,
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
  const showExportDialog = useSelector(
    (state: any) => state.project.showExportDialog,
  ) as boolean;
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showRegions, setShowRegions] = useState(true);
  const [showGeneratedMasts, setShowGeneratedMasts] = useState(true);
  const [showExistingMasts, setShowExistingMasts] = useState(true);

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
    center: () => {
      // map &&
      //   map.getCenter() &&
      // dispatch(
      //   updateMapCenter(
      //     map.getCenter()?.toJSON() as google.maps.LatLngLiteral,
      //   ),
      // );
      // console.log(map.getCenter()?.toJSON() as google.maps.LatLngLiteral);
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
      <label className="show__heatmap-label">
        Show Heatmap
        <input
          type="checkbox"
          checked={showHeatmap}
          onChange={() => setShowHeatmap(!showHeatmap)}
        />
      </label>
      <label className="show__heatmap-label" style={{ top: "140px" }}>
        Show Regions
        <input
          type="checkbox"
          checked={showRegions}
          onChange={() => setShowRegions(!showRegions)}
        />
      </label>
      <label className="show__heatmap-label" style={{ top: "170px" }}>
        Show Generated Masts
        <input
          type="checkbox"
          checked={showGeneratedMasts}
          onChange={() => setShowGeneratedMasts(!showGeneratedMasts)}
        />
      </label>
      <label className="show__heatmap-label" style={{ top: "200px" }}>
        Show Existing Masts
        <input
          type="checkbox"
          checked={showExistingMasts}
          onChange={() => setShowExistingMasts(!showExistingMasts)}
        />
      </label>
      {selectedMapAction === "doc" && <ResultOverlay />}
      {showShareDialog && <ShareOverlay />}
      {showExportDialog && <ExportOverlay />}
      {}
      <GoogleMap
        zoom={mapZoom}
        center={mapCenter}
        mapContainerClassName="map__container"
        id="map"
        mapTypeId={window.google.maps.MapTypeId.HYBRID}
        onLoad={(map: google.maps.Map) => setMap(map)}
        onClick={onClick}
        onZoomChanged={mapChanged.zoom}
        onCenterChanged={mapChanged.center}
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
        {showRegions &&
          pins.map((pin, index) => {
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
        {showExistingMasts &&
          currentMasts.map((mast, index) => {
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
        {showRegions && pins.length > 0 && regions.length > 0 && (
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
        {showHeatmap && simulation && simulation.heatmap_data && (
          <HeatmapLayer
            data={simulation.heatmap_data.map((point) => ({
              location: new window.google.maps.LatLng(point.lat, point.lng),
              weight: Math.max(0, point.weight + 120),
            }))}
            options={{
              radius: 10,
              opacity: 0.8,
              maxIntensity: 60,
              dissipating: true,
              gradient: [
                "rgba(0, 255, 255, 0)",
                "rgba(0, 255, 255, 1)",
                "rgba(0, 191, 255, 1)",
                "rgba(0, 127, 255, 1)",
                "rgba(0, 63, 255, 1)",
                "rgba(0, 0, 255, 1)",
                "rgba(0, 0, 223, 1)",
                "rgba(0, 0, 191, 1)",
                "rgba(0, 0, 159, 1)",
                "rgba(0, 0, 127, 1)",
                "rgba(63, 0, 91, 1)",
                "rgba(127, 0, 63, 1)",
                "rgba(191, 0, 31, 1)",
                "rgba(255, 0, 0, 1)",
              ],
            }}
          />
        )}
        {showGeneratedMasts &&
          simulation &&
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
