import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">LOGO</div>
      <div className="footer-about">
        <p>Established in 2016, this brand was built for those who dare to stand out and stay authentic.</p>
        <p>In just a few short years, it has grown from a local idea into a global movement in menswear fashion.</p>
        <p>Each collection is crafted to make a bold statement—fearless, unapologetic, and uniquely you.</p>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h3>Shop</h3>
          <ul>
            <li>Leather</li>
            <li>Denim</li>
            <li>Puffer</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Customer Support</h3>
          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;