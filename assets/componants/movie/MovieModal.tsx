import React from "react";
import Star from "../star/Star";
import { Button, Modal } from "react-bootstrap";
import { Movie } from "../../contracts/Movie";
import useMovie from "../../hooks/UseMovie";
import ReactPlayer from "react-player";

interface Props {
  currentMovie: Movie;
  setCurrentMovie: (movie: Movie) => void;
}

const MovieModal: React.FC<Props> = ({ currentMovie, setCurrentMovie }) => {
  const { movie } = useMovie(currentMovie);
  const handleClose = () => setCurrentMovie(null);

  if (!movie) {
    return null;
  }

  return (
    <Modal show={true} size="lg">
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.keys(movie.videos).length > 0}
        <ReactPlayer width="100%" url={Object.values(movie.videos)[0].url} />
        Movie: {movie.title}
        <Star count={5} average={Math.ceil(movie.voteAverage / 2)} /> for{" "}
        {movie.voteCount} users
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieModal;
