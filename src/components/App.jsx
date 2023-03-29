import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from 'pages/Home/Home';
import Movies from 'pages/Movies/Movies';
import MovieDetails from 'pages/MovieDetails/MovieDetails';
import Cast from 'components/Cast/Cast';
import Reviews from 'components/Reviews/Reviews';
import SharedLayout from 'components/SharedLayout/SharedLayout';
import {
  fetchMovieHome,
  fetchMovieDetalis,
  fetchMovieSearch,
  fetchCast,
  fetchReviews,
} from 'components/ApiMovie/ApiMovie';

export const App = () => {
  const [images, setImages] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route
          index
          element={
            <Home
              fetchMovieHome={fetchMovieHome}
              images={images}
              setImages={setImages}
            />
          }
        ></Route>
        <Route
          path="movies"
          element={<Movies fetchMovieSearch={fetchMovieSearch} />}
        ></Route>
        <Route
          path="movies/:movieId"
          element={<MovieDetails fetchMovieDetalis={fetchMovieDetalis} />}
        >
          <Route path="cast" element={<Cast fetchCast={fetchCast} />}></Route>
          <Route
            path="reviews"
            element={<Reviews fetchReviews={fetchReviews} />}
          ></Route>
        </Route>
        <Route path="*" element={<Home />}></Route>
      </Route>
    </Routes>
  );
};
