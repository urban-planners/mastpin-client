import { FormEvent, useEffect, useState } from "react";
import "../Drawer.css";
import "./DrawerRight.css";
import { PinInfoInterface, RegionInterface } from "../../../../../types";
import Title from "../components/Title";
import Content from "../components/Content";
import { useDispatch, useSelector } from "react-redux";
import SubTitle from "../components/SubTitle";
import { updatePin, updateRegion } from "../../../../../redux/actions";

const DrawerRight = () => {
  const dispatch = useDispatch();

  const selectedPin = useSelector(
    (state: any) => state.map.selectedPin,
  ) as string;
  const selectedRegion = useSelector(
    (state: any) => state.map.selectedRegion,
  ) as string;

  const regions = useSelector(
    (state: any) => state.map.regions,
  ) as RegionInterface[];
  const pins = useSelector(
    (state: any) => state.map.pins,
  ) as PinInfoInterface[];

  const [region, setRegion] = useState<RegionInterface>({
    id: "",
    title: "",
    bounds: [],
    fillColor: "",
    strokeColor: "",
    population: 0,
  });
  const [pin, setPin] = useState<PinInfoInterface>({
    id: "",
    regionId: "",
    title: "",
    loc: {
      lat: 0,
      lng: 0,
    },
  });

  useEffect(() => {
    if (selectedRegion)
      setRegion(
        regions.find((region) => region.id === selectedRegion) ||
          ({} as RegionInterface),
      );
  }, [selectedRegion, regions]);

  useEffect(() => {
    if (selectedPin)
      setPin(
        pins.find((pin) => pin.id === selectedPin) || ({} as PinInfoInterface),
      );
  }, [selectedPin, pins]);

  const updateRegionHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("updateRegionHandler", region);
    dispatch(updateRegion(region));
  };

  const updatePinHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("updatePinHandler", pin);
    dispatch(updatePin(pin));
  };

  return (
    <div className="drawer right">
      <main>
        <Title title="Properties" />
        <SubTitle text="Region Properties" />
        <Content emptyText="No properties to show.">
          {selectedRegion
            ? [
                <form
                  className="drawer__form"
                  key={selectedRegion}
                  onSubmit={updateRegionHandler}
                >
                  <label>
                    Title
                    <input
                      onFocus={(e) => e.target.select()}
                      value={region.title}
                      onChange={(e) =>
                        setRegion((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </label>
                  <label>
                    Population
                    <input
                      onFocus={(e) => e.target.select()}
                      value={region.population}
                      onChange={(e) =>
                        setRegion((prev) => ({
                          ...prev,
                          population: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </label>
                  <label>
                    Fill Color
                    <input
                      onFocus={(e) => e.target.select()}
                      value={region.fillColor}
                      onChange={(e) =>
                        setRegion((prev) => ({
                          ...prev,
                          fillColor: e.target.value,
                        }))
                      }
                    />
                  </label>
                  <label>
                    Stroke Color
                    <input
                      onFocus={(e) => e.target.select()}
                      value={region.strokeColor}
                      onChange={(e) =>
                        setRegion((prev) => ({
                          ...prev,
                          strokeColor: e.target.value,
                        }))
                      }
                    />
                  </label>
                  <button type="submit" hidden>
                    Update
                  </button>
                </form>,
              ]
            : []}
        </Content>
        <SubTitle text="Pin Properties" />
        <Content emptyText="No properties to show.">
          {selectedPin
            ? [
                <form
                  className="drawer__form"
                  key={selectedPin}
                  onSubmit={updatePinHandler}
                >
                  <label>
                    Title
                    <input
                      onFocus={(e) => e.target.select()}
                      value={pin.title}
                      onChange={(e) =>
                        setPin((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </label>
                  <label>
                    Longitude
                    <input
                      onFocus={(e) => e.target.select()}
                      value={pin.loc?.lng}
                      onChange={(e) =>
                        setPin((prev) => ({
                          ...prev,
                          loc: {
                            ...prev.loc,
                            lng: parseFloat(e.target.value),
                          },
                        }))
                      }
                    />
                  </label>
                  <label>
                    Latitude
                    <input
                      onFocus={(e) => e.target.select()}
                      value={pin.loc?.lat}
                      onChange={(e) =>
                        setPin((prev) => ({
                          ...prev,
                          loc: {
                            ...prev.loc,
                            lat: parseFloat(e.target.value),
                          },
                        }))
                      }
                    />
                  </label>
                  <button type="submit" hidden>
                    Update
                  </button>
                </form>,
              ]
            : []}
        </Content>
      </main>
      <div className="landscape__container">
        <label className="landscape__container">
          <small>Preview</small>
          <canvas className="landscape__canvas" />
        </label>
      </div>
    </div>
  );
};

export default DrawerRight;
