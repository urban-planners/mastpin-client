import { IoCloseOutline } from "react-icons/io5";
import "./ResultOverlay.css";
import { useDispatch, useSelector } from "react-redux";
import { PresentationInterface } from "../../../types";
import { setMapAction } from "../../../redux/actions";

const ResultOverlay = () => {
  const result = useSelector(
    (state: any) => state.result.presentation,
  ) as PresentationInterface;
  const dispatch = useDispatch();

  return (
    <div className="map__result__overlay">
      <div className="result__actions__container">
        <h4 className="result__actions__title">
          Result for <span>{result.mast_loc_coord.length}</span> Masts
        </h4>
        <div
          className="result__actions__item"
          onClick={() => dispatch(setMapAction("hand"))}
        >
          <IoCloseOutline />
        </div>
      </div>
      <div className="scrollable">
        <div className="map__result__container">
          <div className="result__item">
            <div className="result__title">Signal Strength</div>
            <div className="result__value">{result.signal_strength}</div>
          </div>
          <div className="result__item">
            <div className="result__title">Coverage</div>
            <div className="result__value">{result.coverage}%</div>
          </div>
          <div className="result__item">
            <div className="result__title">Load</div>
            <div className="result__value">
              {result.load_min} - {result.load_max}
            </div>
          </div>
          <div className="result__item">
            <div className="result__title">Load Standard Deviation</div>
            <div className="result__value">{result.load_std}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultOverlay;
