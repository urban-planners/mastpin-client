import { Outlet } from "react-router-dom";
import { Footer, Nav } from "../../components/Home";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
