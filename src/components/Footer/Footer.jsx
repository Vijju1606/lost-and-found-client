import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>Lost & Found</h2>
          <p>
            Helping people reconnect with their belongings
            quickly and securely.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          
          <Link to="/found-items">Found Items</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>lostfound4362@gmail.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Lost & Found. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;