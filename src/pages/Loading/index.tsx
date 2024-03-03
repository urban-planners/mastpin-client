import "./Loading.css";
import { GridLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loading-page">
      <GridLoader color="var(--primary-color)" />
    </div>
  );
};

export default Loading;
