import React, { useCallback, useEffect, useMemo, useState } from "react";
import WatchlistCard from "./Watchlist/WatchlistCard";
import { genres } from "../assets/genreid";

export default function Favourite({
  FavoriteEnteries,
  removefromFavorite,
  setFavoriteEnteries,
}) {
  const [search, setSearch] = useState("");
  const [totalGenre, setTotalGenre] = useState([]);
  const [currentGenre, setCurrentGenre] = useState("All Genre");
  const [selectedOption, setSelectedOption] = useState("");

  const sortEntries = useCallback(() => {
    let sorted;
    switch (selectedOption) {
      case "Rating(low to high)":
        sorted = [...FavoriteEnteries].sort(
          (a, b) => a.vote_average - b.vote_average
        );
        break;
      case "Rating(high to low)":
        sorted = [...FavoriteEnteries].sort(
          (a, b) => b.vote_average - a.vote_average
        );
        break;
      case "Popularity(low to high)":
        sorted = [...FavoriteEnteries].sort(
          (a, b) => a.popularity - b.popularity
        );
        break;
      case "Popularity(high to low)":
        sorted = [...FavoriteEnteries].sort(
          (a, b) => b.popularity - a.popularity
        );
        break;
      default:
        sorted = [...FavoriteEnteries];
    }
    return sorted;
  }, [selectedOption, FavoriteEnteries]);

  useEffect(() => {
    setFavoriteEnteries(sortEntries());
  }, [sortEntries, setFavoriteEnteries]);

  useEffect(() => {
    let newGenreSet = ["All Genre"];
    FavoriteEnteries.forEach((watchlistObj) => {
      watchlistObj.genre_ids.forEach((element) => {
        const genre = genres.find((g) => g.id === element);
        if (genre && !newGenreSet.includes(genre.name))
          newGenreSet.push(genre.name);
      });
    });
    setTotalGenre(newGenreSet);
  }, [FavoriteEnteries]);

  const filteredFavoriteList = useMemo(() => {
    return FavoriteEnteries.filter((watchlistObj) => {
      if (currentGenre === "All Genre") return true;
      return watchlistObj.genre_ids.some((a) => {
        const genre = genres.find((g) => g.id === a);
        return genre && genre.name === currentGenre;
      });
    }).filter((watchlistObj) => {
      const title = watchlistObj.title || watchlistObj.name;
      return title.toLowerCase().includes(search.toLowerCase());
    });
  }, [FavoriteEnteries, currentGenre, search]);

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
          {totalGenre.map((element) => {
            return (
              <button
                key={element}
                className="genre filter"
                onClick={() => setCurrentGenre(element)}
              >
                {element}
              </button>
            );
          })}
        </div>

        <div className="watchlist-container">
          {filteredFavoriteList.length > 0 ? (
            filteredFavoriteList.map((watchlistObj) => (
              <WatchlistCard
                key={watchlistObj.id}
                watchlistObj={watchlistObj}
                removefromFavorite={removefromFavorite}
                fromFav={true}
              />
            ))
          ) : (
            <div className="emptyWatchlist">
              <h1>No Favorites</h1>
              <p>Add items in favorites</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
