import React from 'react'

import './About1.css';

export default function About1() {
  return (
    <div>
        <div className="main pb-5 pt-4" id='About'>
        
        <h5 className="about-font">WORK ANYWHERE</h5>
        <h2 className="about-font pb-4">
          <strong>TRENDING CATEGORIES</strong>
        </h2>
  
        <div className="about-content p-4 gap-3">
          <div className="about-box">
              <div className="aboutbox-img ps-2 m-2">
              <img width="35" height="35" src="https://img.icons8.com/ios-filled/50/google-code.png" alt="google-code"/>
              </div>
              <div className="aboutbox-info p-2">
                <h5><strong>Development & IT</strong></h5> <br></br>
                <h8>Frontend, Backend, Web and app developer jobs</h8>
              </div>
          </div>
  
          <div className="about-box">
          <div className="aboutbox-img ps-2 m-2">
              <img width="35" height="35" src="https://img.icons8.com/forma-regular/100/goal.png" alt="goal"/>
              </div>
              <div className="aboutbox-info p-2">
                <h5><strong>Marketing & Sales</strong></h5> <br></br>
                <h8>Advertising, digital marketing and brand...</h8>
              </div>
          </div>
  
          <div className="about-box ">
          <div className="aboutbox-img ps-2 m-2">
              <img width="35" height="35" src="https://img.icons8.com/forma-light-filled/24/creativity-and-resourcefulness.png" alt="creativity-and-resourcefulness"/>
              </div>
              <div className="aboutbox-info p-2">
                <h5><strong>Design & Creative</strong></h5> <br></br>
                <h8>Graphic, digital, web, and product design jobs</h8>
              </div>
          </div>
  
          <div className="about-box">
          <div className="aboutbox-img ps-2 m-2">
              <img width="35" height="35" src="https://img.icons8.com/forma-thin-filled/24/gender-neutral-user.png" alt="gender-neutral-user"/>
              </div>
              <div className="aboutbox-info p-2">
                <h5><strong>Customer Service</strong></h5> <br></br>
                <h8>Customer experience and account management jobs</h8>
              </div>
          </div>
        </div>
  
      </div>



      {/* About Extension */}
      <div className="main p-3">

      <h5 className="about-font">ABOUT US</h5>
      <h2 className="about-font pb-4">
        <strong>HOW WE WORKS</strong>
      </h2>

      <div className="about-content2 p-3 mb-3">
        <div className="aboutbox2">
        
            <div className="aboutbox-info p-2">
              
              <h5><strong>HOME</strong></h5> <br></br>
              <h8>
              <strong>Welcome to Career Builder: </strong><br />Your career journey starts here. Access tools, job opportunities, and 
              expert  advice to build your dream career. Starts exploring now!</h8>
            </div>
        </div>
        <div className="aboutbox2">
        
            <div className="aboutbox-info p-2">
              <h5><strong>ABOUT</strong></h5> <br></br>
              <h8><strong>Who We Are: </strong><br />We empower individuals to succeed by offering career guidance, skill-building resources,
              and job opportunities. Join us to unlock your potential!</h8>
            </div>
        </div>
        <div className="aboutbox2">
    
            <div className="aboutbox-info p-2">
              <h5><strong>JOBS</strong></h5> <br></br>
              <h8><strong>Find Your Job: </strong><br />Browse the latest job openings and connect with top companies. Get started today and 
              take the next step in your career.</h8>
            </div>
        </div>
        <div className="aboutbox2">
        
            <div className="aboutbox-info p-2">
              <h5><strong>RESOURCES</strong></h5> <br></br>
              <h8><strong>Career Tools & Tips: </strong><br />Access essential resources like resume builders, interview tips, and career advice
              to boost your job search and growth.</h8>
            </div>
        </div>
      </div>
    </div>
      
    </div>
  )
}
