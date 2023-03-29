import { useState, useEffect } from 'react';

const Movies = ({ fetchMovieSearch }) => {
  const [name, setName] = useState('мумія');
  const [images, setImages] = useState('');

  useEffect(() => {
    const searchName = async () => {
      try {
        const data = await fetchMovieSearch(name);
        setImages(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        console.log('final-3');
      }
    };
    searchName();
  }, [name, fetchMovieSearch]);

  const formSubmit = event => {
    event.preventDefault();
    setName('аватар');
    // console.log(event.target.name);
  };

  return (
    <div>
      <h4>Movies</h4>
      <form onSubmit={formSubmit}>
        <input
          type="text"
          // name="name"
          // value={name}
          // onChange={handleChange}
          placeholder="Введи назву фільму"
        />
        <button type="submit">Пошук</button>
      </form>
      <div>
        {images && images.map(({ id, title }) => <li key={id}>{title}</li>)}
      </div>
    </div>
  );
};

export default Movies;
