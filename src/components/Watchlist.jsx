import React, { useEffect, useState, useMemo, useCallback } from "react";
import WatchlistCard from "./Watchlist/WatchlistCard";
import { genres } from "../assets/genreid";

export default function Watchlist({
  WatchlistEnteries,
  removefromWatchlist,
  setWatchlistEnteries,
}) {
  const [search, setSearch] = useState("");
  const [totalGenre, setTotalGenre] = useState([]);
  const [currentGenre, setCurrentGenre] = useState("All Genre");
  const [selectedOption, setSelectedOption] = useState("");

  const sortEntries = useCallback(() => {
    let sorted;
    switch (selectedOption) {
      case "Rating(low to high)":
        sorted = [...WatchlistEnteries].sort(
          (a, b) => a.vote_average - b.vote_average
        );
        break;
      case "Rating(high to low)":
        sorted = [...WatchlistEnteries].sort(
          (a, b) => b.vote_average - a.vote_average
        );
        break;
      case "Popularity(low to high)":
        sorted = [...WatchlistEnteries].sort(
          (a, b) => a.popularity - b.popularity
        );
        break;
      case "Popularity(high to low)":
        sorted = [...WatchlistEnteries].sort(
          (a, b) => b.popularity - a.popularity
        );
        break;
      default:
        sorted = [...WatchlistEnteries];
    }
    return sorted;
  }, [selectedOption, WatchlistEnteries]);

  useEffect(() => {
    setWatchlistEnteries(sortEntries());
  }, [sortEntries, setWatchlistEnteries]);

  useEffect(() => {
    let newGenre = ["All Genre"];
    WatchlistEnteries.forEach((watchlistObj) => {
      watchlistObj.genre_ids.forEach((genreId) => {
        const genre = genres.find((g) => g.id === genreId);
        genre && newGenre.push(genre.name);
      });
    });
    newGenre = [...new Set(newGenre)];
    setTotalGenre(newGenre);
  }, [WatchlistEnteries]);

  const filteredWatchList = useMemo(() => {
    return WatchlistEnteries.filter((watchlistObj) => {
      if (currentGenre === "All Genre") return true;
      return watchlistObj.genre_ids.some((element) => {
        const genre = genres.find((g) => g.id === element);
        return genre && genre.name === currentGenre;
      });
    }).filter((watchlistObj) => {
      const title = watchlistObj.title || watchlistObj.name;
      return title.toLowerCase().includes(search.toLowerCase());
    });
  }, [WatchlistEnteries, currentGenre, search]);

  return (
    <>
      <div className="watchlist">
        <div className="searchFilter-box">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="search-box"
            placeholder="Search"
          />
          <div className="sortby-box">
            <h3 className="sortby">Sort By: </h3>
            <select
              name="Sort By"
              onChange={(e) => setSelectedOption(e.target.value)}
              value={selectedOption}
            >
              <option className="sort-elements" value="Rating(low to high)">
                Rating(low to high)
              </option>
              <option className="sort-elements" value="Rating(high to low)">
                Rating(high to low)
              </option>
              <option className="sort-elements" value="Popularity(low to high)">
                Popularity(low to high)
              </option>
              <option className="sort-elements" value="Popularity(high to low)">
                Popularity(high to low)
              </option>
            </select>
          </div>
        </div>

        <div className="genre-box">
          {totalGenre.map((element) => (
            <button
              key={element}
              className="genre filter"
              onClick={() => setCurrentGenre(element)}
            >
              {element}
            </button>
          ))}
        </div>

        <div className="watchlist-container">
          {filteredWatchList.length > 0 ? (
            filteredWatchList.map((watchlistObj) => (
              <WatchlistCard
                key={watchlistObj.id}
                watchlistObj={watchlistObj}
                removefromWatchlist={removefromWatchlist}
                setTotalGenre={setTotalGenre}
              />
            ))
          ) : (
            <div className="emptyWatchlist">
              <h1>No Watchlist</h1>
              <p>Add items in watchlist</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
