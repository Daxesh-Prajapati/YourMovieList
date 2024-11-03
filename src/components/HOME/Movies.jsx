import React, { useEffect, useState } from "react";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movies({ addToWatchlist, addToFavorite }) {
  const { URL, options, pageNo } = useOutletContext();
  const location = useLocation();
  // console.log("location", location);

  const [data, setData] = useState([]);

  useEffect(() => {
    let endpoint = "";

    switch (location.pathname) {
      case "/movies/nowPlaying":
        endpoint = `now_playing?page=${pageNo}`;
        break;
      case "/movies/popular":
        endpoint = `popular?page=${pageNo}`;
        break;
      case "/movies/topRated":
        endpoint = `top_rated?page=${pageNo}`;
        break;
      case "/movies/upcoming":
        endpoint = `upcoming?page=${pageNo}`;
        break;
      default:
        endpoint = `now_playing?page=${pageNo}`;
        break;
    }

    const fetchUrl = `${URL}/movie/${endpoint}`;

    fetch(fetchUrl, options)
      .then((res) => res.json())
      .then((result) => {
        setData(result.results);
      })
      .catch((err) => console.error("Error: " + err));
  }, [location.pathname, pageNo]);

  return (
    <>
      {/* for link navigations and updation of location variable */}
      <nav className="movie-navbar">
        <Link to="/movies/nowPlaying">Now Playing</Link>
        <Link to="/movies/popular">Popular</Link>
        <Link to="/movies/topRated">Top Rated</Link>
        <Link to="/movies/upcoming">Upcoming</Link>
      </nav>

      {/* to display movie cards */}
      <div className="movie-container">
        {data.map((movObj) => (
          <MovieCard
            key={movObj.id}
            movObj={movObj}
            addToWatchlist={addToWatchlist}
            addToFavorite={addToFavorite}
          />
        ))}
      </div>
    </>
  );
}

export default Movies;
