import { ReactNode } from "react";
import "./Template.css";
import { IoCloseOutline } from "react-icons/io5";

const MapOverlay = ({
  title = "",
  onClickX,
  children,
  actions,
}: {
  title?: string | ReactNode;
  onClickX: () => void;
  children?: ReactNode;
  actions?: {
    onClick: () => void;
    children: ReactNode;
  };
}) => {
  return (
    <div className="map__overlay" onClick={onClickX}>
      <div
        className="map__overlay__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="map__overlay__actions__container">
          <h4 className="map__overlay__actions__title">{title}</h4>
          <div
            className="map__overlay__actions__item"
            onClick={actions?.onClick}
          >
            {actions?.children}
          </div>
          <div className="map__overlay__actions__item" onClick={onClickX}>
            <IoCloseOutline />
          </div>
        </div>
        <div className="scrollable">{children}</div>
      </div>
    </div>
  );
};

export default MapOverlay;
