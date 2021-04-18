import React from "react";
import { AppSettings } from "../contracts/AppSettings";
import GenreList from "./gender/GenreList";
import { FilterContext } from "../context/FilterContext";
import { Genre } from "../contracts/Genre";
import MoviesList from "./movie/MoviesList";
import "../styles/index.scss";
import "../styles/app.css";

const App: React.FC<AppSettings> = () => {
  const [selectedGenre, setGenre] = React.useState<Genre | null>(null);
  const [selectedTitle, setTitle] = React.useState("");

  return (
    <div>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand">WeCine</a>
        <form className="form-inline" onSubmit={(e) => e.preventDefault()}>
          <input
            className="form-control mr-sm-2"
            onChange={({ target }) => setTitle(target.value)}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </nav>

      <div className="container">
        <div className="row">
          <FilterContext.Provider
            value={{ selectedGenre, setGenre, selectedTitle, setTitle }}
          >
            <div className="col-md-3">
              <GenreList />
            </div>
            <div className="col-md-9">
              {selectedGenre ? (
                <MoviesList />
              ) : (
                <p>Please select à genre in the left column</p>
              )}
            </div>
          </FilterContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default App;
