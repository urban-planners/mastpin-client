import "./CustomMap.css";
import { GoogleMap, Marker, Polygon } from "@react-google-maps/api";
import pin from "../../assets/svgs/pin.svg";
import modalPin from "../../assets/svgs/modal-pin.svg";
import { Fragment, useState } from "react";
import {
  MapInfoInterface,
  PinInfoInterface,
  RegionInterface,
} from "../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  addPin,
  removePin,
  showMapLabels,
  updateMapZoom,
  updatePinLocation,
} from "../../redux/actions";

const CustomMap = ({ mapInfo }: { mapInfo: MapInfoInterface }) => {
  const [map, setMap] = useState<google.maps.Map>();
  const dispatch = useDispatch();
  const pins = useSelector(
    (state: any) => state.map.pins,
  ) as PinInfoInterface[];
  const selectedRegion = useSelector(
    (state: any) => state.map.selectedRegion,
  ) as RegionInterface;
  const regions = useSelector(
    (state: any) => state.map.regions,
  ) as RegionInterface[];
  const mapOptions = useSelector(
    (state: any) => state.map.mapInfo.options,
  ) as google.maps.MapOptions;
  const showLabels = useSelector(
    (state: any) => state.map.mapInfo.showLabels,
  ) as boolean;

  const onClick = (e: google.maps.MapMouseEvent | undefined) => {
    if (!e) return;
    dispatch(
      addPin({
        region: selectedRegion.title,
        title: "",
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
      {selectedRegion.title && (
        <span className="selected__region-title">{selectedRegion.title}</span>
      )}
      <label className="show__landmarks-label">
        Show Landmarks
        <input
          type="checkbox"
          checked={showLabels}
          onChange={() => dispatch(showMapLabels(!showLabels))}
        />
      </label>
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
              onClick={() => dispatch(removePin(pin.title))}
              draggable={true}
              onDrag={(e) => {
                dispatch(
                  updatePinLocation({
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
                  updatePinLocation({
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
        {pins.length > 0 && regions.length > 0 && (
          <Fragment>
            {regions.map((region, index) => {
              const regionPins = pins.filter(
                (pin) => pin.region === region.title,
              );
              const hull = computeConvexHull(regionPins.map((pin) => pin.loc));
              return (
                <Polygon
                  key={index}
                  path={hull}
                  options={{
                    fillColor: region.fillColor,
                    strokeColor: region.strokeColor,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillOpacity: 0.35,
                  }}
                />
              );
            })}
          </Fragment>
        )}
      </GoogleMap>
    </div>
  );
};

export default CustomMap;

function computeConvexHull(
  points: google.maps.LatLngLiteral[],
): google.maps.LatLngLiteral[] {
  if (points.length <= 3) {
    return points;
  }

  const sortedPoints = points.sort((a, b) => a.lat - b.lat || a.lng - b.lng);

  const getNextPointIndex = (current: number): number => {
    let next = (current + 1) % points.length;
    for (let i = 0; i < points.length; i++) {
      if (
        orientation(
          sortedPoints[current],
          sortedPoints[i],
          sortedPoints[next],
        ) === 2
      ) {
        next = i;
      }
    }
    return next;
  };

  const hull: google.maps.LatLngLiteral[] = [];
  let currentPoint = 0;
  do {
    hull.push(sortedPoints[currentPoint]);
    currentPoint = getNextPointIndex(currentPoint);
  } while (currentPoint !== 0);

  return hull;
}

function orientation(
  p: google.maps.LatLngLiteral,
  q: google.maps.LatLngLiteral,
  r: google.maps.LatLngLiteral,
): number {
  const val =
    (q.lng - p.lng) * (r.lat - q.lat) - (q.lat - p.lat) * (r.lng - q.lng);
  if (val === 0) {
    return 0; // colinear
  }
  return val > 0 ? 1 : 2; // clock or counterclock wise
}
