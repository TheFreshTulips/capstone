import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { TaskContext } from "../App.js";

const Header = () => {
  const tc = useContext(TaskContext);

  return (
    <div className="layoutHeader">

      <Link to="/">
        <div className="buttonToMainContainer">
          <button className="buttonToMain"> Taskify </button>
        </div>
      </Link>

      <div className="navButtons">
        {
          tc.isAdmin ?
            <Link to={`/admin`}>
              <button className="toAdmin">Admin</button>
            </Link>
            :
            <></>
        }

        {
          tc.userId !== null ?
            <>
              <Link to={`/unit`}>
                <button className="toUnitTasks"> Unit Tasks </button>
              </Link>

              <Link to={`/reports`}>
                <button className="toReports"> Reports </button>
              </Link>

              <Link to={`/archive`}>
                <button className="toArchive"> Archive </button>
              </Link>

              <Link to={`/profile`}>
                <button className="toProfile"> Profile </button>
              </Link>
            </>
            :
            <>
              <Link to={`/login`}>
                <button className="toLogin"> Login </button>
              </Link>
            </>
        }

      </div>
    </div>
  );
};

export default Header;
