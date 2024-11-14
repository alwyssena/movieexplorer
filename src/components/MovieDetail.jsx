import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./moviedetail.css";



function MovieDetail() {
    const { id } = useParams(); // Extract the movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(id)
        const fetchMovieDetail = async () => {
            try {
                const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=506d0cb3`);
                
                // Check if the response is JSON-formatted
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    setMovie(data);
                } else {
                    throw new Error("Received non-JSON response from the API");
                }
            } catch (error) {
                setError("Error fetching movie details.");
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetail();
    }, [id]);

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : movie ? (
                <div className="container">
  <h1>{movie.Title}</h1>
  <div className="movie-detail">
    <div className="movie-poster">
      <img src={movie.Poster} alt={`${movie.Title} Poster`} />
    </div>
    <div className="movie-info">
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Cast:</strong> {movie.Actors}</p>
      <p><strong>Release Date:</strong> {movie.Released}</p>
      <p><strong>Runtime:</strong> {movie.Runtime}</p>
      <p><strong>IMDb Rating:</strong> <span className="rating">{movie.imdbRating}</span></p>
      <p className="plot"><strong>Plot:</strong> {movie.Plot}</p>
    </div>
  </div>
</div>

            ) : (
                <p>Loading movie details...</p>
            )}
        </div>
    );
}

export default MovieDetail;
