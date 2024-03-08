import "../Drawer.css";
import "./DrawerRight.css";
import TechnicalDrawer from "./Technical";
import MappingDrawer from "./Mapping";
import { useSelector } from "react-redux";

const DrawerRight = () => {
  const mode = useSelector((state: any) => state.project.displayMode);

  return (
    <div className="drawer right">
      {/technical/i.test(mode) ? <TechnicalDrawer /> : <MappingDrawer />}
    </div>
  );
};

export default DrawerRight;
