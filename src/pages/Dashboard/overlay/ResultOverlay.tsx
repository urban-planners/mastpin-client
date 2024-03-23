import "./ResultOverlay.css";
import { useDispatch, useSelector } from "react-redux";
import { PresentationInterface } from "../../../types";
import { setMapAction } from "../../../redux/actions";
import MapOverlay from "./Template";
import ResultComponent from "./components/ResultComponent";
import { useState } from "react";
import CompareResultsChart from "./components/CompareResultsChart";

const ResultOverlay = () => {
  const simulation = useSelector(
    (state: any) => state.result.simulation,
  ) as PresentationInterface;
  const evaluation = useSelector(
    (state: any) => state.result.evaluation,
  ) as PresentationInterface;
  const hasSimulation = useSelector((state: any) => state.result.hasSimulation);
  const hasEvaluation = useSelector((state: any) => state.result.hasEvaluation);
  const currentMasts = useSelector(
    (state: any) => state.map.present.currentMasts,
  );
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<"simulation" | "evaluation">(
    hasSimulation ? "simulation" : "evaluation",
  );

  return (
    <MapOverlay
      title={
        <>
          {activeTab === "simulation" ? (
            <>
              Optimization for <span>{simulation.mast_loc_coord.length}</span> Masts
            </>
          ) : (
            <>
              Evaluation for <span>{currentMasts.length}</span> Masts
            </>
          )}
        </>
      }
      onClickX={() => dispatch(setMapAction("hand"))}
      actions={
        hasSimulation && hasEvaluation
          ? {
              onClick: () =>
                setActiveTab(
                  activeTab === "simulation" ? "evaluation" : "simulation",
                ),
              children:
                activeTab === "simulation" ? (
                  <button className="result__overlay__button">
                    Show Evaluation
                  </button>
                ) : (
                  <button className="result__overlay__button">
                    Show Optimization
                  </button>
                ),
            }
          : undefined
      }
    >
      <ResultComponent
        {...(activeTab === "simulation" ? simulation : evaluation)}
      >
        {hasSimulation && hasEvaluation && (
          <div className="map__result__chart__container">
            <CompareResultsChart
              label="Coverage"
              simulationValue={simulation.coverage}
              evaluationValue={evaluation.coverage}
            />
            <CompareResultsChart
              label="Signal Strength"
              simulationValue={simulation.signal_strength}
              evaluationValue={evaluation.signal_strength}
            />
            <CompareResultsChart
              label="Load Disparity"
              simulationValue={simulation.load_std}
              evaluationValue={evaluation.load_std}
            />
          </div>
        )}
      </ResultComponent>
    </MapOverlay>
  );
};

export default ResultOverlay;
