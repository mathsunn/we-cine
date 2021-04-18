import React from "react";
import { render } from "@testing-library/react";
import axios from "axios";
import MoviesList from "./MoviesList";
import { FilterContext } from "../../context/FilterContext";
import { Genre } from "../../contracts/Genre";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("matches the snapshot", async () => {
  mockedAxios.get.mockResolvedValue({
    data: {
      "00000000670369ed0000000036c97f7e": {
        id: 1,
        originalTitle: "originalTitle",
        title: "title",
        overview: "overview",
        releaseDate: "2021-01-12T00:00:00+00:00",
        voteAverage: 8.1,
        voteCount: 100,
        videos: [],
      },
    },
  });

  let selectedGenre: Genre = {
    id: 12,
    name: "Action",
  };

  let selectedTitle = null;
  const setGenre = (setGenre) => setGenre;
  const setTitle = (setTile) => setTile;

  const { asFragment, findByText } = render(
    <FilterContext.Provider
      value={{ selectedGenre, setGenre, selectedTitle, setTitle }}
    >
      <MoviesList />
    </FilterContext.Provider>
  );

  await findByText(/title/i);

  expect(asFragment()).toMatchSnapshot();
});
