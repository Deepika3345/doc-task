import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import NewDocument from "./screens/NewDocument";
import ViewDocuments from "./screens/ViewDocuments";
import DocDetail from "./screens/DocDetail";
import PrivateRoutes from "./components/PrivateRoutes";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/docs" element={<PrivateRoutes />}>
          <Route path="new-doc" element={<NewDocument />} />
          <Route path="view-doc" element={<ViewDocuments />} />
          <Route path="detail/:id" element={<DocDetail />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
