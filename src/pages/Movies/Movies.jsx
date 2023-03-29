import { useState, useEffect } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

const Movies = ({ fetchMovieSearch }) => {
  const [name, setName] = useState('');
  const [images, setImages] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const searchName = searchParams.get('searchName') || '';

  useEffect(() => {
    const searchNames = async () => {
      try {
        const data = await fetchMovieSearch(name);
        setImages(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        console.log('final-3');
      }
    };
    searchNames();
  }, [name, fetchMovieSearch]);

  const handleChange = event => {
    setSearchParams({ searchName: event.target.value });
  };

  const formSubmit = event => {
    event.preventDefault();
    setName(searchName);
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
