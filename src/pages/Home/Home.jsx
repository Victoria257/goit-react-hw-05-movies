import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Home({ fetchMovieHome, images, setImages }) {
  useEffect(() => {
    const homes = async () => {
      try {
        const data = await fetchMovieHome();
        const imageList = data.results;
        console.log(imageList);
        setImages(imageList);
      } catch (error) {
        console.log(error);
      } finally {
        console.log('final');
      }
    };
    homes();
  }, [fetchMovieHome, setImages]);

  return (
    <div>
      <h4>Home page</h4>
      <ul>
        {images.map(({ title, id, backdrop_path }) => (
          <li key={id}>
            <NavLink to={`movies/${id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${backdrop_path}`}
                alt={title}
              />
              <p>{title}</p>
            </NavLink>
            <NavLink to="movies/:movieId"></NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
