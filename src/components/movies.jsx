import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import "./movies.css"; // Import CSS file for styling

function Movies() {
    //const navigate=useNavigate()
    const [movie, setMovie] = useState(null);
    const [query, setQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
   const navigate=useNavigate()

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!searchTerm) return;

            try {
                const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=506d0cb3`);
                const data = await response.json();
                setMovie(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(query);
    };

    const handleMovieClick = (imdbID) => {
        console.log(imdbID)
        navigate(`/movie/${imdbID}`); // Navigate to /movie/:imdbID route
    };


    return (
        <div>
            <h1>Movie Explorer</h1>

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {movie ? (
                <div className="movie-grid">
                    {movie.Search ? (
                        movie.Search.map((movieItem) => (
                            <div key={movieItem.imdbID} className="movie-card" onClick={() => handleMovieClick(movieItem.imdbID)}>
                                <img src={movieItem.Poster} alt={`${movieItem.Title} Poster`} />
                                <h2>{movieItem.Title}</h2>
                                <p>{movieItem.Year}</p>
                            </div>
                        ))
                    ) : (
                        <p>No movies found</p>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Movies;
