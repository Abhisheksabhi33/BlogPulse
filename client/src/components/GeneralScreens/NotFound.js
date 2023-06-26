import React from "react";
import "../../Css/NotFound.css"
const NotFound = () => (
  <>
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="display-4 mt-2">404 - Page Not Found</h1>
          <p className="lead">Oops! The page you are looking for does not exist.</p>
          <a href="/" className="btn btn-primary mb-4">Go to Home</a>
        </div>
      </div>
    </div>


  </>

);

export default NotFound;