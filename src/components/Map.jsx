import "./Map.css"
import { GoogleMap, Marker } from "@react-google-maps/api";
import pin from "../assets/svgs/pin.svg"
import modalPin from "../assets/svgs/modal-pin.svg"
import { nanoid } from "nanoid";
import { useState } from "react";

const Map = ({ 
  mapInfo, setMapInfo, 
  targets, setTargets, 
  counter, setCounter,
  setSelected
}) => {
  const [map, setMap] = useState();

  const onClick = (e) => {
    setTargets(prev => ([
      {
        title: `pin-${counter.pin}`,
        pop: 0,
        loc: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        }
      },
      ...prev,
    ]))
    setCounter(prev => ({
      ...prev,
      pin: prev.pin + 1
    }))
    setSelected(prev => ({
      ...prev,
      asset: `${e.latLng.lng()} ${e.latLng.lat()}`
    }))
  }

  const targetClicked = (e) => {
    setTargets(prev => {
      return prev.filter(target => {
        return target.loc.lng !== e.latLng.lng() && 
          target.loc.lat !== e.latLng.lat()
      })
    });
  }

  const mapChanged = {
    zoom: () => {
      map && setMapInfo(prev => ({
        ...prev,
        zoom: map.getZoom()
      }));
    }
  }

  return (
    <div className='map-page'>
        <GoogleMap 
          zoom={mapInfo.zoom} 
          center={mapInfo.center} 
          mapContainerClassName="map__container"
          mapTypeId={window.google.maps.MapTypeId.HYBRID}
          onLoad={(map) => setMap(map)}
          onClick={onClick}
          onZoomChanged={mapChanged.zoom}>
            <Marker 
              position={mapInfo.center}
              icon={{
                url: pin,
                scaledSize: new window.google.maps.Size(60, 60)
              }}
              animation={window.google.maps.Animation.DROP}
            />
            {
              targets.map(target => {
                return (
                  <Marker 
                    key={nanoid()}
                    position={target.loc}
                    icon={{
                      url: modalPin,
                      scaledSize: new window.google.maps.Size(40, 40)
                    }}
                    onClick={targetClicked}
                  />
                )
              })
            }
        </GoogleMap>
    </div>
  )
}

export default Map