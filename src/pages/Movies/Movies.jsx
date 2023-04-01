import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from 'pages/Movies/Movies.module.css';

const Movies = ({ fetchMovieSearch }) => {
  const [images, setImages] = useState('');
  const [name, setName] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const searchName = searchParams.get('searchName') || '';

  const location = useLocation();

  useEffect(() => {
    const search = async () => {
      try {
        if (searchName && images.length === 0) {
          const data = await fetchMovieSearch(searchName);
          setImages(data.results);
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log('finally');
      }
    };
    search();
  }, [images, searchName, fetchMovieSearch]);

  const handleChange = event => {
    if (event.target.value === '') {
      setSearchParams({});
    } else setSearchParams({ searchName: event.target.value });
  };

  const formSubmit = event => {
    event.preventDefault();
    searchParams(searchName);
  };

  return (
    <div className={css.movie}>
      <form onSubmit={formSubmit}>
        <input
          type="text"
          value={searchName}
          onChange={handleChange}
          placeholder="Введи назву фільму"
          autoComplete="off"
        />
        <button type="submit">Пошук</button>
      </form>
      <ul>
        {images &&
          images.map(({ id, title }) => (
            <li key={id}>
              <Link to={`${id}`} state={{ from: location }}>
                <p>{title}</p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Movies;

Movies.propTypes = {
  fetchMovieSearch: PropTypes.func.isRequired,
};
