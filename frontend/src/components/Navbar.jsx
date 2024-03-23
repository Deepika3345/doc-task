import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <nav className="navbar bg-body-tertiary border-bottom border-primary-subtle shadow-lg">
      <div className="container-fluid">
        <div className="container-fluid d-flex flex-row  align-items-center justify-content-between">
          <Link
            to={"/"}
            className="navbar-brand d-flex flex-row  align-items-center"
          >
            <img
              src={logo}
              alt="Logo"
              width="50"
              height="50"
              className="d-inline-block align-text-top"
            />
            Documents
          </Link>
          <span className="float-end">
            {!user ? (
              <Link to={"/login"} className=" btn btn-outline-dark btn-md ">
                Login
              </Link>
            ) : (
              <button className="btn btn-outline-danger" onClick={handleLogOut}>
                LogOut
              </button>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
