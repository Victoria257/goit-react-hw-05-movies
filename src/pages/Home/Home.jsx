import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Home({ fetchMovieHome, images, setImages }) {
  const location = useLocation();

  useEffect(() => {
    const homes = async () => {
      try {
        const data = await fetchMovieHome();
        const imageList = data.results;
        // console.log(imageList);
        setImages(imageList);
      } catch (error) {
        console.log(error);
      } finally {
        console.log('final');
      }
    };
    homes();
  }, [setImages, fetchMovieHome]);

  return (
    <div>
      <h4>Home page</h4>
      <ul>
        {images &&
          images.map(({ title, id, backdrop_path }) => (
            <li key={id}>
              <NavLink to={`movies/${id}`} state={{ from: location }}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${backdrop_path}`}
                  alt={title}
                />
                <p>{title}</p>
              </NavLink>
              {/* <NavLink to="movies/:movieId"></NavLink> */}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Home;
