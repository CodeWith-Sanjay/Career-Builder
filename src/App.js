import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Header from './Front-End/HomePage/Header1';
import Home from './Front-End/HomePage/Home1';
import LoginPortal from './Front-End/HomePage/LoginPortal1';
import About from './Front-End/HomePage/About1';
import Footer from './Front-End/HomePage/Footer1';

import JobApplicantRegister from './Front-End/LoginPages/JobApplicantRegister';
import CompanyRegister from './Front-End/LoginPages/CompanyRegister';
import AdminLogin from './Front-End/LoginPages/AdminLogin';

import JobApplicantForm from './Front-End/LoginPages/JobApplicantForm';
import CompanyForm from './Front-End/LoginPages/CompanyForm';

import JobApplicantPage from './Front-End/PortalInterface/JobApplicantPage';
import CompanyPage from './Front-End/PortalInterface/CompanyPage';
import Admin from './Front-End/PortalInterface/Admin';

function App() {
  return (

    <Router>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <LoginPortal />
              <About />
              <Footer />
            </>
          }
        />

        {/* Portal Pages */}
        <Route
          path="/JobApplicantForm"
          element={
            <>
              <Header />
              <JobApplicantForm />
              <Footer />
            </>
          }
        />
        <Route
          path="/CompanyForm"
          element={
            <>
              <Header />
              <CompanyForm />
              <Footer />
            </>
          }
        />
        <Route
          path="/AdminLogin"
          element={
            <>
              <Header />
              <AdminLogin />
              <Footer />
            </>
          }
        />

        {/* Register Page for Job Applicant */}
        <Route
          path="/JobApplicantRegister"
          element={
            <>
              <Header />
              <JobApplicantRegister />
              <Footer />
            </>
          }
        />

        {/* Register Page for Company */}
        <Route
          path="/CompanyRegister"
          element={
            <>
              <Header />
              <CompanyRegister />
              <Footer />
            </>
          }
        />

        {/* Portal Interfaces */}
        <Route 
        path="/saveApplicantDetails" 
        element={
          <>
            <Header/>
            <JobApplicantPage />
            <Footer/>
          </>} />

        <Route
        path='/saveCompanyDetails'
        element={ 
        <>
          <Header/>
          <CompanyPage />
          <Footer />
        </>} 
        />
        
        <Route 
        path="/AdminInterface" 
        element={
          <>
            <Header />
            <Admin />
            <Footer/>
          </>} 
        />


        
      </Routes>
    </Router>

    // <Router>
    //   <Header />

    //   <Routes>
    //     {/* Homepage with LoginPortal */}
    //     <Route
    //       path="/"
    //       element={
    //         <>
    //           <Home />
    //           <LoginPortal />
    //           <About />
    //         </>
    //       }
    //     />

    //     {/* Other routes (with header/footer automatically) */}
    //     <Route
    //       path="/jobapplicantlogin"
    //       element={
    //         <>
    //           <JobApplicantForm />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/companylogin"
    //       element={
    //         <>
    //           <CompanyForm />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/adminlogin"
    //       element={
    //         <>
    //           <AdminLogin />
    //         </>
    //       }
    //     />
    //   </Routes>

    //   <Footer />
    // </Router>

  );
}

export default App;
