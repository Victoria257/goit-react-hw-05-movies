import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from 'pages/Movies/Movies.module.css';

const Movies = ({ fetchMovieSearch, onSubmit }) => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchName = searchParams.get('searchName') || '';

  const location = useLocation();

  useEffect(() => {
    const search = async () => {
      try {
        if (name && images.length === 0) {
          const data = await fetchMovieSearch(name);
          setImages(data.results);
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log('finally');
      }
    };
    if (searchName) {
      setName(searchName);
      search();
      setIsFormSubmitted(true);
    } else if (isFormSubmitted) {
      search();
      setIsFormSubmitted(false);
    }
  }, [images, name, fetchMovieSearch, isFormSubmitted, searchName]);

  const handleChange = event => {
    const { value } = event.currentTarget;
    setName(value);
  };

  const formSubmit = event => {
    event.preventDefault();
    onSubmit(name);
    if (name === '') {
      setSearchParams({});
    } else {
      setSearchParams({ searchName: name });
      setIsFormSubmitted(true);
    }
  };

  return (
    <div className={css.movie}>
      <form onSubmit={formSubmit}>
        <input
          name="name"
          type="text"
          value={name}
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
