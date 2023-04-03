import React from "react";
import Layout from "../Components/Layout";

const PageNotFound = () => {
  const image = "https://sudoedit.com/img/page_not_found.jpg";
  return (
    <Layout>
      <div className="container">
        <img src={image} alt="Page NOT Found" />
      </div>
    </Layout>
  );
};

export default PageNotFound;
