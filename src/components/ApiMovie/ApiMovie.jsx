import axios from 'axios';

const KEY_API = '1e5d776ce781b9601a1344aa67272955';
const URL_API = 'https://api.themoviedb.org/3/';

export const fetchMovieHome = async () => {
  const response = await axios.get(
    `${URL_API}trending/movie/day?api_key=${KEY_API}&language=uk&region=uk`
  );
  return response.data;
};

export const fetchMovieSearch = async name => {
  const response = await axios.get(
    `${URL_API}search/movie?api_key=${KEY_API}&language=uk&include_adult=false&region=uk&query=${name}`
  );
  return response.data;
};

export const fetchMovieDetalis = async movieId => {
  const response = await axios.get(
    `${URL_API}movie/${movieId}?api_key=${KEY_API}&language=uk&region=uk`
  );
  return response.data;
};

export const fetchCast = async movieId => {
  const response = await axios.get(
    `${URL_API}movie/${movieId}/credits?api_key=${KEY_API}&language=uk&region=uk`
  );
  return response.data;
};

export const fetchReviews = async movieId => {
  const response = await axios.get(
    `${URL_API}movie/${movieId}/reviews?api_key=${KEY_API}&language=ua-uk`
  );
  return response.data;
};
