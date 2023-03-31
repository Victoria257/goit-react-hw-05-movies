import { Route, Routes } from 'react-router-dom';
import { useState, lazy } from 'react';
import PropTypes from 'prop-types';

import {
  fetchMovieHome,
  fetchMovieDetalis,
  fetchMovieSearch,
  fetchCast,
  fetchReviews,
} from 'components/ApiMovie/ApiMovie';

const Home = lazy(() => import('pages/Home/Home'));
const Movies = lazy(() => import('pages/Movies/Movies'));
const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('components/Cast/Cast'));
const Reviews = lazy(() => import('components/Reviews/Reviews'));
const SharedLayout = lazy(() => import('components/SharedLayout/SharedLayout'));

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

App.propTypes = {
  fetchMovieHome: PropTypes.func,
  fetchMovieDetalis: PropTypes.func,
  fetchMovieSearch: PropTypes.func,
  fetchCast: PropTypes.func,
  fetchReviews: PropTypes.func,
};
