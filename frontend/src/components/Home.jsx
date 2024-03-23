import React from "react";
import { Link } from "react-router-dom";
import gif from '../assets/gif6.gif'

const Home = () => {
  return (
    // <div className="box p-5 d-flex justify-content-center align-items-center ">
    <div className="container d-flex  align-items-center flex-row">
      <div className="img-area w-50 p-2">
        <img className="" src={gif} alt="" />

      </div>
      <div className="text-area w-50 p-5 ">
        <span>
          <Link
            to={"/docs/new-doc"}
            className=" btn btn-lg btn-outline-secondary w-100 m-2 rounded-5"
          >
            Create Document
          </Link>
          <Link
            to={"/docs/view-doc"}
            className="btn btn-lg btn-outline-success w-100 m-2 rounded-5"
          >
            View Your Document
          </Link>
        </span>
      {/* </div> */}
    </div>

    </div>
    
      
  );
  c;
};

export default Home;
