import React from 'react'
import {Link, useLocation} from 'react-router-dom';

// import footeremailimg from "../images/footer-email-img.jpg";
import footeremailimg from "../images/footer-email-img.jpg";

import './Footer1.css';

export default function Footer1() {

  const location = useLocation();
  
    const handleScroll = (id) => {
      if (location.pathname === "/") {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

  return (
    <div className="main" id='Contact'>

      <div className="footer-email-img" >
      <h1><strong>Share Your Progress!</strong></h1>
        <div className="footeremail">  
          <input type="email" placeholder="Enter Your Email Address" />
          <textarea name="" placeholder="Enter Your Sugession"></textarea> <br />
          <button type="submit">POST</button>
        </div>
      </div>

      <div className="footer-main">

        <div className="footer-content">
          <p className="footer-title">Career Builder</p>
          <p className="footer-title-content">We provide job opportunities, expert advice, and career growth resources.</p>
          <div className="footer-icons gap-3">
            <a href="https://www.facebook.com"><img className="footer-icon-facebook" width="50" height="50" src="https://img.icons8.com/ios-filled/50/facebook--v1.png" alt="facebook--v1"/></a>
          
            <a href="https://www.instagram.com"><img className="footer-icon-instagram" width="50" height="50" src="https://img.icons8.com/ios-filled/50/instagram-new--v1.png" alt="instagram-new--v1"/></a>
            <a href="https://www.x.com"><img className="footer-icon-x" width="50" height="50" src="https://img.icons8.com/ios-filled/50/twitterx--v1.png" alt="twitterx--v1"/></a>
          </div>
        </div>

        <div className="footer-content">
          <p className="footer-title">Quick Links</p>
          <ul>
            <li><Link to="/" onClick={(e) => { 
                if (location.pathname === "/") {
                e.preventDefault();  // Prevent navigation refresh
                handleScroll("Home");
                }}}>Home</Link></li>

            <li><Link to="/" onClick={(e) => {
                if (location.pathname === "/") {
                e.preventDefault();
                handleScroll("About");
                }}}>About</Link></li>

            <li><Link to="/" onClick={(e) => { 
                if (location.pathname === "/") {
                e.preventDefault();
                handleScroll("Contact");
                }}}>Contact</Link></li>

            <li><Link to="/" onClick={(e) => { 
                if (location.pathname === "/") {
                e.preventDefault();
                handleScroll("LoginPortal");
                }}}>Login</Link></li>

            <li><Link to="/AdminLogin">Admin</Link></li>
          </ul>
        </div>

        <div className="footer-content">
        <p className="footer-title-contact" >Contact Info</p>
        <div className="footer-icons-contact gap-3">
            <a href="https://maps.app.goo.gl/yLp5hGZcj2UBeCBi7"><img className="footer-contact" width="30" height="30" src="https://img.icons8.com/material-outlined/24/marker.png" alt="marker"/>Perur, Coimbatore</a>
          
            <a href="https://wa.me/8870316954"><img width="30" height="30" src="https://img.icons8.com/material-outlined/24/whatsapp--v1.png" alt="whatsapp--v1"/>+91 8870319654</a>
            <a href="mailto:ganeshsanjay8880@gmail.com"><img width="30" height="30" src="https://img.icons8.com/material-outlined/24/new-post.png" alt="new-post"/>ganeshsanjay8880@gmail.com</a>
          </div>
        </div>

      </div>
    </div>
  )
}
