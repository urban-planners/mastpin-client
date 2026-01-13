import "./Footer.css";
import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";

export const Footer = () => {
  return (
    <footer className="home__footer">
      <div className="home__footer__grid">
        <div className="home__footer__content">
          <h4 className="footer__brand">Mastpin</h4>
          <p>
            Advanced mast placement optimization for next-generation
            telecommunication networks.
          </p>
          <div className="home__footer__socials">
            <a href="https://www.facebook.com" aria-label="Facebook">
              <FiFacebook />
            </a>
            <a href="https://www.twitter.com" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href="https://www.linkedin.com" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="https://github.com" aria-label="GitHub">
              <FiGithub />
            </a>
          </div>
        </div>

        <div className="home__footer__links">
          <h4>Platform</h4>
          <ul>
            <li>
              <Link to="/#features">Features</Link>
            </li>
            <li>
              <Link to="/#showcase">Showcase</Link>
            </li>
            <li>
              <Link to="/#benefits">Benefits</Link>
            </li>
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
          </ul>
        </div>

        <div className="home__footer__links">
          <h4>Company</h4>
          <ul>
            <li>
              <Link to="/#about">About Us</Link>
            </li>
            <li>
              <Link to="/#contact">Contact</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
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
            <li>
              <Link to="/legal/cookies">Cookie Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="home__footer__bottom">
        <div className="home__footer__bottom__content">
          <small>
            &copy; {new Date().getFullYear()} Mastpin. All Rights Reserved.
          </small>
          <div className="home__footer__bottom__links">
            <Link to="/legal/privacy">Privacy</Link>
            <Link to="/legal/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
