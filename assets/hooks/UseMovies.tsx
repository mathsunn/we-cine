import { useEffect, useReducer } from "react";
import produce from "immer";
import axios, { AxiosResponse } from "axios";
import { Movie } from "../contracts/Movie";
import { Genre } from "../contracts/Genre";

type Action =
  | { type: "FETCH_STARTED" }
  | { type: "FETCH_SUCCESSFUL"; payload: AxiosResponse }
  | { type: "FETCH_FAILED"; payload: Error };

interface State {
  loading: boolean;
  movies: Record<string, Movie>;
  total: number;
}

export const INITIAL_STATE: State = {
  loading: false,
  movies: {},
  total: 0,
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
      draft.movies = action.payload.data;
      draft.total = Object.keys(draft.movies).length;
      break;
  }
});

function useMovies(selectedGenre: Genre): State {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    dispatch({ type: "FETCH_STARTED" });

    axios
      .get(`/genre/${selectedGenre.id}/movies`)
      .then(function (response) {
        dispatch({ type: "FETCH_SUCCESSFUL", payload: response });
      })
      .catch(function (error) {
        dispatch({ type: "FETCH_FAILED", payload: error });
      });
  }, [selectedGenre]);

  return state;
}

export default useMovies;
