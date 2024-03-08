import "./MappingDrawer.css";
import { FormEvent, Fragment, useEffect, useState } from "react";
import {
  ConfigurationInterface,
  PinInfoInterface,
  RegionInterface,
} from "../../../../../../types";
import Title from "../../components/Title";
import Content from "../../components/Content";
import { useDispatch, useSelector } from "react-redux";
import SubTitle from "../../components/SubTitle";
import {
  setConfiguration,
  setMapResolution,
  updatePin,
  updateRegion,
} from "../../../../../../redux/actions";

const MappingDrawer = () => {
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

  const configuration = useSelector(
    (state: any) => state.project.configuration,
  ) as ConfigurationInterface;

  const resolution = useSelector(
    (state: any) => state.map.resolution,
  ) as number;

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
    dispatch(updateRegion(region));
  };

  const updatePinHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updatePin(pin));
  };

  const [configurationState, setConfigurationState] = useState(configuration);

  useEffect(() => {
    dispatch(setConfiguration(configurationState));
  }, [configurationState]);

  return (
    <Fragment>
      <div className="scrollable drawer__mapping">
        <div>
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
          <Title title="Image Configurations" />
          <SubTitle text="Image" />
          <Content style={{ flex: "unset", height: 76, minHeight: "unset" }}>
            {[
              <form
                className="drawer__form"
                onSubmit={(e) => e.preventDefault()}
                key={"resolution"}
              >
                <label className="drawer__form__label">
                  Resolution
                  <input
                    value={resolution}
                    type="number"
                    onChange={(e) =>
                      dispatch(setMapResolution(parseInt(e.target.value)))
                    }
                  />
                </label>
              </form>,
            ]}
          </Content>
          <Title title="Mast Configurations" />
          <Content>
            {[
              <form
                className="drawer__form technical__drawer"
                onSubmit={(e) => e.preventDefault()}
                key={"configurations"}
              >
                <SubTitle text="Number of Masts" />
                <label className="drawer__form__label">
                  Specific
                  <input
                    value={configurationState.numberOfMasts.specific}
                    type="number"
                    onChange={(e) =>
                      setConfigurationState((prev) => ({
                        ...prev,
                        numberOfMasts: {
                          ...prev.numberOfMasts,
                          specific: parseInt(e.target.value),
                        },
                      }))
                    }
                  />
                </label>
                <label className="drawer__form__label">
                  Minimum
                  <input
                    value={configurationState.numberOfMasts.min}
                    type="number"
                    onChange={(e) =>
                      setConfigurationState((prev) => ({
                        ...prev,
                        numberOfMasts: {
                          ...prev.numberOfMasts,
                          min: parseInt(e.target.value),
                        },
                      }))
                    }
                  />
                </label>
                <label className="drawer__form__label">
                  Maximum
                  <input
                    value={configurationState.numberOfMasts.max}
                    type="number"
                    onChange={(e) =>
                      setConfigurationState((prev) => ({
                        ...prev,
                        numberOfMasts: {
                          ...prev.numberOfMasts,
                          max: parseInt(e.target.value),
                        },
                      }))
                    }
                  />
                </label>
                <SubTitle text="Threshold" />
                <label className="drawer__form__label">
                  Coverage
                  <input
                    value={configurationState.threshold.coverage}
                    type="number"
                    onChange={(e) =>
                      setConfigurationState((prev) => ({
                        ...prev,
                        threshold: {
                          ...prev.threshold,
                          coverage: parseFloat(e.target.value),
                        },
                      }))
                    }
                  />
                </label>
                <label className="drawer__form__label">
                  Signal Strength
                  <input
                    value={configurationState.threshold.signalStrength}
                    type="number"
                    onChange={(e) =>
                      setConfigurationState((prev) => ({
                        ...prev,
                        threshold: {
                          ...prev.threshold,
                          signalStrength: parseInt(e.target.value),
                        },
                      }))
                    }
                  />
                </label>
                <SubTitle text="Hata Parameters" />
                <label className="drawer__form__label">
                  Mast Range
                  <input
                    value={configurationState.hataParameters.mastRange}
                    type="number"
                    onChange={(e) =>
                      setConfigurationState((prev) => ({
                        ...prev,
                        hataParameters: {
                          ...prev.hataParameters,
                          mastRange: parseInt(e.target.value),
                        },
                      }))
                    }
                  />
                </label>
                <label className="drawer__form__label">
                  Mast Height
                  <input
                    value={configurationState.hataParameters.mastHeight}
                    type="number"
                    onChange={(e) =>
                      setConfigurationState((prev) => ({
                        ...prev,
                        hataParameters: {
                          ...prev.hataParameters,
                          mastHeight: parseFloat(e.target.value),
                        },
                      }))
                    }
                  />
                </label>
                <label className="drawer__form__label">
                  Mast Frequency
                  <input
                    value={configurationState.hataParameters.mastFrequency}
                    type="number"
                    onChange={(e) =>
                      setConfigurationState((prev) => ({
                        ...prev,
                        hataParameters: {
                          ...prev.hataParameters,
                          mastFrequency: parseFloat(e.target.value),
                        },
                      }))
                    }
                  />
                </label>
                <label className="drawer__form__label">
                  Mast EIRP
                  <input
                    value={configurationState.hataParameters.mastEirp}
                    type="number"
                    onChange={(e) =>
                      setConfigurationState((prev) => ({
                        ...prev,
                        hataParameters: {
                          ...prev.hataParameters,
                          mastEirp: parseInt(e.target.value),
                        },
                      }))
                    }
                  />
                </label>
                <label className="drawer__form__label">
                  Receiver Height
                  <input
                    value={configurationState.hataParameters.receiverHeight}
                    type="number"
                    onChange={(e) =>
                      setConfigurationState((prev) => ({
                        ...prev,
                        hataParameters: {
                          ...prev.hataParameters,
                          receiverHeight: parseFloat(e.target.value),
                        },
                      }))
                    }
                  />
                </label>
                <label className="drawer__form__label">
                  SS Cap
                  <input
                    value={configurationState.hataParameters.ssCap}
                    type="number"
                    onChange={(e) =>
                      setConfigurationState((prev) => ({
                        ...prev,
                        hataParameters: {
                          ...prev.hataParameters,
                          ssCap: parseFloat(e.target.value),
                        },
                      }))
                    }
                  />
                </label>
                <label className="drawer__form__label">
                  City Size
                  <select
                    value={configurationState.hataParameters.citySize}
                    onChange={(e) =>
                      setConfigurationState((prev) => ({
                        ...prev,
                        hataParameters: {
                          ...prev.hataParameters,
                          citySize: e.target.value as
                            | "small"
                            | "medium"
                            | "large",
                        },
                      }))
                    }
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </label>
                <br />
              </form>,
            ]}
          </Content>
        </div>
      </div>
    </Fragment>
  );
};

export default MappingDrawer;
