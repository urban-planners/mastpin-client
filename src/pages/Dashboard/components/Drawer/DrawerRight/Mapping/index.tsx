import "./MappingDrawer.css";
import { Fragment, useEffect, useState } from "react";
import {
  ConfigurationCheckInterface,
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
  setConfigurationCheck,
  updatePin,
  updateRegion,
} from "../../../../../../redux/actions";
import SpecialInput from "../components/SpecialInput";

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

  const configurationCheck = useSelector(
    (state: any) => state.project.configurationCheck,
  ) as ConfigurationCheckInterface;

  const [configurationState, setConfigurationState] = useState(configuration);
  const [configurationCheckState, setConfigurationCheckState] =
    useState(configurationCheck);
  const [regionState, setRegionState] = useState<RegionInterface>(
    {} as RegionInterface,
  );
  const [pinState, setPinState] = useState<PinInfoInterface>(
    {} as PinInfoInterface,
  );

  useEffect(() => {
    if (selectedRegion)
      setRegionState(
        regions.find((region) => region.id === selectedRegion) ||
          ({} as RegionInterface),
      );
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedPin)
      setPinState(
        pins.find((pin) => pin.id === selectedPin) || ({} as PinInfoInterface),
      );
  }, [selectedPin]);

  useEffect(() => {
    if (Object.keys(regionState).length > 0)
      dispatch(updateRegion(regionState as RegionInterface));
  }, [regionState, dispatch]);

  useEffect(() => {
    if (Object.keys(pinState).length > 0)
      dispatch(updatePin(pinState as PinInfoInterface));
  }, [pinState, dispatch]);

  useEffect(() => {
    dispatch(setConfiguration(configurationState));
  }, [configurationState, dispatch]);

  useEffect(() => {
    dispatch(setConfigurationCheck(configurationCheckState));
  }, [configurationCheckState, dispatch]);

  return (
    <Fragment>
      <div className="scrollable drawer__mapping">
        <div>
          <Title title="Properties" />
          <SubTitle text="Region Properties" />
          <Content emptyText="No properties to show.">
            {Object.keys(regionState).length > 0
              ? [
                  <form
                    className="drawer__form"
                    key={selectedRegion}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <SpecialInput
                      title="Title"
                      value={regionState.title}
                      onchange={(e) =>
                        setRegionState((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      type="text"
                    />
                    <SpecialInput
                      title="Population"
                      value={regionState.population}
                      onchange={(e) =>
                        setRegionState((prev) => ({
                          ...prev,
                          population: /^[0-9]+$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        }))
                      }
                      type="number"
                    />
                    <SpecialInput
                      title="Fill Color"
                      value={regionState.fillColor}
                      onchange={(e) =>
                        setRegionState((prev) => ({
                          ...prev,
                          fillColor: e.target.value,
                        }))
                      }
                      type="color"
                    />
                    <SpecialInput
                      title="Stroke Color"
                      value={regionState.strokeColor}
                      onchange={(e) =>
                        setRegionState((prev) => ({
                          ...prev,
                          strokeColor: e.target.value,
                        }))
                      }
                      type="color"
                    />
                    <button type="submit" hidden>
                      Update
                    </button>
                  </form>,
                ]
              : []}
          </Content>
          <SubTitle text="Pin Properties" />
          <Content emptyText="No properties to show.">
            {Object.keys(pinState).length > 0
              ? [
                  <form
                    className="drawer__form"
                    key={selectedPin}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <SpecialInput
                      title="Title"
                      value={pinState.title}
                      onchange={(e) =>
                        setPinState((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      type="text"
                    />
                    <SpecialInput
                      title="Longitude"
                      value={pinState.loc?.lng}
                      onchange={(e) =>
                        setPinState((prev) => ({
                          ...prev,
                          loc: {
                            ...prev.loc,
                            lng: /^[0-9]*\.{0,1}[0-9]*$/.test(e.target.value)
                              ? e.target.value
                              : 0,
                          },
                        }))
                      }
                      type="number"
                    />
                    <SpecialInput
                      title="Latitude"
                      value={pinState.loc?.lat}
                      onchange={(e) =>
                        setPinState((prev) => ({
                          ...prev,
                          loc: {
                            ...prev.loc,
                            lat: /^[0-9]*\.{0,1}[0-9]*$/.test(e.target.value)
                              ? e.target.value
                              : 0,
                          },
                        }))
                      }
                      type="number"
                    />
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
                <SpecialInput
                  title="Resolution"
                  value={configurationState.resolution}
                  onchange={(e) =>
                    setConfigurationState((prev) => ({
                      ...prev,
                      resolution: /^[0-9]*$/.test(e.target.value)
                        ? e.target.value
                        : 0,
                    }))
                  }
                  type="number"
                />
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
                <SpecialInput
                  title="Specific"
                  value={configurationState.numberOfMasts.specific}
                  onchange={(e) =>
                    setConfigurationState((prev) => ({
                      ...prev,
                      numberOfMasts: {
                        ...prev.numberOfMasts,
                        specific: /^[0-9]+$/.test(e.target.value)
                          ? e.target.value
                          : 0,
                      },
                    }))
                  }
                  type="number"
                  checked={configurationCheckState.numberOfMasts.specific}
                  onCheck={(e) =>
                    setConfigurationCheckState((prev) => ({
                      ...prev,
                      numberOfMasts: {
                        specific: e.target.checked,
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="Minimum"
                  value={configurationState.numberOfMasts.min}
                  onchange={(e) =>
                    setConfigurationState((prev) => ({
                      ...prev,
                      numberOfMasts: {
                        ...prev.numberOfMasts,
                        min: /^[0-9]+$/.test(e.target.value)
                          ? e.target.value
                          : 0,
                      },
                    }))
                  }
                  type="number"
                  checked={!configurationCheckState.numberOfMasts.specific}
                  hideCheckbox={true}
                />
                <SpecialInput
                  title="Maximum"
                  value={configurationState.numberOfMasts.max}
                  onchange={(e) =>
                    setConfigurationState((prev) => ({
                      ...prev,
                      numberOfMasts: {
                        ...prev.numberOfMasts,
                        max: /^[0-9]+$/.test(e.target.value)
                          ? e.target.value
                          : 0,
                      },
                    }))
                  }
                  type="number"
                  checked={!configurationCheckState.numberOfMasts.specific}
                  hideCheckbox={true}
                />
                <SubTitle text="Threshold" />
                <SpecialInput
                  title="Coverage"
                  value={configurationState.threshold.coverage}
                  onchange={(e) =>
                    setConfigurationState((prev) => ({
                      ...prev,
                      threshold: {
                        ...prev.threshold,
                        coverage: /^[0-9]*\.{0,1}[0-9]*$/.test(e.target.value)
                          ? e.target.value
                          : 0,
                      },
                    }))
                  }
                  type="number"
                  checked={configurationCheckState.threshold.coverage}
                  onCheck={(e) =>
                    setConfigurationCheckState((prev) => ({
                      ...prev,
                      threshold: {
                        ...prev.threshold,
                        coverage: e.target.checked,
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="Signal Strength"
                  value={configurationState.threshold.signalStrength}
                  onchange={(e) =>
                    setConfigurationState((prev) => ({
                      ...prev,
                      threshold: {
                        ...prev.threshold,
                        signalStrength: /^-*[0-9]+$/.test(e.target.value)
                          ? e.target.value
                          : 0,
                      },
                    }))
                  }
                  type="number"
                  checked={configurationCheckState.threshold.signalStrength}
                  onCheck={(e) =>
                    setConfigurationCheckState((prev) => ({
                      ...prev,
                      threshold: {
                        ...prev.threshold,
                        signalStrength: e.target.checked,
                      },
                    }))
                  }
                />
                <label className="drawer__form__label drawer__special__input load__variance__label">
                  <input
                    className="drawer__form__checkbox"
                    checked={
                      !configurationCheckState.numberOfMasts.specific &&
                      configurationState.threshold.loadVariance
                    }
                    onChange={(e) =>
                      setConfigurationState((prev) => ({
                        ...prev,
                        threshold: {
                          ...prev.threshold,
                          loadVariance: e.target.checked,
                        },
                      }))
                    }
                    type="checkbox"
                    disabled={configurationCheckState.numberOfMasts.specific}
                  />
                  Load Variance
                </label>
                <SubTitle text="Hata Parameters" />
                <SpecialInput
                  title="Mast Range (km)"
                  value={configurationState.hataParameters.mastRange}
                  onchange={(e) =>
                    setConfigurationState((prev) => ({
                      ...prev,
                      hataParameters: {
                        ...prev.hataParameters,
                        mastRange: /^[0-9]*\.{0,1}[0-9]*$/.test(e.target.value)
                          ? e.target.value
                          : 0,
                      },
                    }))
                  }
                  type="number"
                />
                <SpecialInput
                  title="Mast Height"
                  value={configurationState.hataParameters.mastHeight}
                  onchange={(e) =>
                    setConfigurationState((prev) => ({
                      ...prev,
                      hataParameters: {
                        ...prev.hataParameters,
                        mastHeight: /^[0-9]*\.{0,1}[0-9]*$/.test(e.target.value)
                          ? e.target.value
                          : 0,
                      },
                    }))
                  }
                  type="number"
                />
                <SpecialInput
                  title="Mast Frequency"
                  value={configurationState.hataParameters.mastFrequency}
                  onchange={(e) =>
                    setConfigurationState((prev) => ({
                      ...prev,
                      hataParameters: {
                        ...prev.hataParameters,
                        mastFrequency: /^[0-9]*\.{0,1}[0-9]*$/.test(
                          e.target.value,
                        )
                          ? e.target.value
                          : 0,
                      },
                    }))
                  }
                  type="number"
                />
                <SpecialInput
                  title="Mast EIRP"
                  value={configurationState.hataParameters.mastEirp}
                  onchange={(e) =>
                    setConfigurationState((prev) => ({
                      ...prev,
                      hataParameters: {
                        ...prev.hataParameters,
                        mastEirp: /^[0-9]*\.{0,1}[0-9]*$/.test(e.target.value)
                          ? e.target.value
                          : 0,
                      },
                    }))
                  }
                  type="number"
                />
                <SpecialInput
                  title="Receiver Height"
                  value={configurationState.hataParameters.receiverHeight}
                  onchange={(e) =>
                    setConfigurationState((prev) => ({
                      ...prev,
                      hataParameters: {
                        ...prev.hataParameters,
                        receiverHeight: /^[0-9]*\.{0,1}[0-9]*$/.test(
                          e.target.value,
                        )
                          ? e.target.value
                          : 0,
                      },
                    }))
                  }
                  type="number"
                />
                <SpecialInput
                  title="SS Cap"
                  value={configurationState.hataParameters.ssCap}
                  onchange={(e) =>
                    setConfigurationState((prev) => ({
                      ...prev,
                      hataParameters: {
                        ...prev.hataParameters,
                        ssCap: /^-*[0-9]*\.{0,1}[0-9]*$/.test(e.target.value)
                          ? e.target.value
                          : 0,
                      },
                    }))
                  }
                  type="number"
                />
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
