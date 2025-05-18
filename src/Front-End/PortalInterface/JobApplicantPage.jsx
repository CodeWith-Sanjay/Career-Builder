import React, { useState, useEffect, useRef, detailsRef } from 'react';
import axios from 'axios';
import '../PortalInterface/JobApplicantPage.css';

export default function JobApplicantPage() {
    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        location: "",
        linkedin: "",
        portfolio: "",
        job_title: "",
        company: "",
        start_date: "",
        end_date: "",
        responsibilities: "",
        degree: "",
        university: "",
        graduation_year: "",
        skills: "",
        certification_name: "",
        issuing_organization: "",
        certification_date: "",
        project_name: "",
        project_link: "",
        project_description: "",
        resume_file: "",
        github: "",
        behance: "",
      });
    
      const [visible, setVisible] = useState(true);
      const [visibleDiv, setVisibleDiv] = useState('manageProfile');
      const [token, setToken] = useState("");
    
      useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          fetchData(storedToken);
        }
      }, []);
    
      const fetchData = async (authToken) => {
        try {
          const response = await axios.get("http://localhost:5000/getApplicantDetails", {
            headers: { Authorization: `Bearer ${authToken}` },
          });
      
          if (response.data) {
            // If the response contains the data, set it to the formData state
            setFormData(response.data);
            setVisible(false); // Hides the form since the data is already loaded
          } else {
            console.log("No data found for the user.");
            // Optionally, you could add a state to handle empty responses
            setVisible(true);
          }
        } catch (err) {
          console.error("Error fetching data", err);
          // Optionally, set some error state for display in the UI
        }
      };
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "resume_file") {
          setFormData({ ...formData, resume_file: files[0] });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = new FormData();
          for (const key in formData) {
            data.append(key, formData[key]);
          }
    
          const token = localStorage.getItem("token"); // or sessionStorage.getItem("token")

          const response = await axios.post("http://localhost:5000/saveApplicantDetails", data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data"
            }
          });
    
          if (response.status === 200) {
            setVisible(false);
          }
        } catch (err) {
          console.error("Error submitting form", err);
        }
      };

  return (
    <div>

      <div className="search">
        <input type="search" className='search-bar' placeholder='Search Here...'/>
        <input type="button" value={'Search'} className='search-btn'/>
      </div>

      <div className="job-container">
      
      {/* Buttons to toggle between divisions */}
      <div className="job-container-btn-grp">
      <button
        className={`button ${visibleDiv === "manageProfile" ? "active" : ""} job-container-btn1`}
        onClick={() => setVisibleDiv("manageProfile")}
      >
        MANAGE PROFILE
      </button>
      
      <button
        className={`button ${visibleDiv === "jobPosts" ? "active" : ""} job-container-btn2`}
        onClick={() => setVisibleDiv("jobPosts")}
      >
        POST JOBS
      </button>
      </div>

      {visibleDiv === "manageProfile" && (
        <div className="job-container-content">
          {visible ? (
        <form onSubmit={handleSubmit} className='job-container-form'>
          <h2>Personal Details</h2>
          <input type="text" name="full_name" className='job-form-input' placeholder="Full Name" value={formData.full_name} onChange={handleChange} />
          <input type="text" name="phone" className='job-form-input' placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <input type="text" name="location" className='job-form-input' placeholder="Location" value={formData.location} onChange={handleChange} />
          <input type="text" name="linkedin" className='job-form-input' placeholder="LinkedIn" value={formData.linkedin} onChange={handleChange} />
          <input type="text" name="portfolio" className='job-form-input' placeholder="Portfolio" value={formData.portfolio} onChange={handleChange} />
          
          <h2>Work Experience</h2>
          <input type="text" name="company" className='job-form-input' placeholder="Company" value={formData.company} onChange={handleChange} />
          <input type="text" name="job_title" className='job-form-input' placeholder="Job Title" value={formData.job_title} onChange={handleChange} />
          <input type="date" name="start_date" className='job-form-input' value={formData.start_date} onChange={handleChange} />
          <input type="date" name="end_date" className='job-form-input' value={formData.end_date} onChange={handleChange} />
          <textarea name="responsibilities" className='job-form-input' placeholder="Responsibilities" value={formData.responsibilities} onChange={handleChange} />

          <h2>Education Details</h2>
          <input type="text" name="degree" className='job-form-input' placeholder="Degree" value={formData.degree} onChange={handleChange} />
          <input type="text" name="university" className='job-form-input' placeholder="University" value={formData.university} onChange={handleChange} />
          <input type="text" name="graduation_year" className='job-form-input' placeholder="Graduation Year" value={formData.graduation_year} onChange={handleChange} />
          <input type="text" name="skills" className='job-form-input' placeholder="Skills" value={formData.skills} onChange={handleChange} />
          <input type="text" name="certification_name" className='job-form-input' placeholder="Certification Name" value={formData.certification_name} onChange={handleChange} />
          <input type="text" name="issuing_organization" className='job-form-input' placeholder="Issuing Organization" value={formData.issuing_organization} onChange={handleChange} />
          <input type="date" name="certification_date" className='job-form-input' value={formData.certification_date} onChange={handleChange} />

          <h2>Project Details</h2>
          <input type="text" name="project_name" className='job-form-input' placeholder="Project Name" value={formData.project_name} onChange={handleChange} />
          <input type="text" name="project_link" className='job-form-input' placeholder="Project Link" value={formData.project_link} onChange={handleChange} />
          <textarea name="project_description" className='job-form-input' placeholder="Project Description" value={formData.project_description} onChange={handleChange} />

          <h2>Social</h2>
          <input type="text" name="github" className='job-form-input' placeholder="GitHub" value={formData.github} onChange={handleChange} />
          <input type="text" name="behance" className='job-form-input' placeholder="Behance" value={formData.behance} onChange={handleChange} />
          <input type="file" name="resume_file" className='job-form-input' onChange={handleChange} />
          <button type="submit" className='submit-btn'>Save Profile</button>
        </form>
      ) : (

        <div className='profile-details-container'>

          <h1>About Me</h1> <hr />
          <div className='profile-details'>
            <div className='properties'>
              <p><strong>Name</strong></p>
              <p><strong>Contact</strong></p>
              <p><strong>From</strong></p>
              <p><strong>LinkedIN</strong></p>
              <p><strong>Portfolio</strong></p>
            </div>
            <div className='values'>
            <p>{formData.full_name}</p>
            <p>{formData.phone}</p>
            <p>{formData.location}</p>
            <p><a href={formData.linkedin}>{formData.linkedin}</a></p>
            <p><a href={formData.portfolio}>{formData.portfolio}</a></p>
            </div>
          </div>
          <hr />

          <h1>About Study</h1> <hr />
          <div className='profile-details'>
            <div className='properties'>
            <p><strong>Degree</strong></p>
            <p><strong>University</strong></p>
            <p><strong>Graduation Year</strong></p>
            <p><strong>Skills</strong></p>
            <p><strong>Certification</strong></p>
            <p><strong>Issuing Organization</strong></p>
            <p><strong>Certification Date</strong></p>
            </div>
            <div className='values'>
            <p>{formData.degree}</p>
            <p>{formData.university}</p>
            <p>{formData.graduation_year}</p>
            <p>{formData.skills}</p>
            <p>{formData.certification_name}</p>
            <p>{formData.issuing_organization}</p>
            <p>({formData.certification_date})</p>
            </div>
          </div>
          <hr />

          <h1>My Works</h1> <hr />
          <div className='profile-details'>
            <div className='properties'>
            <p><strong>Project</strong></p>
            <p><strong>Project Link</strong></p>
            <p><strong>Description</strong></p>
            </div>
            <div className='values'>
            <p>{formData.project_name}</p>
            <p><a href={formData.project_link}>{formData.project_link}</a></p>
            <p>{formData.project_description}</p>
            </div>
          </div>
          <hr />

          <h1>Experience</h1> <hr />
          <div className='profile-details'>
            <div className='properties'>
            <p><strong>Job Title</strong></p>
            <p><strong>Company</strong></p>
            <p><strong>Start Date</strong></p>
            <p><strong>End Date</strong></p>
            <p><strong>Responsibilities</strong></p>
            </div>
            <div className='values'>
            <p>{formData.job_title}</p>
            <p>{formData.company}</p>
            <p>{formData.start_date}</p>
            <p>{formData.end_date}</p>
            <p>{formData.responsibilities}</p>
            </div>
          </div>
          <hr />

          <h1>Social</h1> <hr />
          <div className='profile-details'>
            <div className='properties'>
            <p><strong>GitHub</strong></p>
            <p><strong>Behance</strong></p>
            <p><strong>Resume</strong></p>
            </div>
            <div className='values'>
            <p><a href={formData.github}>{formData.github}</a></p>
            <p><a href={formData.behance}>{formData.behance}</a></p>
            <p>{formData.resume_file ? formData.resume_file.name || formData.resume_file : "Uploaded"}</p>
            </div>
          </div>
          <hr />
          

          <button onClick={() => setVisible(true)} className='submit-btn'>Edit Profile</button>
        </div>)}
        </div>
      )}


      {visibleDiv === "jobPosts" && (
        <div className="company-container-content">
          <h2>Hello World</h2>
        </div>
      )}

      </div>
    </div>
  );
}


