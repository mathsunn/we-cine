import { useEffect, useReducer } from "react";
import produce from "immer";
import axios, { AxiosResponse } from "axios";
import { Movie } from "../contracts/Movie";

type Action =
  | { type: "FETCH_STARTED" }
  | { type: "FETCH_SUCCESSFUL"; payload: AxiosResponse }
  | { type: "FETCH_FAILED"; payload: Error };

interface State {
  loading: boolean;
  movie: Movie;
}

export const INITIAL_STATE: State = {
  loading: false,
  movie: null,
};

const reducer = produce((draft: State, action: Action) => {
  switch (action.type) {
    case "FETCH_STARTED":
      draft.loading = true;
      break;

    case "FETCH_FAILED":
      draft.loading = false;
      break;

    case "FETCH_SUCCESSFUL":
      draft.loading = false;
      draft.movie = action.payload.data;
      break;
  }
});

function useMovie(currentMovie: Movie | null): State {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if (currentMovie) {
      dispatch({ type: "FETCH_STARTED" });

      axios
        .get(`/movies/${currentMovie.id}`)
        .then(function (response) {
          dispatch({ type: "FETCH_SUCCESSFUL", payload: response });
        })
        .catch(function (error) {
          dispatch({ type: "FETCH_FAILED", payload: error });
        });
    }
  }, [currentMovie]);

  return state;
}

export default useMovie;
