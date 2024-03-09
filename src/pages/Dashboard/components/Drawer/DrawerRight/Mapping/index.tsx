import "./MappingDrawer.css";
import { FormEvent, Fragment, useEffect, useState } from "react";
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

  const [configurationState, setConfigurationState] = useState(configuration);
  const [configurationCheckState, setConfigurationCheckState] =
    useState(configurationCheck);

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
                    <SpecialInput
                      title="Title"
                      value={region.title}
                      onchange={(e) =>
                        setRegion((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      type="text"
                    />
                    <SpecialInput
                      title="Population"
                      value={region.population}
                      onchange={(e) =>
                        setRegion((prev) => ({
                          ...prev,
                          population: parseInt(e.target.value) || 0,
                        }))
                      }
                      type="number"
                    />
                    <SpecialInput
                      title="Fill Color"
                      value={region.fillColor}
                      onchange={(e) =>
                        setRegion((prev) => ({
                          ...prev,
                          fillColor: e.target.value,
                        }))
                      }
                      type="text"
                    />
                    <SpecialInput
                      title="Stroke Color"
                      value={region.strokeColor}
                      onchange={(e) =>
                        setRegion((prev) => ({
                          ...prev,
                          strokeColor: e.target.value,
                        }))
                      }
                      type="text"
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
            {selectedPin
              ? [
                  <form
                    className="drawer__form"
                    key={selectedPin}
                    onSubmit={updatePinHandler}
                  >
                    <SpecialInput
                      title="Title"
                      value={pin.title}
                      onchange={(e) =>
                        setPin((prev) => ({ ...prev, title: e.target.value }))
                      }
                      type="text"
                    />
                    <SpecialInput
                      title="Longitude"
                      value={pin.loc?.lng}
                      onchange={(e) =>
                        setPin((prev) => ({
                          ...prev,
                          loc: { ...prev.loc, lng: parseFloat(e.target.value) },
                        }))
                      }
                      type="number"
                    />
                    <SpecialInput
                      title="Latitude"
                      value={pin.loc?.lat}
                      onchange={(e) =>
                        setPin((prev) => ({
                          ...prev,
                          loc: { ...prev.loc, lat: parseFloat(e.target.value) },
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
                      resolution: parseInt(e.target.value),
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
                        specific: parseInt(e.target.value),
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
                        min: parseInt(e.target.value),
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
                        max: parseInt(e.target.value),
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
                        coverage: parseFloat(e.target.value),
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
                        signalStrength: parseInt(e.target.value),
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
                <SubTitle text="Hata Parameters" />
                <SpecialInput
                  title="Mast Range"
                  value={configurationState.hataParameters.mastRange}
                  onchange={(e) =>
                    setConfigurationState((prev) => ({
                      ...prev,
                      hataParameters: {
                        ...prev.hataParameters,
                        mastRange: parseInt(e.target.value),
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
                        mastHeight: parseFloat(e.target.value),
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
                        mastFrequency: parseFloat(e.target.value),
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
                        mastEirp: parseInt(e.target.value),
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
                        receiverHeight: parseFloat(e.target.value),
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
                        ssCap: parseFloat(e.target.value),
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
