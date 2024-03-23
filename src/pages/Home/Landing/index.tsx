import "./Landing.css";
import { Link, useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaSignal, FaUsers } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

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
  };

  const subscribeFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeForm.email) return toast.error("Email is required");
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
      <section id="hero" className="landing__hero">
        <div className="landing__container">
          <h1>Welcome to Mastpin</h1>
          <p>
            Your solution for optimal mast placement and enhanced network
            coverage
          </p>
          <Link to={"/auth/register"} className="landing__cta">
            Get Started
          </Link>
        </div>
      </section>

      <section id="about" className="landing__about">
        <div className="landing__container">
          <h2>About Mastpin</h2>
          <p>
            Mastpin is a revolutionary system designed to optimize the placement
            of telecommunication masts, ensuring maximum coverage, signal
            strength, and load balance.
          </p>
          <p>
            Traditional mast placement often leads to coverage gaps, poor signal
            distribution, and network congestion. Mastpin aims to address these
            challenges by employing advanced algorithms to strategically
            position masts based on population density and geographical
            features.
          </p>
          <p>
            With Mastpin, telecom companies can enhance their network quality,
            reduce operational costs, and ultimately provide better service to
            their customers.
          </p>
        </div>
      </section>

      <section id="features" className="landing__features">
        <div className="landing__container">
          <h2>Key Features</h2>
          <div className="landing__feature">
            <FaMapMarkerAlt className="landing__icon" />
            <div>
              <h3>Optimized Mast Placement</h3>
              <p>
                Utilize our metaheuristic algorithms to determine the most
                strategic locations for mast installation, minimizing coverage
                gaps and overlaps.
              </p>
            </div>
          </div>
          <div className="landing__feature">
            <FaSignal className="landing__icon" />
            <div>
              <h3>Enhanced Signal Strength</h3>
              <p>
                Improve signal quality and distribution by strategically placing
                masts to maximize coverage and minimize signal attenuation.
              </p>
            </div>
          </div>
          <div className="landing__feature">
            <FaUsers className="landing__icon" />
            <div>
              <h3>Load Balancing</h3>
              <p>
                Balance network load between masts to reduce congestion and
                ensure optimal performance across the entire network.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="landing__benefits">
        <div className="landing__container">
          <h2>Benefits of Using Mastpin</h2>
          <ul>
            <li>
              Increased coverage and mitigation of coverage gaps and overlaps
            </li>
            <li>
              Improved average signal strength, leading to better signal quality
            </li>
            <li>
              Reduced load variance, resulting in balanced network load and
              reduced congestion
            </li>
            <li>Enhanced overall quality of service for telecom customers</li>
            <li>
              Cost savings through optimized mast placement and reduced
              operational expenses
            </li>
          </ul>
        </div>
      </section>

      <section id="faq" className="landing__faq">
        <div className="landing__container">
          <h2>Frequently Asked Questions</h2>
          <div className="landing__question">
            <h3>How does Mastpin determine optimal mast locations?</h3>
            <p>
              Mastpin uses metaheuristic algorithms such as Particle Swarm
              Optimization (PSO) or Genetic Algorithms (GA) to analyze
              population density and geographical data, ensuring strategic mast
              placement.
            </p>
          </div>
          <div className="landing__question">
            <h3>Can Mastpin be customized for specific regions?</h3>
            <p>
              Yes, Mastpin's algorithms can be tailored to suit the unique
              characteristics of any region, optimizing mast placement according
              to local population distribution and terrain.
            </p>
          </div>
          <div className="landing__question">
            <h3>What is the expected impact of using Mastpin?</h3>
            <p>
              By utilizing Mastpin, telecom companies can expect to see
              significant improvements in network coverage, signal strength, and
              overall quality of service, leading to enhanced customer
              satisfaction and loyalty.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="landing__contact">
        <div className="landing__container">
          <h2>Contact Us</h2>
          <p>
            Have questions or want to learn more about Mastpin? Reach out to us!
          </p>
          <form className="landing__form" onSubmit={contactFormSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={contactForm.name}
              onChange={(e) =>
                setContactForm({ ...contactForm, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Your Email"
              value={contactForm.email}
              onChange={(e) =>
                setContactForm({ ...contactForm, email: e.target.value })
              }
            />
            <textarea
              ref={textareaRef}
              placeholder="Your Message"
              value={contactForm.message}
              onChange={(e) =>
                setContactForm({ ...contactForm, message: e.target.value })
              }
            />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      <section id="subscribe" className="landing__subscribe">
        <div className="landing__container">
          <h2>Join Our Email List</h2>
          <p>
            Stay updated with the latest news and updates from Mastpin by
            subscribing to our newsletter.
          </p>
          <form className="landing__form" onSubmit={subscribeFormSubmit}>
            <input
              type="email"
              placeholder="Your Email"
              value={subscribeForm.email}
              onChange={(e) =>
                setSubscribeForm({ ...subscribeForm, email: e.target.value })
              }
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Landing;
