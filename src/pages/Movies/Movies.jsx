import MovieDetails from 'pages/MovieDetails/MovieDetails';
import { useState, useEffect } from 'react';

const Movies = ({ fetchMovieSearch }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    const searchName = async () => {
      try {
        const response = await fetchMovieSearch(name);
      } catch (error) {
        console.log(error);
      } finally {
        console.log('final-3');
      }
    };
    searchName();
  }, [name]);

  return (
    <div>
      <h4>Movies</h4>
      <form>
        <input type="text" placeholder="Введи назву фільму" />
        <button type="submit">Пошук</button>
      </form>
      ;{/* <MovieDetails /> */}
    </div>
  );
};

export default Movies;
