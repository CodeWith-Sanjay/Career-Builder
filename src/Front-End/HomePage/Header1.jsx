import React from 'react'
import { Link, useLocation } from 'react-router-dom';

import './Header1.css';

export default function Header1() {

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
    <div className="main" >
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <div className="ps-4 header">
              CAREER <br /> BUILDER{" "}
            </div>
          <button
            className="navbar-toggler main-nav-btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>


          <div className="collapse navbar-collapse main-nav ms-5" id="navbarNavAltMarkup">
            <div className="navbar-nav">

              <Link to="/" onClick={(e) => { 
                  if (location.pathname === "/") {
                  e.preventDefault();  // Prevent navigation refresh
                  handleScroll("Home");
                  }}} className="active main-nav-menu" aria-current="page">Home</Link>
              <Link to="/" onClick={(e) => { 
                  if (location.pathname === "/") {
                  e.preventDefault();
                  handleScroll("About");
                  }}}  className="active main-nav-menu">About</Link>
              <Link to="/" onClick={(e) => { 
                  if (location.pathname === "/") {
                  e.preventDefault();
                  handleScroll("Contact");
                  }}} className="active main-nav-menu">Contact</Link>

              <Link to="/AdminLogin" class="main-nav-btn2">
              <button className="active main-nav-btn">
                Admin
              </button>
              </Link>

              <Link to="/" onClick={(e) => { 
                  if (location.pathname === "/") {
                  e.preventDefault();
                  handleScroll("LoginPortal");
                  }}}  class="main-nav-btn2"><button className="active main-nav-btn">
                Login
              </button></Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

