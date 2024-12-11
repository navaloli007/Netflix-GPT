import { useContext, useEffect, useState } from "react";
import genreIdMappings from "../configurations/genreConfig";
import { WatchListContext } from "../App";
import { IMG_CDN_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
    const watchListContextValue = useContext(WatchListContext);
    const { watchList, removeFromWatchList } = watchListContextValue;
    const genreSet = new Set();
    const [movies, setMovies] = useState(watchList);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        setMovies(watchList);
    }, [watchList]);
    movies.forEach((movie) => {
        const genreIds = movie.genre_ids;
        genreIds.forEach((id) => {
            genreSet.add(genreIdMappings[id]);
        });
    });
    const genres = Array.from(genreSet);
    genres.unshift("All Genres");
    const onSearchInputChange = (e) => {
        const searchFieldValue = e.target.value;
        setSearchValue(searchFieldValue);
        const filteredMovies = watchList.filter((movie) => {
            return movie.title
                .toLowerCase()
                .startsWith(searchFieldValue.toLowerCase());
        });
        setMovies(filteredMovies);
    };
    const backBtn = () => {
        navigate("/browse");
    }
    return (
        <div className="h-screen flex flex-col">
            <div className="sticky top-0 bg-gray-900 z-10">
                <div className="text-3xl ml-4 mt-4 cursor-pointer" onClick={backBtn}>🔙</div>
                <div className="flex justify-center m-4">
                    {genres.map((genre) => (
                        <div
                            key={genre}
                            className="mx-4 bg-blue-400 h-[3rem] w-[9rem] flex justify-center items-center rounded-xl text-white font-bolder">
                            {genre}
                        </div>
                    ))}
                </div>
                <div className="my-10 flex justify-center items-center">
                    <input
                        onChange={onSearchInputChange}
                        value={searchValue}
                        type="text"
                        placeholder="Search Movies"
                        className="h-[3rem] w-[20rem] border divide-gray-800 px-4 rounded-lg"
                    />
                </div>
            </div>
            <div className="flex-grow overflow-y-auto">
                <table className="my-10 w-3/4 mx-auto">
                    <thead className="text-white">
                        <tr>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Popularity</th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody className="my-10">
                        {movies.map((movie) => (
                            <tr key={movie.id} className="my-10 text-white">
                                <td className="flex items-center">
                                    <img
                                        className="h-[10rem] w-[12rem] object-fit"
                                        src={IMG_CDN_URL + movie?.backdrop_path}
                                        alt={movie?.title || "Movie Image"}
                                    />
                                    <div className="px-10 font-medium">{movie.title}</div>
                                </td>
                                <td>{movie.vote_average}</td>
                                <td>{movie.popularity}</td>
                                <td>{genreIdMappings[movie.genre_ids[0]]}</td>
                                <td
                                    onClick={() => removeFromWatchList(movie)}
                                    className="text-red-500 cursor-pointer"
                                >
                                    Delete
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Watchlist;
