import React from 'react'


import './LoginPortal1.css';
import './Home1.jsx';
import './Header1.jsx';
import JobApplicantForm from '../LoginPages/JobApplicantForm.jsx';

export default function LoginPortal1() {
  return (
    <div className='main' id='LoginPortal'>

        {/* <h1>Hello World</h1> */}

        <div className='pt-4 form-portal gap-5 p-5'>
            <div className="jobapplicantform">
                <p className='portal-font'>For Job Applicants</p>
                <p className="portal-quote">
                    Your Dream Job Starts Here!
                </p><br />
                <a className='portal-btn' href="JobApplicantForm">Step Forward</a>
            </div>

            <div className="companyform ">
                <p className='portal-font'>For Company</p>
                <p className="portal-quote">
                    Empowering Talent to Shape the Future!
                </p> <br />
                <a className='portal-btn' href="CompanyForm">Enter Workspace</a>
            </div>

        </div>

      
    </div>
  )
}
