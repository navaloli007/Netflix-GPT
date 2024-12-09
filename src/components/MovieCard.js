import React, { useContext } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { WatchListContext } from "../App";

const MovieCard = ({ movieObj, posterPath }) => {
    const watchListContextValue = useContext(WatchListContext);
    const { addToWatchList, removeFromWatchList, watchList } =
        watchListContextValue;
    let isMovieInWatchList = watchList.find((watchListMovie) => {
        return watchListMovie.id === movieObj?.id;
    });
    if (!posterPath) return null;
    return (
        <div className="relative w-36 md:w-40 pr-4">
            <div
                className={`absolute top-[-5px] right-[15px] z-10 flex items-center justify-center h-8 w-8 rounded-full cursor-pointer ${!isMovieInWatchList ? "text-green-500" : "text-red-500"
                    }`}
                onClick={() =>
                    !isMovieInWatchList
                        ? addToWatchList(movieObj)
                        : removeFromWatchList(movieObj)
                }
            >
                {!isMovieInWatchList ? "😍" : "❌"}
            </div>
            <img alt="Movie Card" src={IMG_CDN_URL + posterPath} className="rounded-lg" />
        </div>
    );
};

export default MovieCard;
