import { useEffect, useReducer } from "react";
import produce from "immer";
import axios, { AxiosResponse } from "axios";
import { Genre } from "../contracts/Genre";

type Action =
  | { type: "FETCH_STARTED" }
  | { type: "FETCH_SUCCESSFUL"; payload: AxiosResponse }
  | { type: "FETCH_FAILED"; payload: Error };

interface State {
  loading: boolean;
  genres: Record<string, Genre>;
  total: number;
}

export const INITIAL_STATE: State = {
  loading: false,
  genres: {},
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
      draft.total = action.payload.data.length;
      action.payload.data.map((genres) => (draft.genres[genres.id] = genres));
      break;
  }
});

function useGenres(): State {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    dispatch({ type: "FETCH_STARTED" });

    axios
      .get("/genre")
      .then(function (response) {
        dispatch({ type: "FETCH_SUCCESSFUL", payload: response });
      })
      .catch(function (error) {
        dispatch({ type: "FETCH_FAILED", payload: error });
      });
  }, []);

  return state;
}

export default useGenres;
