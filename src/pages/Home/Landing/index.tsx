import "./Landing.css";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartLine,
  FaCogs,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaShieldAlt,
  FaSignal,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import mapPreview from "../../../assets/images/map-preview.webp";
import preview1 from "../../../assets/images/preview1.webp";
import preview2 from "../../../assets/images/preview2.webp";

const Landing = () => {
  const location = useLocation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [subscribeForm, setSubscribeForm] = useState({
    email: "",
  });

  const contactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name) return toast.error("Name is required");
    if (!contactForm.email) return toast.error("Email is required");
    if (!contactForm.message) return toast.error("Message is required");
    toast.success("Message sent successfully!");
    setContactForm({ name: "", email: "", message: "" });
  };

  const subscribeFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeForm.email) return toast.error("Email is required");
    toast.success("Subscribed successfully!");
    setSubscribeForm({ email: "" });
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      if (textarea.scrollHeight > 296) {
        textarea.style.height = "300px";
        return;
      }
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight + 4}px`;
    }
  }, [contactForm.message]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="landing">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Hero Section */}
      <section id="hero" className="landing__hero">
        <div className="landing__container landing__hero__content">
          <div className="landing__hero__text">
            <h1>Optimize Your Network Infrastructure</h1>
            <p>
              Mastpin uses advanced metaheuristic algorithms to determine the
              perfect placement for telecommunication masts, ensuring maximum
              coverage and signal strength.
            </p>
            <div className="landing__hero__actions">
              <Link to={"/auth/register"} className="landing__cta">
                Get Started
              </Link>
              <Link
                to={"/#features"}
                className="landing__cta landing__cta--secondary"
              >
                Learn More
              </Link>
            </div>
            <div className="landing__hero__stats">
              <div className="stat">
                <h3>99%</h3>
                <small>Coverage Accuracy</small>
              </div>
              <div className="stat">
                <h3>50%</h3>
                <small>Cost Reduction</small>
              </div>
              <div className="stat">
                <h3>24/7</h3>
                <small>Optimization</small>
              </div>
            </div>
          </div>
          <div className="landing__hero__image">
            <div className="landing__hero__image__wrapper">
              <img src={mapPreview} alt="Mastpin Dashboard Preview" />
              <div className="floating-card card-1">
                <FaSignal /> Signal Optimized
              </div>
              <div className="floating-card card-2">
                <FaMapMarkerAlt /> 120 Masts Placed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="landing__showcase">
        <div className="landing__container">
          <div className="landing__section-header">
            <h2>Experience the Power</h2>
            <p>See how Mastpin transforms your network planning</p>
          </div>
          <div className="showcase__grid">
            <div className="showcase__item">
              <img src={preview1} alt="Dashboard Analytics" />
              <div className="showcase__caption">Real-time Analytics</div>
            </div>
            <div className="showcase__item">
              <img src={preview2} alt="Coverage Map" />
              <div className="showcase__caption">Heatmap Visualization</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="landing__features">
        <div className="landing__container">
          <div className="landing__section-header">
            <h2>Key Features</h2>
            <p>Everything you need to build a robust network</p>
          </div>
          <div className="features__grid">
            <div className="landing__feature">
              <div className="feature-icon-wrapper">
                <FaMapMarkerAlt className="landing__icon" />
              </div>
              <h3>Smart Placement</h3>
              <p>
                Metaheuristic algorithms determine strategic locations for mast
                installation, minimizing coverage gaps.
              </p>
            </div>
            <div className="landing__feature">
              <div className="feature-icon-wrapper">
                <FaSignal className="landing__icon" />
              </div>
              <h3>Signal Boost</h3>
              <p>
                Maximize signal quality and distribution by strategically
                placing masts to reduce attenuation.
              </p>
            </div>
            <div className="landing__feature">
              <div className="feature-icon-wrapper">
                <FaUsers className="landing__icon" />
              </div>
              <h3>Load Balancing</h3>
              <p>
                Distribute network load efficiently to reduce congestion and
                ensure optimal performance.
              </p>
            </div>
            <div className="landing__feature">
              <div className="feature-icon-wrapper">
                <FaChartLine className="landing__icon" />
              </div>
              <h3>Data Analytics</h3>
              <p>
                Comprehensive insights into network performance and coverage
                metrics.
              </p>
            </div>
            <div className="landing__feature">
              <div className="feature-icon-wrapper">
                <FaCogs className="landing__icon" />
              </div>
              <h3>Automated Optimization</h3>
              <p>
                Continuous monitoring and adjustment recommendations for your
                infrastructure.
              </p>
            </div>
            <div className="landing__feature">
              <div className="feature-icon-wrapper">
                <FaShieldAlt className="landing__icon" />
              </div>
              <h3>Reliability</h3>
              <p>
                Ensure consistent uptime and network stability for all your
                users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="landing__benefits">
        <div className="landing__container">
          <div className="benefits__wrapper">
            <div className="benefits-text">
              <h2>Why Choose Mastpin?</h2>
              <p>
                Deliver superior connectivity while reducing operational costs.
              </p>
              <ul className="benefits__list">
                <li>
                  <span className="check">✓</span>
                  <div>
                    <strong>Increased Coverage</strong>
                    <span>Mitigate gaps and overlaps effectively.</span>
                  </div>
                </li>
                <li>
                  <span className="check">✓</span>
                  <div>
                    <strong>Better Signal Quality</strong>
                    <span>
                      Improved average signal strength across the network.
                    </span>
                  </div>
                </li>
                <li>
                  <span className="check">✓</span>
                  <div>
                    <strong>Cost Efficiency</strong>
                    <span>
                      Reduce CAPEX and OPEX through optimized planning.
                    </span>
                  </div>
                </li>
                <li>
                  <span className="check">✓</span>
                  <div>
                    <strong>Customer Satisfaction</strong>
                    <span>Enhanced quality of service for end-users.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="benefits__visual">
              <div className="visual-circle"></div>
              <div className="visual-card">
                <h4>ROI Impact</h4>
                <div className="chart-placeholder">
                  <div className="bar bar-1"></div>
                  <div className="bar bar-2"></div>
                  <div className="bar bar-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="landing__faq">
        <div className="landing__container">
          <div className="landing__section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Common questions about our technology</p>
          </div>
          <div className="faq__grid">
            <div className="landing__question">
              <h3>How does Mastpin determine optimal mast locations?</h3>
              <p>
                Mastpin uses metaheuristic algorithms such as Particle Swarm
                Optimization (PSO) or Genetic Algorithms (GA) to analyze
                population density and geographical data.
              </p>
            </div>
            <div className="landing__question">
              <h3>Can Mastpin be customized for specific regions?</h3>
              <p>
                Yes, our algorithms can be tailored to suit the unique
                characteristics of any region, optimizing according to local
                population distribution and terrain.
              </p>
            </div>
            <div className="landing__question">
              <h3>What is the expected impact?</h3>
              <p>
                Significant improvements in network coverage, signal strength,
                and overall quality of service, leading to enhanced customer
                satisfaction.
              </p>
            </div>
            <div className="landing__question">
              <h3>Is it suitable for 5G networks?</h3>
              <p>
                Absolutely. Mastpin is designed to handle the complex
                requirements of modern networks, including 4G, 5G, and IoT
                infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="landing__contact">
        <div className="landing__container">
          <div className="contact__card">
            <div className="contact-info">
              <div className="contact-info-header">
                <h2>Get in Touch</h2>
                <p>
                  Ready to optimize your network? Let's talk about how Mastpin
                  can help.
                </p>
              </div>

              <div className="contact-details">
                <div className="detail-item">
                  <div className="icon-box">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h5>Our Location</h5>
                    <span>123 Innovation Drive, Tech City</span>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="icon-box">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h5>Email Us</h5>
                    <span>support@mastpin.com</span>
                  </div>
                </div>
              </div>

              <div className="contact-decoration-circle"></div>
            </div>

            <form className="contact__form" onSubmit={contactFormSubmit}>
              <h3>Send a Message</h3>
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  ref={textareaRef}
                  placeholder="Tell us about your project..."
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                />
              </div>
              <button type="submit" className="submit-btn">
                <span>Send Message</span>
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section id="subscribe" className="landing__subscribe">
        <div className="landing__container">
          <div className="subscribe__content">
            <h2>Join Our Newsletter</h2>
            <p>Stay updated with the latest news and updates from Mastpin.</p>
            <form className="subscribe-form" onSubmit={subscribeFormSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={subscribeForm.email}
                onChange={(e) =>
                  setSubscribeForm({ ...subscribeForm, email: e.target.value })
                }
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
