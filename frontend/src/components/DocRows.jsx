import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DocRows = ({ doc, index }) => {
  const navigate = useNavigate();

  return (
    <>
      {!doc ? (
        <div className="container">
          <h1>No doc here</h1>
        </div>
      ) : (
        <>
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{doc.title}</td>
            <td>{new Date(doc.createdAt).toLocaleDateString("en-IN")}</td>
            <td>
              <Link to={`/docs/detail/${doc._id}`}>
                <span className="badge text-bg-dark">View</span>
              </Link>
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default DocRows;
