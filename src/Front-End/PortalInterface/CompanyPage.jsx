import React,{useState, useEffect, useRef, detailsRef } from 'react'
import axios from 'axios';

import '../PortalInterface/CompanyPage.css';

export default function CompanyPage() {

    // State to manage which division is visible
    const [visibleDiv, setVisibleDiv] = useState('manageProfile');

    const [formData, setFormData] = useState({
      company_name: "",
      industry_type: "",
      company_description: "",
      email: "",
      company_phone: "",
      company_website: "",
      company_address: "",
      company_linkedin: "",
      company_social: "",
    });
  
    const [visible, setVisible] = useState(true);
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
        const response = await axios.get("http://localhost:5000/getCompanyDetails", {
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

        const response = await axios.post("http://localhost:5000/saveCompanyDetails", data, {
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


      <div className="company-container">
      
      {/* Buttons to toggle between divisions */}
      <div className="company-container-btn-grp">
      <button
        className={`button ${visibleDiv === "manageProfile" ? "active" : ""} company-container-btn1`}
        onClick={() => setVisibleDiv("manageProfile")}
      >
        MANAGE PROFILE
      </button>

      <button
        className={`button ${visibleDiv === "jobPosts" ? "active" : ""} company-container-btn2`}
        onClick={() => setVisibleDiv("jobPosts")}
      >
        POST JOBS
      </button>
      </div>

      {/* Conditionally render the divisions */}
      {visibleDiv === "manageProfile" && (
        <div className="job-container-content">
          {visible ? (
            <form onSubmit={handleSubmit} >
            <div className="company-container-form">
            <h2>Company Information</h2>
            <input type="text" name="company_name" className='company-form-input' placeholder="Company Name" value={formData.company_name} onChange={handleChange} />
            <input type="text" name="industry_type" className='company-form-input' placeholder="Industry Type" value={formData.industry_type} onChange={handleChange} />
            <textarea name="company_description" className='company-form-input' placeholder="Company Description" value={formData.company_description} onChange={handleChange}></textarea>
            </div>

            <div className="company-container-form">
            <h2>Contact Details</h2>
            <input type="email" name="email" className='company-form-input' placeholder="Email Address" value={formData.email} onChange={handleChange} />
            <input type="tel" name="company_phone" className='company-form-input' placeholder="Phone Number" value={formData.company_phone} onChange={handleChange} />
            <input type="url" name="company_website" className='company-form-input' placeholder="Website URL" value={formData.company_website} onChange={handleChange} />
            <input type="text" name="company_address" className='company-form-input' placeholder="Headquarters Address" value={formData.company_address} onChange={handleChange} />
            </div>

            <div className="company-container-form">
            <h2>Social Media & Branding</h2>
            <input type="url" className='company-form-input' name="company_linkedin" placeholder="LinkedIn Profile" value={formData.company_linkedin} onChange={handleChange}/>
            <input type="url" className='company-form-input' name="company_social" placeholder="Other Social Media Links" value={formData.company_social} onChange={handleChange}/>
            </div>
            <button type="submit" className='submit-btn'>Save Profile</button>
            </form>
            ) : (
              <div className='profile-details-container'>

          <h1>About Us</h1> <hr />
          <div className='profile-details'>
            <div className='properties'>
              <p><strong>Company Name</strong></p>
              <p><strong>Industry Type</strong></p>
              <p><strong>Description</strong></p>
            </div>
            <div className='values'>
            <p>{formData.company_name}</p>
            <p>{formData.industry_type}</p>
            <p>{formData.company_description}</p>
            </div>
          </div>
          <hr />

          <h1>About Contact</h1> <hr />
          <div className='profile-details'>
            <div className='properties'>
            <p><strong>Email Address</strong></p>
            <p><strong>Contact</strong></p>
            <p><strong>Address</strong></p>
            <p><strong>Website</strong></p>
            </div>
            <div className='values'>
            <p>{formData.email}</p>
            <p>{formData.company_phone}</p>
            <p>{formData.company_address}</p>
            <p>{formData.company_website}</p>
            </div>
          </div>
          <hr />

          <h1>Social Media & Branding</h1> <hr />
          <div className='profile-details'>
            <div className='properties'>
            <p><strong>LinkedIn</strong></p>
            <p><strong>Social</strong></p>
            </div>
            <div className='values'>
            <p><a href={formData.company_linkedin}>{formData.company_linkedin}</a></p>
            <p><a href={formData.company_social}>{formData.company_social}</a></p>
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
  )
}
