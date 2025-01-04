import React from "react";
import "./footer.scss"; // SCSS for styling

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        {/* Logo and About Section */}
        <div className="footer-section">
          <h3 className="footer-logo">Foodie's Delight</h3>
          <p>
            Explore our delicious range of dishes, customize your meals, and
            enjoy the best food experience.
          </p>
        </div>


        {/* Contact Information */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>📞 +91 12345 6789</p>
          <p>📧 support@foodiesdelight.com</p>
          <p>🏠 123 Food Street, Ahmedabad City</p>
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-section">
          <h4>Subscribe to Our Newsletter</h4>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <hr className="footer-divider" />
      <p className="footer-copy">
        © {new Date().getFullYear()} Foodie's Delight. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
