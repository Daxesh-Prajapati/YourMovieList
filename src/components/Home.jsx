import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useConfig } from "./ConfigContent";

function Home() {
  const { URL, token } = useConfig();
  console.log("Home URL:", URL);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const [pageNo, setPageNo] = useState(1);

  function incresePageNo() {
    setPageNo(pageNo + 1);
  }

  function decreasePageNo() {
    if (pageNo === 1) {
      setPageNo(1);
    } else {
      setPageNo(pageNo - 1);
    }
  }

  return (
    <div className="home-container">
      <nav className="home-navbar">
        <Link to="/movies">MOVIES</Link>
        <Link to="/tv">TV SERIES</Link>
      </nav>
      <Outlet context={{ URL, options, pageNo }} />

      {/* page number controls */}
      <div className="pagechanger">
        <button className="page-changer-button " onClick={decreasePageNo}>
          &lt;
        </button>
        <p className="page-number-indicator">{parseInt(pageNo, 10)}</p>
        <button className="page-changer-button" onClick={incresePageNo}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Home;
