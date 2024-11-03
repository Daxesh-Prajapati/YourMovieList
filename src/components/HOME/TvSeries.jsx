import React, { useState, useEffect } from "react";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import TvCard from "./TvCard.jsx";

function TvSeries({ addToWatchlist, addToFavorite }) {
  const { URL, options, pageNo } = useOutletContext();
  const location = useLocation();

  const [data, setdata] = useState([]);

  useEffect(() => {
    let endpoint = "";

    switch (location.pathname) {
      case "/tv/airingToday":
        endpoint = `airing_today?page=${pageNo}`;
        break;
      case "/tv/onTheAir":
        endpoint = `on_the_air?page=${pageNo}`;
        break;
      case "/tv/popular":
        endpoint = `popular?page=${pageNo}`;
        break;
      case "/tv/topRated":
        endpoint = `top_rated?page=${pageNo}`;
        break;
      default:
        endpoint = `airing_today?page=${pageNo}`;
    }

    const fetchUrl = `${URL}/tv/${endpoint}`;

    fetch(fetchUrl, options)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setdata(result.results);
      })
      .catch((err) => console.error("error:" + err));
  }, [pageNo, location.pathname]);

  return (
    <>
      <nav className="movie-navbar">
        <Link to="/tv/airingToday">Aring Today</Link>
        <Link to="/tv/onTheAir">On The Air</Link>
        <Link to="/tv/popular">Popular </Link>
        <Link to="/tv/topRated">Top Rated</Link>
      </nav>
      {/* to display movie cards */}
      <div className="movie-container">
        {data.map((tvObj) => (
          <TvCard
            key={tvObj.id}
            tvObj={tvObj}
            addToWatchlist={addToWatchlist}
            addToFavorite={addToFavorite}
          />
        ))}
      </div>
    </>
  );
}

export default TvSeries;
