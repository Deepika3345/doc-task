import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { editDoc, fetchDoc, removeDoc } from "../features/docs/docSlice";
import { Link } from "react-router-dom";

const DocDetail = () => {
  const { docs } = useSelector((state) => state.docs);
  // console.log("docs",docs)
  const navigate = useNavigate();

  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDoc(params.id));
  }, [params.id]);
  const handleDlt = () => {
    dispatch(removeDoc(params.id));
    navigate("/docs/view-doc");
  };


  const handleEdit = (data) => {
    // console.log("data",data)
    dispatch(editDoc(data));
    navigate("/docs/new-doc");
  };

  return (
    <div className="container ">
      <div className="d-flex justify-content-center align-items-center">
        <div className="card m-5" style={{ width: "18rem" }}>
          <img src={"https://doc-task.onrender.com/" + docs.img} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{docs.title}</h5>
            <p className="card-text">{docs.description}</p>
            <span className="float-end">
             
                <button
                  className="btn btn-sm btn-outline-warning mx-2"
                  onClick={()=> handleEdit(docs)}
                >
                  Edit
                </button>
            
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDlt(docs.id)}
              >
                Delete
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocDetail;
