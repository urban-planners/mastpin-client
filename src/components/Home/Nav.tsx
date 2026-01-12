import "./Nav.css";
import { Link } from "react-router-dom";
import logoImage from "../../assets/svgs/logo.svg";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAuthPage = window.location.pathname.includes("/auth");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`home__nav ${scrolled || isAuthPage ? "scrolled" : ""}`}>
      <div className="home__nav__content">
        <Link to={"/"} className="home__nav__content__logo">
          <img src={logoImage} alt="MastPin" />
        </Link>

        <div className="home__nav__mobile-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </div>

        <div className={`home__nav__menu ${mobileMenuOpen ? "active" : ""}`}>
          <div className="home__nav__content__links">
            <Link
              to="/#about"
              className="home__nav__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/#features"
              className="home__nav__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/#faq"
              className="home__nav__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/#contact"
              className="home__nav__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
          <div className="home__nav__content__auth-links">
            <Link
              to="/auth/login"
              className="home__nav__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="home__nav__cta"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
