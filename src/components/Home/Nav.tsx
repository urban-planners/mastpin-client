import "./Nav.css";
import { Link } from "react-router-dom";
import logoImage from "../../assets/svgs/logo.svg";

export const Nav = () => {
  return (
    <nav className="home__nav">
      <div className="home__nav__content">
        <Link to={"/"} className="home__nav__content__logo">
          <img src={logoImage} alt="MastPin" />
          {/* <h1>Mastpin</h1> */}
        </Link>
        <div className="home__nav__content__links">
          <Link to="/#about">About</Link>
          <Link to="/#features">Features</Link>
          <Link to="/#faq">FAQ</Link>
          <Link to="/#contact">Contact</Link>
        </div>
        <div className="home__nav__content__auth-links">
          <Link to="/auth/login">Login</Link>
          <Link to="/auth/register">Register</Link>
        </div>
      </div>
    </nav>
  );
};
