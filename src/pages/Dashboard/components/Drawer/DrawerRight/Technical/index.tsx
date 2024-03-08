import "./TechnicalDrawer.css";
import { Fragment } from "react/jsx-runtime";
import Title from "../../components/Title";
import Content from "../../components/Content";
import { ConfigurationInterface } from "../../../../../../types";
import { useDispatch, useSelector } from "react-redux";
import SubTitle from "../../components/SubTitle";
import {
  setConfiguration,
  setMapResolution,
} from "../../../../../../redux/actions";
import { useEffect, useState } from "react";

const TechnicalDrawer = () => {
  const dispatch = useDispatch();
  const configuration = useSelector(
    (state: any) => state.project.configuration,
  ) as ConfigurationInterface;

  const resolution = useSelector(
    (state: any) => state.map.resolution,
  ) as number;

  const [configurationState, setConfigurationState] = useState(configuration);

  useEffect(() => {
    dispatch(setConfiguration(configurationState));
  }, [configurationState]);

  return (
    <Fragment>
      <Title title="Optimization" />
      <Content>
        {[
          <form
            className="drawer__form technical__drawer"
            onSubmit={(e) => e.preventDefault()}
            key={"optimization"}
          >
            <SubTitle text="Algorithm" />
            <label className="drawer__form__label">
              Algorithm
              <select
                value={configurationState.algorithm}
                onChange={(e) =>
                  setConfigurationState((prev) => ({
                    ...prev,
                    algorithm: e.target.value as "pso" | "ga",
                  }))
                }
              >
                <option value="pso">Particle Swarm Optimization</option>
                <option value="ga">Genetic Algorithm</option>
              </select>
            </label>
            <SubTitle text="Initial Parameters" />
            <label className="drawer__form__label">
              Swarm Size
              <input
                value={configurationState.initParameters.swarmSize}
                type="number"
                onChange={(e) =>
                  setConfigurationState((prev) => ({
                    ...prev,
                    initParameters: {
                      ...prev.initParameters,
                      swarmSize: parseInt(e.target.value),
                    },
                  }))
                }
              />
            </label>
            <SubTitle text="Run Parameters" />
            <label className="drawer__form__label">
              Max Iterations
              <input
                value={configurationState.runParameters.maxIterations}
                type="number"
                onChange={(e) =>
                  setConfigurationState((prev) => ({
                    ...prev,
                    runParameters: {
                      ...prev.runParameters,
                      maxIterations: parseInt(e.target.value),
                    },
                  }))
                }
              />
            </label>
          </form>,
        ]}
      </Content>
    </Fragment>
  );
};

export default TechnicalDrawer;
