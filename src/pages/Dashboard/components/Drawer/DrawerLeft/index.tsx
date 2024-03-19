import "../Drawer.css";
import "./DrawerLeft.css";
import { nanoid } from "nanoid";
import { PinInfoInterface, RegionInterface } from "../../../../../types";
import Title from "../components/Title";
import Content from "../components/Content";
import { FiPlus } from "react-icons/fi";
import SmartIcon from "../../../../../components/SmartIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  addRegion,
  selectPin,
  selectRegion,
  setMapAction,
} from "../../../../../redux/actions";

const DrawerLeft = () => {
  const dispatch = useDispatch();
  const regions = useSelector(
    (state: any) => state.map.present.regions,
  ) as RegionInterface[];
  const selectedRegion = useSelector(
    (state: any) => state.map.present.selectedRegion,
  ) as string;
  const pins = useSelector(
    (state: any) => state.map.present.pins,
  ) as PinInfoInterface[];
  const selectedPin = useSelector(
    (state: any) => state.map.present.selectedPin,
  ) as string;

  return (
    <div className="drawer left">
      <Title title="Regions">
        <SmartIcon
          description="Add new region"
          onClick={() => {
            dispatch(addRegion());
            dispatch(setMapAction("pin"));
          }}
        >
          <FiPlus />
        </SmartIcon>
      </Title>
      <Content emptyText="No regions to show.">
        {regions.map((region) => (
          <li
            key={nanoid()}
            onClick={() => dispatch(selectRegion(region.id))}
            className={`${selectedRegion === region.id ? "selected" : ""}`}
          >
            <p>{region.title}</p>
          </li>
        ))}
      </Content>
      <Title title="Targets" />
      <Content emptyText="No targets to show.">
        {pins
          .filter((pin) => pin.regionId === selectedRegion)
          .map((pin) => (
            <li
              key={nanoid()}
              onClick={() => dispatch(selectPin(pin.id))}
              className={`${selectedPin === pin.id ? "selected" : ""}`}
            >
              <p>{pin.title}</p>
            </li>
          ))}
      </Content>
    </div>
  );
};

export default DrawerLeft;
