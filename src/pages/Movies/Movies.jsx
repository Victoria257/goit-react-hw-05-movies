import { useState, useEffect } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

const Movies = ({ fetchMovieSearch }) => {
  const [images, setImages] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const searchName = searchParams.get('searchName') || '';

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
  }, [searchParams, fetchMovieSearch]);

  const handleChange = event => {
    setSearchParams({ searchName: event.target.value });
  };

  const formSubmit = event => {
    event.preventDefault();
    searchParams(searchName);
  };

  return (
    <div>
      <h4>Movies</h4>
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
              <NavLink to={`${id}`}>
                <p>{title}</p>
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Movies;
