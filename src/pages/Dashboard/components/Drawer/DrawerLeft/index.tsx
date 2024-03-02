import { nanoid } from "nanoid";
import "../Drawer.css";
import "./DrawerLeft.css";
import { PinInfoInterface } from "../../../../../types";

const DrawerLeft = ({ targets = [], selected, setSelected }: {
  targets: PinInfoInterface[];
  selected: { asset: string };
  setSelected: React.Dispatch<React.SetStateAction<{ asset: string }>>;
}) => {
  const pinClicked = (pin : PinInfoInterface) => {
    setSelected((prev) => ({
      ...prev,
      asset: `${pin.loc.lng} ${pin.loc.lat}`,
    }));
  };

  return (
    <div className="drawer left">
      <div className="title">
        <small>targets</small>
        <div className="line" />
      </div>
      <div className="content">
        <ul>
          {!targets.length ? (
            <small className="na">Nothing to show.</small>
          ) : (
            targets.map((asset) => (
              <li
                key={nanoid()}
                onClick={() => pinClicked(asset)}
                className={`${
                  selected.asset === `${asset.loc.lng} ${asset.loc.lat}`
                    ? "selected"
                    : ""
                }`}
              >
                {asset.title}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default DrawerLeft;
