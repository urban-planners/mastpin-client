import "./Nav.css";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="home__nav">
      <div className="home__nav__content">
        <Link to={"/"}>
          <div className="home__nav__content__logo">
            <img src="/assets/logo.svg" alt="MastPin" />
          </div>
        </Link>
        <div className="home__nav__content__links">
          <Link to="/auth/login">Login</Link>
          <Link to="/auth/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
};
