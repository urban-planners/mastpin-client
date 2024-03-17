import "./MappingDrawer.css";
import { Fragment } from "react";
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

  const region =
    regions.find((region) => region.id === selectedRegion) ||
    ({} as RegionInterface);

  const pin =
    pins.find((pin) => pin.id === selectedPin) || ({} as PinInfoInterface);

  const configuration = useSelector(
    (state: any) => state.project.configuration,
  ) as ConfigurationInterface;

  const configurationCheck = useSelector(
    (state: any) => state.project.configurationCheck,
  ) as ConfigurationCheckInterface;

  return (
    <Fragment>
      <div className="scrollable drawer__mapping">
        <div>
          <Title title="Properties" />
          <SubTitle text="Region Properties" />
          <Content emptyText="No properties to show.">
            {Object.keys(region).length > 0
              ? [
                  <form
                    className="drawer__form"
                    key={selectedRegion}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <SpecialInput
                      title="Title"
                      value={region.title}
                      onchange={(e) =>
                        dispatch(
                          updateRegion({
                            ...region,
                            title: e.target.value,
                          }),
                        )
                      }
                      type="text"
                    />
                    <SpecialInput
                      title="Population"
                      value={region.population}
                      onchange={(e) =>
                        dispatch(
                          updateRegion({
                            ...region,
                            population: /^[0-9]+$/.test(e.target.value)
                              ? e.target.value
                              : 0,
                          }),
                        )
                      }
                      type="number"
                    />
                    <SpecialInput
                      title="Fill Color"
                      value={region.fillColor}
                      onchange={(e) =>
                        dispatch(
                          updateRegion({
                            ...region,
                            fillColor: e.target.value,
                          }),
                        )
                      }
                      type="color"
                    />
                    <SpecialInput
                      title="Stroke Color"
                      value={region.strokeColor}
                      onchange={(e) =>
                        dispatch(
                          updateRegion({
                            ...region,
                            strokeColor: e.target.value,
                          }),
                        )
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
            {Object.keys(pin).length > 0
              ? [
                  <form
                    className="drawer__form"
                    key={selectedPin}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <SpecialInput
                      title="Title"
                      value={pin.title}
                      onchange={(e) =>
                        dispatch(
                          updatePin({
                            ...pin,
                            title: e.target.value,
                          }),
                        )
                      }
                      type="text"
                    />
                    <SpecialInput
                      title="Longitude"
                      value={pin.loc?.lng}
                      onchange={(e) =>
                        dispatch(
                          updatePin({
                            ...pin,
                            loc: {
                              ...pin.loc,
                              lng: /^[0-9]*\.{0,1}[0-9]*$/.test(e.target.value)
                                ? e.target.value
                                : 0,
                            },
                          }),
                        )
                      }
                      type="number"
                    />
                    <SpecialInput
                      title="Latitude"
                      value={pin.loc?.lat}
                      onchange={(e) =>
                        dispatch(
                          updatePin({
                            ...pin,
                            loc: {
                              ...pin.loc,
                              lat: /^[0-9]*\.{0,1}[0-9]*$/.test(e.target.value)
                                ? e.target.value
                                : 0,
                            },
                          }),
                        )
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
                  value={configuration.resolution}
                  onchange={(e) =>
                    dispatch(
                      setConfiguration({
                        ...configuration,
                        resolution: /^[0-9]*$/.test(e.target.value)
                          ? e.target.value
                          : 0,
                      }),
                    )
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
                <label className="drawer__form__label drawer__special__input load__variance__label">
                  <input
                    className="drawer__form__checkbox"
                    checked={configuration.numberOfMasts.useCurrent}
                    onChange={(e) =>
                      dispatch(
                        setConfiguration({
                          ...configuration,
                          numberOfMasts: {
                            ...configuration.numberOfMasts,
                            useCurrent: e.target.checked,
                          },
                        }),
                      )
                    }
                    type="checkbox"
                  />
                  Use existing masts
                </label>
                <SpecialInput
                  title="Specific"
                  value={configuration.numberOfMasts.specific}
                  onchange={(e) =>
                    dispatch(
                      setConfiguration({
                        ...configuration,
                        numberOfMasts: {
                          ...configuration.numberOfMasts,
                          specific: /^[0-9]+$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  type="number"
                  checked={configurationCheck.numberOfMasts.specific}
                  onCheck={(e) =>
                    dispatch(
                      setConfigurationCheck({
                        ...configurationCheck,
                        numberOfMasts: {
                          specific: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="Minimum"
                  value={configuration.numberOfMasts.min}
                  onchange={(e) =>
                    dispatch(
                      setConfiguration({
                        ...configuration,
                        numberOfMasts: {
                          ...configuration.numberOfMasts,
                          min: /^[0-9]+$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  type="number"
                  checked={!configurationCheck.numberOfMasts.specific}
                  hideCheckbox={true}
                />
                <SpecialInput
                  title="Maximum"
                  value={configuration.numberOfMasts.max}
                  onchange={(e) =>
                    dispatch(
                      setConfiguration({
                        ...configuration,
                        numberOfMasts: {
                          ...configuration.numberOfMasts,
                          max: /^[0-9]+$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  type="number"
                  checked={!configurationCheck.numberOfMasts.specific}
                  hideCheckbox={true}
                />
                <SubTitle text="Threshold" />
                <SpecialInput
                  title="Coverage"
                  value={configuration.threshold.coverage}
                  onchange={(e) =>
                    dispatch(
                      setConfiguration({
                        ...configuration,
                        threshold: {
                          ...configuration.threshold,
                          coverage: /^[0-9]*\.{0,1}[0-9]*$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  type="number"
                  checked={configurationCheck.threshold.coverage}
                  onCheck={(e) =>
                    dispatch(
                      setConfigurationCheck({
                        ...configurationCheck,
                        threshold: {
                          ...configurationCheck.threshold,
                          coverage: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="Signal Strength"
                  value={configuration.threshold.signalStrength}
                  onchange={(e) =>
                    dispatch(
                      setConfiguration({
                        ...configuration,
                        threshold: {
                          ...configuration.threshold,
                          signalStrength: /^-*[0-9]+$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  type="number"
                  checked={configurationCheck.threshold.signalStrength}
                  onCheck={(e) =>
                    dispatch(
                      setConfigurationCheck({
                        ...configurationCheck,
                        threshold: {
                          ...configurationCheck.threshold,
                          signalStrength: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <label className="drawer__form__label drawer__special__input load__variance__label">
                  <input
                    className="drawer__form__checkbox"
                    checked={
                      !configurationCheck.numberOfMasts.specific &&
                      configuration.threshold.loadVariance
                    }
                    onChange={(e) =>
                      dispatch(
                        setConfiguration({
                          ...configuration,
                          threshold: {
                            ...configuration.threshold,
                            loadVariance: e.target.checked,
                          },
                        }),
                      )
                    }
                    type="checkbox"
                    disabled={configurationCheck.numberOfMasts.specific}
                  />
                  Load Variance
                </label>
                <SubTitle text="Hata Parameters" />
                <SpecialInput
                  title="Mast Range (km)"
                  value={configuration.hataParameters.mastRange}
                  onchange={(e) =>
                    dispatch(
                      setConfiguration({
                        ...configuration,
                        hataParameters: {
                          ...configuration.hataParameters,
                          mastRange: /^[0-9]*\.{0,1}[0-9]*$/.test(
                            e.target.value,
                          )
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  type="number"
                />
                <SpecialInput
                  title="Mast Height"
                  value={configuration.hataParameters.mastHeight}
                  onchange={(e) =>
                    dispatch(
                      setConfiguration({
                        ...configuration,
                        hataParameters: {
                          ...configuration.hataParameters,
                          mastHeight: /^[0-9]*\.{0,1}[0-9]*$/.test(
                            e.target.value,
                          )
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  type="number"
                />
                <SpecialInput
                  title="Mast Frequency"
                  value={configuration.hataParameters.mastFrequency}
                  onchange={(e) =>
                    dispatch(
                      setConfiguration({
                        ...configuration,
                        hataParameters: {
                          ...configuration.hataParameters,
                          mastFrequency: /^[0-9]*\.{0,1}[0-9]*$/.test(
                            e.target.value,
                          )
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  type="number"
                />
                <SpecialInput
                  title="Mast EIRP"
                  value={configuration.hataParameters.mastEirp}
                  onchange={(e) =>
                    dispatch(
                      setConfiguration({
                        ...configuration,
                        hataParameters: {
                          ...configuration.hataParameters,
                          mastEirp: /^[0-9]*\.{0,1}[0-9]*$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  type="number"
                />
                <SpecialInput
                  title="Receiver Height"
                  value={configuration.hataParameters.receiverHeight}
                  onchange={(e) =>
                    dispatch(
                      setConfiguration({
                        ...configuration,
                        hataParameters: {
                          ...configuration.hataParameters,
                          receiverHeight: /^[0-9]*\.{0,1}[0-9]*$/.test(
                            e.target.value,
                          )
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  type="number"
                />
                <SpecialInput
                  title="SS Cap"
                  value={configuration.hataParameters.ssCap}
                  onchange={(e) =>
                    dispatch(
                      setConfiguration({
                        ...configuration,
                        hataParameters: {
                          ...configuration.hataParameters,
                          ssCap: /^-*[0-9]*\.{0,1}[0-9]*$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  type="number"
                />
                <label className="drawer__form__label">
                  City Size
                  <select
                    value={configuration.hataParameters.citySize}
                    onChange={(e) =>
                      dispatch(
                        setConfiguration({
                          ...configuration,
                          hataParameters: {
                            ...configuration.hataParameters,
                            citySize: e.target.value as
                              | "small"
                              | "medium"
                              | "large",
                          },
                        }),
                      )
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
