import React from "react";
import { render } from "@testing-library/react";
import GenreList from "./GenreList";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("matches the snapshot", async () => {
  mockedAxios.get.mockResolvedValue({ data: [{ id: 28, name: "Action" }] });

  const { asFragment, findByText } = render(<GenreList />);

  await findByText(/Action/i);

  expect(asFragment()).toMatchSnapshot();
});
