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
} from "../../../../../redux/actions";

const DrawerLeft = () => {
  const dispatch = useDispatch();
  const regions = useSelector(
    (state: any) => state.map.regions,
  ) as RegionInterface[];
  const selectedRegion = useSelector(
    (state: any) => state.map.selectedRegion,
  ) as RegionInterface;
  const pins = useSelector(
    (state: any) => state.map.pins,
  ) as PinInfoInterface[];
  const selectedPin = useSelector(
    (state: any) => state.map.selectedPin,
  ) as PinInfoInterface;

  return (
    <div className="drawer left">
      <Title title="Regions">
        <SmartIcon
          description="Add new region"
          onClick={() => dispatch(addRegion())}
        >
          <FiPlus />
        </SmartIcon>
      </Title>
      <Content emptyText="No regions to show.">
        {regions.map((region) => (
          <li
            key={nanoid()}
            onClick={() => dispatch(selectRegion(region))}
            className={`${selectedRegion.title === region.title ? "selected" : ""}`}
          >
            <p>{region.title}</p>
          </li>
        ))}
      </Content>
      <Title title="Targets" />
      <Content emptyText="No targets to show.">
        {pins.map((pin) => (
          <li
            key={nanoid()}
            onClick={() => dispatch(selectPin(pin.title))}
            className={`${selectedPin.title === pin.title ? "selected" : ""}`}
          >
            <p>{pin.title}</p>
          </li>
        ))}
      </Content>
    </div>
  );
};

export default DrawerLeft;
