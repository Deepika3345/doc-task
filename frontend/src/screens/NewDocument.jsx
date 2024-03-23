import React, { useEffect, useState } from "react";
import filelogo from "../assets/filelogo.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createNewDoc, editDoc, updateDoc } from "../features/docs/docSlice";

const NewDocument = () => {
  const { edit } = useSelector((state) => state.docs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(edit)

  // create doc

  const [formData, setFormData] = useState({
    img: null,
    title: "",
    description: "",
  });
  const { img, title, description } = formData;
  // edit
  useEffect(() => {
    if (edit.isedit) {
      setFormData({
        title: edit.edit.title,
        description: edit.edit.description,
      });
    }
  }, [edit]);

  // _______
  const handleChange = (e) => {
    if (e.target.name === "img") {
      setFormData({
        ...formData,
        img: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formDataForRequest = new FormData(); // Create FormData object
    formDataForRequest.append("img", img); // Append the image file
    formDataForRequest.append("title", title); // Append the title
    formDataForRequest.append("description", description); // Append the description

    try {
      if (edit.isedit) {
        const data = {
          ...edit.edit,
          title: title,
          description: description,
        };
        await dispatch(
          updateDoc(data)
        );
        console.log("success editing");
      } else {
        await dispatch(createNewDoc(formDataForRequest));
        // console.log("success");
        // toast.success("Document created successfully");
      }
      navigate("/docs/view-doc");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="p-5">
      <form className="form-control p-5" onSubmit={handlesubmit}>
        <input
          type="text"
          className="form-control m-2"
          placeholder="Enter Title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <textarea
          className="form-control m-2"
          placeholder="Enter Description "
          name="description"
          value={description}
          onChange={handleChange}
        ></textarea>
        <div
          className="img-container p-3 w-50 rounded-4 d-flex justify-content-between align-items-center flex-column"
          style={{ gap: "10px", boxShadow: "4px 4px 30px rgba(0, 0, 0, .2)" }}
        >
          <div
            className="img-header w-100 border border-info-subtle d-flex justify-content-between align-items-center flex-column"
            style={{ borderRadius: "10px" }}
          >
            <img src={filelogo} alt="filelogo" className="w-50" />
          </div>
          <label
            htmlFor="file"
            className="bg-primary-subtle text-center w-100 p-1"
          >
            <span className="">Select File</span>
            <input
              id="file"
              type="file"
              className="d-none"
              name="img"
              onChange={handleChange}
              accept="image/*"
            />
          </label>
        </div>
        <button className="btn btn-lg w-100 btn-outline-dark my-2">
          create
        </button>
      </form>
    </div>
  );
};

export default NewDocument;
