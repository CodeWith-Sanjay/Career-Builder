import React from 'react'

import admincarousel from "../images/admin-carousel.webp";
import admincarousel2 from "../images/admin-carousel2.jpeg";
import companycarousel from "../images/company-carousel.jpeg";
import jobcarousel from "../images/job-carousel.jpeg";
import teamcarousel from "../images/team-carousel.jpeg";
// import admincarousel from "./images/admin-carousel.webp";
// import admincarousel2 from "./images/admin-carousel2.jpeg";
// import companycarousel from "./images/company-carousel.jpeg";
// import jobcarousel from "./images/job-carousel.jpeg";
// import teamcarousel from "./images/team-carousel.jpeg";

import './Home1.css';

export default function Home1() {
  return (
    // carousel image
    <div className="main" id="Home">
      <div className="home-content gap-5 pt-5">

        <div className="home-quote">
          <h7 >GET STARTED TODAY</h7>
          <p className="home-quote-para">Your Career is a Reflection of your Dedication, Vision, and Resilence!</p>
        </div>

        <div className="home-carousel">
          <div
            id="carouselExampleInterval"
            class="carousel slide "
            data-bs-ride="carousel"
          >
            <div class="carousel-inner carousel-img ">
              <div class="carousel-item active" data-bs-interval="3000">
                <img src={admincarousel} class="d-block" alt="admin1" />
              </div> 

              <div class="carousel-item" data-bs-interval="3000">
                <img src={admincarousel2} class="d-block" alt="admin2" />
              </div>

              <div class="carousel-item " data-bs-interval="3000">
                <img src={companycarousel} class="d-block" alt="company" />
              </div>

              <div class="carousel-item" data-bs-interval="3000">
                <img src={teamcarousel} class="d-block" alt="teamcollab" />
              </div>

              <div class="carousel-item " data-bs-interval="3000">
                <img src={jobcarousel} class="d-block" alt="job" />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
