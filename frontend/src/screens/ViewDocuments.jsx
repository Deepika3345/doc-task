import React, { useEffect } from "react";
import DocRows from "../components/DocRows";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocs } from "../features/docs/docSlice";

const ViewDocuments = () => {
  const { documents } = useSelector((state) => state.docs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDocs());
  }, []);

  return (
    <div className="container">
      {documents.length === 0 ? (
        <div className="p-5 text-center">
          <h1 className="text-secondary">No Documents Available</h1>
        </div>
      ) : (
        <div className="p-3">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Create</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <DocRows key={doc._id} index={index} doc={doc} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewDocuments;
