import { useEffect, useState, useRef } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router";

import Layout from "./components/Layout";
import Movie from "./components/Movie";
import MoviesContainer from "./components/MoviesContainer";
import Pagination from "./components/Pagination";

import "./App.css";
const URL = "https://jsonmock.hackerrank.com/api/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [pagination, setPagination] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef();
  const { search } = useLocation();

  // console.log(new URLSearchParams(search).get("year"));
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const a = new URLSearchParams(search).get("year");
        const url = a ? `${URL}?Year=${a}` : URL;
        const resp = await fetch(url);
        const data = await resp.json();

        setMovies(data.data);
        setPagination({ currentPage: data.page, totalPages: data.total_pages });
        setAllMovies(data.data);
        setIsLoading(false);
      } catch (e) {
        alert(e.message);
      }
    }
    fetchData();
  }, [search]);

  const handleSortAsc = () => {
    const sorted = movies.sort((a, b) => a.Title < b.Title);
    setMovies([...sorted]);
  };

  const handleSortDesc = () => {
    const sorted = movies.sort((a, b) => a.Title > b.Title);
    setMovies([...sorted]);
  };

  const handleInputChange = () => {
    const inputValue = inputRef.current.value.trim();
    if (inputValue.length) {
      const filteredMovies = allMovies.filter((muv) => {
        return muv.Title.toLowerCase().includes(inputValue.toLowerCase());
      });
      setMovies([...filteredMovies]);
    } else {
      setMovies(allMovies);
    }
  };

  const handlePagination = async (page) => {
    try {
      setIsLoading(true);
      const year = new URLSearchParams(search).get("year");
      const url = year && page ? `${URL}?Year=${year}&&page=${page}` : URL;
      const resp = await fetch(url);
      const data = await resp.json();

      setMovies(data.data);
      setPagination({ currentPage: data.page, totalPages: data.total_pages });
      setAllMovies(data.data);
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="App">
      <Layout data={movies}>
        <label htmlFor="search-input">
          <input
            type="text"
            id="search-input"
            className="search"
            placeholder="Search.."
            ref={inputRef}
            onChange={handleInputChange}
          />
          <button className="button" onClick={handleSortAsc}>
            Sort Asc
          </button>
          <button className="button" onClick={handleSortDesc}>
            Sort Desc
          </button>
        </label>
        <Switch>
          <Route path="/movies">
            <div>
              {!isLoading ? (
                <MoviesContainer>
                  {movies.map((movie) => {
                    return <Movie key={movie.imdbID} movie={movie} />;
                  })}
                </MoviesContainer>
              ) : (
                <h1>Loading...</h1>
              )}
              <Pagination {...pagination} onClick={handlePagination} />
            </div>
          </Route>
          <Route path="/" exact>
            <Redirect to="/movies" />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
