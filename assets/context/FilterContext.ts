import { createContext, useContext } from "react";
import { Genre } from "../contracts/Genre";

export type FilterContextType = {
  selectedGenre: Genre | null;
  selectedTitle: string | null;
  setGenre: (genre: Genre) => void;
  setTitle: (title: string) => void;
};

export const FilterContext = createContext<FilterContextType>({
  selectedGenre: null,
  selectedTitle: null,
  setGenre: (setGenre) => setGenre,
  setTitle: (setTile) => setTile,
});
export const useFilters = (): FilterContextType => useContext(FilterContext);
