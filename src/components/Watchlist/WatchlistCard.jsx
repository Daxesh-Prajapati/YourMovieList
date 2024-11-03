import React, { useEffect, useRef } from "react";
import { genres } from "/src/assets/genreid.js";

function WatchlistCard({
  watchlistObj,
  removefromWatchlist,
  removefromFavorite,
  fromFav,
}) {
  // for movies title comes, for series name comes
  const title = watchlistObj.title || watchlistObj.name;
  const originalTitle =
    watchlistObj.original_title || watchlistObj.original_name;

  const date = watchlistObj.first_air_date || watchlistObj.release_date;
  let type;
  if (watchlistObj.title) {
    type = "Movie";
  } else {
    type = "TV ";
  }

  let rating = watchlistObj.vote_average * 10;

  const ratingRef = useRef(null);
  useEffect(() => {
    // ratingRef.current points at he current element of card which is used
    if (ratingRef.current) {
      ratingRef.current.setAttribute(
        "style",
        `background-image: conic-gradient(wheat ${Math.floor(
          rating
        )}%, var(--secondaryColor) 0 100%);`
      );
    }
  }, [rating]);

  return (
    <div className="watchlistCard">
      <div className="card-cover-img">
        <img
          src={`https://image.tmdb.org/t/p/original//${watchlistObj.backdrop_path}`}
          alt=""
          className="cover-img"
        />
      </div>
      <div className="watchlist-content">
        <section className="card-leftpart">
          <div className="card-image">
            <img
              src={`https://image.tmdb.org/t/p/original//${watchlistObj.poster_path}`}
              alt="watchlist card image"
              className="card-img"
            />
          </div>
          <div className="watchlist-type">
            <h4>TYPE</h4>
            {type}
          </div>
        </section>
        <section className="card-rightpart">
          <div>
            <div>
              <h2 className="card-title">{title}</h2>
              <h4 className="card-org-title">{originalTitle}</h4>
            </div>
            <p className="card-desc">{watchlistObj.overview}</p>
            <div className="card-extra-specs">
              <p className="card-lang">
                Language: {watchlistObj.original_language}
              </p>
              <p className="card-date">{date}</p>
              {watchlistObj.origin_country && (
                <p className="card-org-country">Country of origin: US</p>
              )}
            </div>
          </div>
          <div>
            <div className="rating-and-popularity">
              {/* ref tag gives refrence to each card */}
              <div className="rating-outside" ref={ratingRef}>
                <div className="rating-inside">
                  <span className="rating-count">
                    {watchlistObj.vote_average}
                  </span>
                </div>
              </div>
              <h5 className="card-popularity">
                Popularity: {watchlistObj.popularity}
              </h5>
            </div>
            <div className="card-genre-box">
              {watchlistObj.genre_ids &&
                watchlistObj.genre_ids.map((genreId) => {
                  const genre = genres.find((g) => g.id === genreId);
                  return (
                    genre && (
                      <button key={genreId} className="genre">
                        {genre.name}
                      </button>
                    )
                  );
                })}
            </div>
            <div className="card-buttons-box">
              {/* <button className="details-btn">Details</button> */}
              {fromFav ? (
                <button
                  className=" wishlist-btn"
                  onClick={() => {
                    removefromFavorite(watchlistObj.id);
                  }}
                >
                  Remove to Favorites
                </button>
              ) : (
                <button
                  className=" wishlist-btn"
                  onClick={() => {
                    removefromWatchlist(watchlistObj.id);
                  }}
                >
                  Remove to WatchList
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default WatchlistCard;
