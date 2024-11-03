import React, { useEffect, useRef, useState } from "react";
import { useConfig } from "../ConfigContent";

function TvCard({ tvObj, addToWatchlist, addToFavorite }) {
  const rating = tvObj.vote_average * 10;
  const ratingRef = useRef(null);

  const { WatchlistEnteries, FavoriteEnteries } = useConfig();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    // Set the rating style
    if (ratingRef.current) {
      ratingRef.current.setAttribute(
        "style",
        `background-image: conic-gradient(wheat ${Math.floor(
          rating
        )}%, var(--secondaryColor) 0 100%);`
      );
    }
  }, [rating]);

  useEffect(() => {
    // Check if the TV show is in the watchlist or favorites
    setIsInWatchlist(
      WatchlistEnteries.some((element) => element.id === tvObj.id)
    );
    setIsInFavorites(
      FavoriteEnteries.some((element) => element.id === tvObj.id)
    );
  }, [WatchlistEnteries, FavoriteEnteries, tvObj.id]);

  const handleAddToWatchlist = () => {
    addToWatchlist(tvObj);
    setIsInWatchlist(true);
  };

  const handleAddToFavorite = () => {
    addToFavorite(tvObj);
    setIsInFavorites(true);
  };

  return (
    <div className="movie-card">
      <div className="movie-card-img">
        <img
          src={`https://image.tmdb.org/t/p/original/${tvObj.poster_path}`}
          alt="movie images"
          className="movie-img"
        />
      </div>
      <div className="movie-card-details">
        <button className="fav-btn" onClick={handleAddToFavorite}>
          <img
            src={
              isInFavorites
                ? "/src/assets/heart-svg-filled.svg"
                : "/src/assets/heart-svg.svg"
            }
            alt="heart-svg favourite button"
          />
        </button>
        <h4 className="movie-name">{tvObj.name}</h4>
        <p className="movie-desc">{tvObj.overview}</p>
        <div className="movie-specs">
          <div>
            <p className="movie-lang">Language: {tvObj.original_language}</p>
            <p className="movie-date">{tvObj.first_air_date}</p>
            <p className="originCountry">Origin: {tvObj.origin_country}</p>
          </div>
          <div className="rating-outside" ref={ratingRef}>
            <div className="rating-inside">
              <span className="rating-count">{tvObj.vote_average}</span>
            </div>
          </div>
        </div>
        <button className="movie-btn" onClick={handleAddToWatchlist}>
          {isInWatchlist ? "ADDED" : "Add to WatchList"}
        </button>
      </div>
    </div>
  );
}

export default TvCard;
