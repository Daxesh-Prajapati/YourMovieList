import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
//  token and url data
import { URL, token } from "../public/config_token";

// components
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Watchlist from "./components/Watchlist";
import Favorite from "./components/Favorite.jsx";
import Movies from "./components/HOME/Movies.jsx";
import TvSeries from "./components/HOME/TvSeries";
import { ConfigProvider } from "./components/ConfigContent";

function App() {
  console.log(`APP url : ${URL}`);

  const [WatchlistEnteries, setWatchlistEnteries] = useState([]);
  const [FavoriteEnteries, setFavoriteEnteries] = useState([]);

  const addToWatchlist = (movObj) => {
    // Check if the movie is already in the watchlist
    if (WatchlistEnteries.find((entry) => entry.id === movObj.id)) {
      return;
    }
    let newWatchlist = [...WatchlistEnteries, movObj];

    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
    setWatchlistEnteries(newWatchlist);
    console.log(newWatchlist);
  };

  const removefromWatchlist = (id) => {
    let newWatchlist = WatchlistEnteries.filter((obj) => {
      return obj.id != id;
    });
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
    setWatchlistEnteries(newWatchlist);
  };

  const addToFavorite = (movObj) => {
    // Check if the movie is already in the watchlist
    if (FavoriteEnteries.find((entry) => entry.id === movObj.id)) {
      return;
    }
    let newFavorite = [...FavoriteEnteries, movObj];

    localStorage.setItem("Favorite", JSON.stringify(newFavorite));
    setFavoriteEnteries(newFavorite);
    console.log(newFavorite);
  };

  const removefromFavorite = (id) => {
    let newFavorite = FavoriteEnteries.filter((obj) => {
      return obj.id != id;
    });
    localStorage.setItem("Favorite", JSON.stringify(newFavorite));
    setFavoriteEnteries(newFavorite);
  };

  useEffect(() => {
    let watchlistInLocalStorage = localStorage.getItem("watchlist");
    if (!watchlistInLocalStorage) {
      return;
      // this cause state to change limitless times
      // setWatchlistEnteries([]);
    } else {
      setWatchlistEnteries(JSON.parse(watchlistInLocalStorage));
    }

    let FavoriteInLocalStorage = localStorage.getItem("Favorite");
    if (!FavoriteInLocalStorage) {
      return;
      // this cause state to change limitless times
      // setWatchlistEnteries([]);
    } else {
      setFavoriteEnteries(JSON.parse(FavoriteInLocalStorage));
    }
  }, []);

  return (
    <>
      <ConfigProvider
        URL={URL}
        token={token}
        WatchlistEnteries={WatchlistEnteries}
        FavoriteEnteries={FavoriteEnteries}
      >
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Navigate to="/movies/nowPlaying" />} />
              <Route
                path="/movies/*"
                element={
                  <Movies
                    addToWatchlist={addToWatchlist}
                    addToFavorite={addToFavorite}
                  />
                }
              ></Route>
              <Route
                path="/tv/*"
                element={
                  <TvSeries
                    addToWatchlist={addToWatchlist}
                    addToFavorite={addToFavorite}
                  />
                }
              />
            </Route>
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  WatchlistEnteries={WatchlistEnteries}
                  removefromWatchlist={removefromWatchlist}
                  setWatchlistEnteries={setWatchlistEnteries}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorite
                  FavoriteEnteries={FavoriteEnteries}
                  removefromFavorite={removefromFavorite}
                  setFavoriteEnteries={setFavoriteEnteries}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
