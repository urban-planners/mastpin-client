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
import SpecialInput from "../components/SpecialInput";

const TechnicalDrawer = () => {
  const dispatch = useDispatch();
  const optimization = useSelector(
    (state: any) => state.project.optimization,
  ) as OptimizationInterface;
  const optimizationCheck = useSelector(
    (state: any) => state.project.optimizationCheck,
  ) as OptimizationCheckInterface;

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
                value={optimization.algorithm}
                onChange={(e) =>
                  dispatch(
                    setOptimization({
                      ...optimization,
                      algorithm: e.target.value as "pso" | "ga",
                    }),
                  )
                }
              >
                <option value="pso">Particle Swarm Optimization</option>
                <option value="ga">Genetic Algorithm</option>
              </select>
            </label>
            <SubTitle text="Initial Parameters" />
            {optimization.algorithm === "pso" && (
              <Fragment>
                <SpecialInput
                  title="Swarm Size"
                  type="number"
                  value={optimization.initParameters.swarmSize}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        initParameters: {
                          ...optimization.initParameters,
                          swarmSize: /^[0-9]*$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.initParameters.swarmSize}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        initParameters: {
                          ...optimizationCheck.initParameters,
                          swarmSize: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="Inertia"
                  type="number"
                  value={optimization.initParameters.inertia}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        initParameters: {
                          ...optimization.initParameters,
                          inertia: /^[0-9]*\.{0,1}[0-9]*$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.initParameters.inertia}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        initParameters: {
                          ...optimizationCheck.initParameters,
                          inertia: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="Cognitive Coefficient"
                  type="number"
                  value={optimization.initParameters.cognCoeff}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        initParameters: {
                          ...optimization.initParameters,
                          cognCoeff: /^[0-9]*\.{0,1}[0-9]*$/.test(
                            e.target.value,
                          )
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.initParameters.cognCoeff}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        initParameters: {
                          ...optimizationCheck.initParameters,
                          cognCoeff: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="Social Coefficient"
                  type="number"
                  value={optimization.initParameters.socCoeff}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        initParameters: {
                          ...optimization.initParameters,
                          socCoeff: /^[0-9]*\.{0,1}[0-9]*$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.initParameters.socCoeff}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        initParameters: {
                          ...optimizationCheck.initParameters,
                          socCoeff: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="Velocity Magnitude"
                  type="number"
                  value={optimization.initParameters.velocityMagnitude}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        initParameters: {
                          ...optimization.initParameters,
                          velocityMagnitude: /^[0-9]*\.{0,1}[0-9]*$/.test(
                            e.target.value,
                          )
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.initParameters.velocityMagnitude}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        initParameters: {
                          ...optimizationCheck.initParameters,
                          velocityMagnitude: e.target.checked,
                        },
                      }),
                    )
                  }
                />
              </Fragment>
            )}
            {optimization.algorithm === "ga" && (
              <Fragment>
                <SpecialInput
                  title="Population Size"
                  type="number"
                  value={optimization.initParameters.popSize}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        initParameters: {
                          ...optimization.initParameters,
                          popSize: /^[0-9]*$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.initParameters.popSize}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        initParameters: {
                          ...optimizationCheck.initParameters,
                          popSize: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="K Best Individuals"
                  type="number"
                  value={optimization.initParameters.kBestIndividuals}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        initParameters: {
                          ...optimization.initParameters,
                          kBestIndividuals: /^[0-9]*$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="Number of Parents"
                  type="number"
                  value={optimization.initParameters.nParents}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        initParameters: {
                          ...optimization.initParameters,
                          nParents: /^[0-9]*$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.initParameters.nParents}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        initParameters: {
                          ...optimizationCheck.initParameters,
                          nParents: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <label className="drawer__form__label">
                  Breeding Method
                  <select
                    value={optimization.initParameters.breedingMethod}
                    onChange={(e) =>
                      dispatch(
                        setOptimization({
                          ...optimization,
                          initParameters: {
                            ...optimization.initParameters,
                            breedingMethod: e.target.value as
                              | "average"
                              | "random",
                          },
                        }),
                      )
                    }
                  >
                    <option value="average">Average</option>
                    <option value="random">Random</option>
                  </select>
                </label>
                <SpecialInput
                  title="Individual Mutation Rate"
                  type="number"
                  value={optimization.initParameters.individualMutationRate}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        initParameters: {
                          ...optimization.initParameters,
                          individualMutationRate: /^[0-9]*\.{0,1}[0-9]*$/.test(
                            e.target.value,
                          )
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={
                    optimizationCheck.initParameters.individualMutationRate
                  }
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        initParameters: {
                          ...optimizationCheck.initParameters,
                          individualMutationRate: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="Gene Mutation Rate"
                  type="number"
                  value={optimization.initParameters.geneMutationRate}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        initParameters: {
                          ...optimization.initParameters,
                          geneMutationRate: /^[0-9]*\.{0,1}[0-9]*$/.test(
                            e.target.value,
                          )
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.initParameters.geneMutationRate}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        initParameters: {
                          ...optimizationCheck.initParameters,
                          geneMutationRate: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="Mutation Intensity"
                  type="number"
                  value={optimization.initParameters.mutationIntensity}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        initParameters: {
                          ...optimization.initParameters,
                          mutationIntensity: /^[0-9]*\.{0,1}[0-9]*$/.test(
                            e.target.value,
                          )
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.initParameters.mutationIntensity}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        initParameters: {
                          ...optimizationCheck.initParameters,
                          mutationIntensity: e.target.checked,
                        },
                      }),
                    )
                  }
                />
              </Fragment>
            )}
            <SubTitle text="Run Parameters" />
            {optimization.algorithm === "pso" && (
              <Fragment>
                <SpecialInput
                  title="Maximum Iterations"
                  type="number"
                  value={optimization.runParameters.maxIter}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        runParameters: {
                          ...optimization.runParameters,
                          maxIter: /^[0-9]*$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.runParameters.maxIter}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        runParameters: {
                          ...optimizationCheck.runParameters,
                          maxIter: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="Score Threshold"
                  type="number"
                  value={optimization.runParameters.scoreThreshold}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        runParameters: {
                          ...optimization.runParameters,
                          scoreThreshold: /^[0-9]*\.{0,1}[0-9]*$/.test(
                            e.target.value,
                          )
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.runParameters.scoreThreshold}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        runParameters: {
                          ...optimizationCheck.runParameters,
                          scoreThreshold: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="Patience"
                  type="number"
                  value={optimization.runParameters.patience}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        runParameters: {
                          ...optimization.runParameters,
                          patience: /^[0-9]*$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.runParameters.patience}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        runParameters: {
                          ...optimizationCheck.runParameters,
                          patience: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="Tolerance"
                  type="number"
                  value={optimization.runParameters.tolerance}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        runParameters: {
                          ...optimization.runParameters,
                          tolerance: /^[0-9]*\.{0,1}[0-9]*$/.test(
                            e.target.value,
                          )
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.runParameters.tolerance}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        runParameters: {
                          ...optimizationCheck.runParameters,
                          tolerance: e.target.checked,
                        },
                      }),
                    )
                  }
                />
              </Fragment>
            )}
            {optimization.algorithm === "ga" && (
              <Fragment>
                <SpecialInput
                  title="Maximum Generations"
                  type="number"
                  value={optimization.runParameters.maxGenerations}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        runParameters: {
                          ...optimization.runParameters,
                          maxGenerations: /^[0-9]*$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.runParameters.maxGenerations}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        runParameters: {
                          ...optimizationCheck.runParameters,
                          maxGenerations: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="Score Threshold"
                  type="number"
                  value={optimization.runParameters.scoreThreshold}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        runParameters: {
                          ...optimization.runParameters,
                          scoreThreshold: /^[0-9]*\.{0,1}[0-9]*$/.test(
                            e.target.value,
                          )
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.runParameters.scoreThreshold}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        runParameters: {
                          ...optimizationCheck.runParameters,
                          scoreThreshold: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="Patience"
                  type="number"
                  value={optimization.runParameters.patience}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        runParameters: {
                          ...optimization.runParameters,
                          patience: /^[0-9]*$/.test(e.target.value)
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.runParameters.patience}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        runParameters: {
                          ...optimizationCheck.runParameters,
                          patience: e.target.checked,
                        },
                      }),
                    )
                  }
                />
                <SpecialInput
                  title="Tolerance"
                  type="number"
                  value={optimization.runParameters.tolerance}
                  onchange={(e) =>
                    dispatch(
                      setOptimization({
                        ...optimization,
                        runParameters: {
                          ...optimization.runParameters,
                          tolerance: /^[0-9]*\.{0,1}[0-9]*$/.test(
                            e.target.value,
                          )
                            ? e.target.value
                            : 0,
                        },
                      }),
                    )
                  }
                  checked={optimizationCheck.runParameters.tolerance}
                  onCheck={(e) =>
                    dispatch(
                      setOptimizationCheck({
                        ...optimizationCheck,
                        runParameters: {
                          ...optimizationCheck.runParameters,
                          tolerance: e.target.checked,
                        },
                      }),
                    )
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
