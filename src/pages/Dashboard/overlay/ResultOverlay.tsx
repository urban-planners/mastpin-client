import "./ResultOverlay.css";
import { useDispatch, useSelector } from "react-redux";
import { PresentationInterface } from "../../../types";
import { setMapAction } from "../../../redux/actions";
import MapOverlay from "./Template";

const ResultOverlay = () => {
  const simulation = useSelector(
    (state: any) => state.result.simulation,
  ) as PresentationInterface;
  const dispatch = useDispatch();

  return (
    <MapOverlay
      title={
        <>
          Result for <span>{simulation.mast_loc_coord.length}</span> Masts
        </>
      }
      onClickX={() => dispatch(setMapAction("hand"))}
    >
      <div className="map__result__container">
        <div className="result__item">
          <div className="result__title">Signal Strength</div>
          <div className="result__value">{simulation.signal_strength}</div>
        </div>
        <div className="result__item">
          <div className="result__title">Coverage</div>
          <div className="result__value">{simulation.coverage}%</div>
        </div>
        <div className="result__item">
          <div className="result__title">Load</div>
          <div className="result__value">
            {simulation.load_min} - {simulation.load_max}
          </div>
        </div>
        <div className="result__item">
          <div className="result__title">Load Standard Deviation</div>
          <div className="result__value">{simulation.load_std}</div>
        </div>
      </div>
    </MapOverlay>
  );
};

export default ResultOverlay;
