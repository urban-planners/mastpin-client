import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiGithub,
} from "react-icons/fi";

export const Footer = () => {
  return (
    <footer className="home__footer">
      <div>
        <div className="home__footer__content">
          <h4>Mastpin</h4>
          <p>
            Optimize mast placement with{" "}
            <span>
              <b>Mastpin</b>
            </span>
          </p>
          <div className="home__footer__socials">
            <a href="https://www.facebook.com">
              <FiFacebook />
            </a>
            <a href="https://www.twitter.com">
              <FiTwitter />
            </a>
            <a href="https://www.instagram.com">
              <FiInstagram />
            </a>
            <a href="https://www.linkedin.com">
              <FiLinkedin />
            </a>
            <a href="mailto:">
              <FiMail />
            </a>
          </div>
          <p>
            Collaborate with us on{" "}
            <a href="https://www.github.com">
              {" "}
              <FiGithub />{" "}
            </a>
          </p>
        </div>
        <div className="home__footer__links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="#about">About</Link>
            </li>
            <li>
              <Link to="#services">Services</Link>
            </li>
            <li>
              <Link to="#contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="home__footer__links home__footer__legal">
          <h4>Legal</h4>
          <ul>
            <li>
              <Link to="/legal/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/legal/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="home__footer__bottom">
        <h1>Mastpin</h1>
        <small>
          @ {new Date().getFullYear()} MastPin. All Rights Reserved.
        </small>
      </div>
    </footer>
  );
};
