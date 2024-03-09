import "./TechnicalDrawer.css";
import { Fragment } from "react/jsx-runtime";
import Title from "../../components/Title";
import Content from "../../components/Content";
import {
  OptimizationCheckInterface,
  OptimizationInterface,
} from "../../../../../../types";
import { useDispatch, useSelector } from "react-redux";
import SubTitle from "../../components/SubTitle";
import {
  setOptimization,
  setOptimizationCheck,
} from "../../../../../../redux/actions";
import { useEffect, useState } from "react";
import SpecialInput from "../components/SpecialInput";

const TechnicalDrawer = () => {
  const dispatch = useDispatch();
  const optimization = useSelector(
    (state: any) => state.project.optimization,
  ) as OptimizationInterface;
  const optimizationCheck = useSelector(
    (state: any) => state.project.optimizationCheck,
  ) as OptimizationCheckInterface;

  const [optimizationState, setOptimizationState] = useState(optimization);
  const [optimizationCheckState, setOptimizationCheckState] =
    useState(optimizationCheck);

  useEffect(() => {
    dispatch(setOptimization(optimizationState));
  }, [optimizationState]);

  useEffect(() => {
    dispatch(setOptimizationCheck(optimizationCheckState));
  }, [optimizationCheckState]);

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
                value={optimizationState.algorithm}
                onChange={(e) =>
                  setOptimizationState((prev) => ({
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
            {optimizationState.algorithm === "pso" && (
              <Fragment>
                <SpecialInput
                  title="Swarm Size"
                  type="number"
                  value={optimizationState.initParameters.swarmSize}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        swarmSize: parseInt(e.target.value),
                      },
                    }))
                  }
                  checked={optimizationCheckState.initParameters.swarmSize}
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        swarmSize: e.target.checked,
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="Inertia"
                  type="number"
                  value={optimizationState.initParameters.inertia}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        inertia: parseFloat(e.target.value),
                      },
                    }))
                  }
                  checked={optimizationCheckState.initParameters.inertia}
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        inertia: e.target.checked,
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="Cognitive Coefficient"
                  type="number"
                  value={optimizationState.initParameters.cognCoeff}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        cognCoeff: parseFloat(e.target.value),
                      },
                    }))
                  }
                  checked={optimizationCheckState.initParameters.cognCoeff}
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        cognCoeff: e.target.checked,
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="Social Coefficient"
                  type="number"
                  value={optimizationState.initParameters.socCoeff}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        socCoeff: parseFloat(e.target.value),
                      },
                    }))
                  }
                  checked={optimizationCheckState.initParameters.socCoeff}
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        socCoeff: e.target.checked,
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="Velocity Magnitude"
                  type="number"
                  value={optimizationState.initParameters.velocityMagnitude}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        velocityMagnitude: parseFloat(e.target.value),
                      },
                    }))
                  }
                  checked={
                    optimizationCheckState.initParameters.velocityMagnitude
                  }
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        velocityMagnitude: e.target.checked,
                      },
                    }))
                  }
                />
              </Fragment>
            )}
            {optimizationState.algorithm === "ga" && (
              <Fragment>
                <SpecialInput
                  title="Population Size"
                  type="number"
                  value={optimizationState.initParameters.popSize}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        popSize: parseInt(e.target.value),
                      },
                    }))
                  }
                  checked={optimizationCheckState.initParameters.popSize}
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        popSize: e.target.checked,
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="K Best Individuals"
                  type="number"
                  value={optimizationState.initParameters.kBestIndividuals}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        kBestIndividuals: parseInt(e.target.value),
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="Number of Parents"
                  type="number"
                  value={optimizationState.initParameters.nParents}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        nParents: parseInt(e.target.value),
                      },
                    }))
                  }
                  checked={optimizationCheckState.initParameters.nParents}
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        nParents: e.target.checked,
                      },
                    }))
                  }
                />
                <label className="drawer__form__label">
                  Breeding Method
                  <select
                    value={optimizationState.initParameters.breedingMethod}
                    onChange={(e) =>
                      setOptimizationState((prev) => ({
                        ...prev,
                        initParameters: {
                          ...prev.initParameters,
                          breedingMethod: e.target.value as
                            | "average"
                            | "random",
                        },
                      }))
                    }
                  >
                    <option value="average">Average</option>
                    <option value="random">Random</option>
                  </select>
                </label>
                <SpecialInput
                  title="Individual Mutation Rate"
                  type="number"
                  value={
                    optimizationState.initParameters.individualMutationRate
                  }
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        individualMutationRate: parseFloat(e.target.value),
                      },
                    }))
                  }
                  checked={
                    optimizationCheckState.initParameters.individualMutationRate
                  }
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        individualMutationRate: e.target.checked,
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="Gene Mutation Rate"
                  type="number"
                  value={optimizationState.initParameters.geneMutationRate}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        geneMutationRate: parseFloat(e.target.value),
                      },
                    }))
                  }
                  checked={
                    optimizationCheckState.initParameters.geneMutationRate
                  }
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        geneMutationRate: e.target.checked,
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="Mutation Intensity"
                  type="number"
                  value={optimizationState.initParameters.mutationIntensity}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        mutationIntensity: parseFloat(e.target.value),
                      },
                    }))
                  }
                  checked={
                    optimizationCheckState.initParameters.mutationIntensity
                  }
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      initParameters: {
                        ...prev.initParameters,
                        mutationIntensity: e.target.checked,
                      },
                    }))
                  }
                />
              </Fragment>
            )}
            <SubTitle text="Run Parameters" />
            {optimizationState.algorithm === "pso" && (
              <Fragment>
                <SpecialInput
                  title="Maximum Iterations"
                  type="number"
                  value={optimizationState.runParameters.maxIter}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        maxIter: parseInt(e.target.value),
                      },
                    }))
                  }
                  checked={optimizationCheckState.runParameters.maxIter}
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        maxIter: e.target.checked,
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="Score Threshold"
                  type="number"
                  value={optimizationState.runParameters.scoreThreshold}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        scoreThreshold: parseFloat(e.target.value),
                      },
                    }))
                  }
                  checked={optimizationCheckState.runParameters.scoreThreshold}
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        scoreThreshold: e.target.checked,
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="Patience"
                  type="number"
                  value={optimizationState.runParameters.patience}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        patience: parseInt(e.target.value),
                      },
                    }))
                  }
                  checked={optimizationCheckState.runParameters.patience}
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        patience: e.target.checked,
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="Tolerance"
                  type="number"
                  value={optimizationState.runParameters.tolerance}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        tolerance: parseFloat(e.target.value),
                      },
                    }))
                  }
                  checked={optimizationCheckState.runParameters.tolerance}
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        tolerance: e.target.checked,
                      },
                    }))
                  }
                />
              </Fragment>
            )}
            {optimizationState.algorithm === "ga" && (
              <Fragment>
                <SpecialInput
                  title="Maximum Generations"
                  type="number"
                  value={optimizationState.runParameters.maxGenerations}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        maxGenerations: parseInt(e.target.value),
                      },
                    }))
                  }
                  checked={optimizationCheckState.runParameters.maxGenerations}
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        maxGenerations: e.target.checked,
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="Score Threshold"
                  type="number"
                  value={optimizationState.runParameters.scoreThreshold}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        scoreThreshold: parseFloat(e.target.value),
                      },
                    }))
                  }
                  checked={optimizationCheckState.runParameters.scoreThreshold}
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        scoreThreshold: e.target.checked,
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="Patience"
                  type="number"
                  value={optimizationState.runParameters.patience}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        patience: parseInt(e.target.value),
                      },
                    }))
                  }
                  checked={optimizationCheckState.runParameters.patience}
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        patience: e.target.checked,
                      },
                    }))
                  }
                />
                <SpecialInput
                  title="Tolerance"
                  type="number"
                  value={optimizationState.runParameters.tolerance}
                  onchange={(e) =>
                    setOptimizationState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        tolerance: parseFloat(e.target.value),
                      },
                    }))
                  }
                  checked={optimizationCheckState.runParameters.tolerance}
                  onCheck={(e) =>
                    setOptimizationCheckState((prev) => ({
                      ...prev,
                      runParameters: {
                        ...prev.runParameters,
                        tolerance: e.target.checked,
                      },
                    }))
                  }
                />
              </Fragment>
            )}
          </form>,
        ]}
      </Content>
    </Fragment>
  );
};

export default TechnicalDrawer;
