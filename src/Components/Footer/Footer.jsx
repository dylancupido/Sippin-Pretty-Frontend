import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="brand-section">
            <div className="footer-logo">
              <h2>Sippin' Pretty</h2>
              <div className="logo-accent"></div>
            </div>
            <p className="footer-description">
              Experience the perfect blend of elegance and flavor at Sippin' Pretty.
              Where every sip tells a story and every moment becomes a memory.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="TikTok">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/menu" className="footer-link">Menu</Link></li>
              <li><Link to="/booking" className="footer-link">Reservations</Link></li>
              <li><Link to="/aboutus" className="footer-link">About Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Dine In</a></li>
              <li><a href="#" className="footer-link">Takeaway</a></li>
              <li><a href="#" className="footer-link">Delivery</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt contact-icon"></i>
                <span>123 Pretty Street<br />Mowbray, Cape Town, 7700</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone contact-icon"></i>
                <span>021 694 1960</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope contact-icon"></i>
                <span>sippinpretty07@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock contact-icon"></i>
                <span>Mon-Sun: 9AM - 4PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} Sippin' Pretty. All rights reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <a href="#" className="footer-bottom-link">Terms of Service</a>
              <a href="#" className="footer-bottom-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

