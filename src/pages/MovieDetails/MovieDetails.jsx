import { Suspense, useEffect, useState } from 'react';
import { NavLink, useParams, Outlet, useLocation } from 'react-router-dom';
import css from 'pages/MovieDetails/MovieDetails.module.css';
import PropTypes from 'prop-types';

const MovieDetails = ({ fetchMovieDetalis }) => {
  const [imagesId, setImagesId] = useState([]);

  const { movieId } = useParams();

  const location = useLocation();
  const backLink = location.state?.from ?? '/';

  useEffect(() => {
    const detalis = async () => {
      try {
        const data = await fetchMovieDetalis(movieId);
        setImagesId(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log('final-2');
      }
    };
    detalis();
  }, [fetchMovieDetalis, movieId]);

  const { poster_path, title, vote_average, overview, genres, videos } =
    imagesId;

  const result = videos?.results || [];

  return (
    <div className={css.container}>
      <NavLink to={backLink} className={css.button}>
        Go back
      </NavLink>
      <div>
        <div className={css.wrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            alt={title}
          />
          <div className={css.information}>
            <h2>{title}</h2>
            <p>User score: {vote_average}</p>
            <h3>Overview </h3>
            <p>{overview} </p>
            <h4>Generes</h4>
            <div className={css.genres}>
              {genres &&
                genres.map(({ id, name }) => <span key={id}>{name}</span>)}
            </div>
            <div className={css.video}>
              <h4>Video</h4>
              <ul>
                {result > 0 ? (
                  result.map(({ id, name, key }) => (
                    <li key={id}>
                      <a
                        href={`https://www.youtube.com/watch?v=${key}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {name}
                      </a>
                    </li>
                  ))
                ) : (
                  <p>No video</p>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className={css.addInform}>
          <h4>Additional information</h4>
          <ul>
            <li>
              <NavLink to={'cast'} state={{ from: backLink }}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink to={'reviews'} state={{ from: backLink }}>
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  fetchMovieDetalis: PropTypes.func.isRequired,
};

export default MovieDetails;
