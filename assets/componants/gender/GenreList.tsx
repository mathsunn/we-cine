import React from "react";
import useGenres from "../../hooks/UseGenre";
import { map } from "lodash";
import { Genre } from "../../contracts/Genre";
import { useFilters } from "../../context/FilterContext";

const GenreList: React.FC = () => {
  const { genres, total, loading } = useGenres();
  const { selectedGenre, setGenre } = useFilters();

  const handleClick = (genre: Genre) => {
    setGenre(genre);
  };

  if (loading) {
    return <>Loading</>;
  }

  if (total === 0) {
    return <>No result</>;
  }

  return (
    <>
      {map(genres, (genre) => (
        <div key={genre.id}>
          <button
            id={`genre_${genre.id}`}
            className="btn btn-link"
            disabled={selectedGenre && genre.id === selectedGenre.id}
            onClick={() => handleClick(genre)}
          >
            {genre.name}
          </button>
        </div>
      ))}
    </>
  );
};

export default GenreList;
