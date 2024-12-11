import { Provider } from 'react-redux';
import './App.css';
import Body from './components/Body';
import appStore from './utils/appStore';
import React, { useEffect, useState } from 'react';
export const WatchListContext = React.createContext();

function App() {
  const [watchList, setWatchList] = useState(getWatchListFromStorage());
  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);
  const addToWatchList = (movieObj) => {
    setWatchList([...watchList, movieObj]);
  };
  const removeFromWatchList = (movieObj) => {
    const filteredMovies = watchList.filter((watchListMovie) => {
      return movieObj.id !== watchListMovie.id;
    });
    setWatchList(filteredMovies);
  };
  function getWatchListFromStorage() {
    const watchListFromStorage = JSON.parse(localStorage.getItem("watchList"));
    if (watchListFromStorage == null) {
      return [];
    }
    return watchListFromStorage;
  }
  return (
    <div>
      <Provider store={appStore}>
        <WatchListContext.Provider
          value={{ watchList, addToWatchList, removeFromWatchList }}
        >
          <Body />
        </WatchListContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
