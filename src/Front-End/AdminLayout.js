import React from "react";
import Header1 from "./HomePage/Header1";
import Footer1 from "./HomePage/Footer1";

const AdminLayout = ({ children }) => {
  return (
    <>
      <Header1 />
      {children}
      <Footer1 />
    </>
  );
};

export default AdminLayout;
