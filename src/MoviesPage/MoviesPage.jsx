/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const startYear = 2000;
const endingYear = new Date().getFullYear();
const yearArr = [];

for (let i = startYear; i <= endingYear; i++) {
  yearArr.push(i);
}

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState(startYear);
  const [isLoading, setLoading] = useState(true);

  const fetchMovies = () => {
    setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=c0ae854ba8255b07b83c94d52ed26ea4&primary_release_year=${selectedYear}&sort_by=vote_average.desc`
        );
        const data = await res.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }, 500);
  };

  const handleSelectedYear = (e) => {
    setLoading(true);
    setSelectedYear(+e.target.value);
  };

  useEffect(() => {
    fetchMovies();
  }, [selectedYear]);

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <section className="movies-page mt-5">
      <div className="container">
        <h1 className="text-primary text-center text-capitalize">
          Welcome to our website
        </h1>
        <p className="text-capitalize w-50 mx-auto text-secondary text-center">
          You Can get latest movies and best movies to watch in your free time
          also you can download the pdf of best movies list
        </p>
        <h3 className="text-center text-capitalize bg-secondary p-2 rounded-5 text-white">
          best movies of the year
        </h3>
        <h3 className="badge text-dark bg-warning px-3 py-2 mt-4">
          Select Year
        </h3>
        <select
          name="movies"
          className="form-select"
          id="movies"
          onChange={handleSelectedYear}
        >
          {yearArr.map((item, idx) =>
            idx === 0 ? (
              <option defaultValue={true} key={item} value={item}>
                {item}
              </option>
            ) : (
              <option key={item} value={item}>
                {item}
              </option>
            )
          )}
        </select>
      </div>

      <div className="container my-5">
        {isLoading ? (
          <section className="d-flex justify-content-center align-items-center">
            <div className="d-flex gap-3">
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </section>
        ) : (
          <ul className="list-group">
            {movies.map((item, idx) => (
              <li className="list-group-item" key={idx}>
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default MoviesPage;
