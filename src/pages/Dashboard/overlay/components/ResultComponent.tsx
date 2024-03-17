import { ReactNode } from "react";
import "./ResultComponent.css";

const ResultComponent = ({
  signal_strength,
  coverage,
  load_min,
  load_max,
  load_std,
  children,
}: {
  signal_strength: number;
  coverage: number;
  load_min: number;
  load_max: number;
  load_std: number;
  children?: ReactNode;
}) => {
  return (
    <div className="map__result__container">
      <div className="result__item">
        <div className="result__title">Signal Strength</div>
        <div className="result__value">{signal_strength.toFixed(4)}</div>
      </div>
      <div className="result__item">
        <div className="result__title">Coverage</div>
        <div className="result__value">{coverage.toFixed(4)}%</div>
      </div>
      <div className="result__item">
        <div className="result__title">Load</div>
        <div className="result__value">
          {load_min.toFixed(4)} - {load_max.toFixed(4)}
        </div>
      </div>
      <div className="result__item">
        <div className="result__title">Load Standard Deviation</div>
        <div className="result__value">{load_std.toFixed(4)}</div>
      </div>
      {children}
    </div>
  );
};

export default ResultComponent;
