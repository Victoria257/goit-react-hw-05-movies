import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from 'pages/Home/Home.module.css';
import PropTypes from 'prop-types';

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
    <div className={css.home}>
      <h4 className={css.title}>В тренді цього дня</h4>
      <ul className={css.list}>
        {images &&
          images.map(({ title, id, backdrop_path }) => (
            <li key={id} className={css.set}>
              <Link to={`movies/${id}`} state={{ from: location }}>
                <img
                  className={css.image}
                  src={`https://image.tmdb.org/t/p/w200${backdrop_path}`}
                  alt={title}
                />
                <p>{title}</p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

Home.propTypes = {
  fetchMovieHome: PropTypes.func.isRequired,
  images: PropTypes.array,
  setImages: PropTypes.func,
};

export default Home;
