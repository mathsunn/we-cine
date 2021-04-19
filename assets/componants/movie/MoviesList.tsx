import React, { useState } from "react";
import { useFilters } from "../../context/FilterContext";
import useMovies from "../../hooks/UseMovies";
import { isEmpty, map } from "lodash";
import Star from "../star/Star";
import MovieModal from "./MovieModal";

const MoviesList: React.FC = () => {
  const { selectedGenre, selectedTitle } = useFilters();
  const { movies, total, loading } = useMovies(selectedGenre);
  const [currentMovie, setCurrentMovie] = useState(null);

  if (loading) {
    return <>Loading</>;
  }

  if (total === 0) {
    return <>No result</>;
  }

  let filteredMovies = { ...movies };
  if (selectedTitle) {
    filteredMovies = Object.keys(movies)
      .filter(function (key) {
        return (
          null !== movies[key].title.match(new RegExp(selectedTitle, "gi"))
        );
      })
      .reduce((res, key) => ((res[key] = movies[key]), res), {});
  }

  return (
    <>
      {currentMovie && (
        <MovieModal
          currentMovie={currentMovie}
          setCurrentMovie={setCurrentMovie}
        />
      )}
      {isEmpty(filteredMovies) && <p>Movie not found</p>}

      {map(filteredMovies, (movie) => (
        <div className="card" key={movie.id} id={`movie_${movie.id}`}>
          <div className="card-body">
            <h5 className="card-title">
              {movie.title}
              <span>
                <Star count={5} average={Math.ceil(movie.voteAverage / 2)} />
              </span>
              <span>({movie.voteCount} votes)</span>
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {new Date(movie.releaseDate).getFullYear()}
            </h6>
            <p className="card-text">{movie.overview}</p>
            <button
              className="card-link btn btn-primary"
              onClick={() => {
                setCurrentMovie(movie);
              }}
            >
              Open
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default MoviesList;
