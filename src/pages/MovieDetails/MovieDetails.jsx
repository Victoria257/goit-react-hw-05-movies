import { Suspense, useEffect, useState } from 'react';
import { NavLink, useParams, Outlet, useLocation } from 'react-router-dom';

const MovieDetails = ({ fetchMovieDetalis }) => {
  const [imagesId, setImagesId] = useState([]);

  const { movieId } = useParams();

  const location = useLocation();
  const backLink = location.state?.from ?? '/';

  useEffect(() => {
    const detalis = async () => {
      try {
        const data = await fetchMovieDetalis(movieId);
        // console.log(data);
        setImagesId(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log('final-2');
      }
    };
    detalis();
  }, [fetchMovieDetalis, movieId]);

  const { poster_path, title, vote_average, overview, genres } = imagesId;

  return (
    <>
      <NavLink to={backLink}>Go back</NavLink>
      <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={title} />
      <h2>{title}</h2>
      <p>User score: {vote_average}</p>
      <h3>Overview </h3>
      <p>{overview} </p>
      <h4>Generes</h4>
      <div>
        {genres && genres.map(({ id, name }) => <span key={id}>{name}</span>)}
      </div>
      <h5>Additional information</h5>
      <ul>
        <li>
          <NavLink to={'cast'}>Cast</NavLink>
        </li>
        <li>
          <NavLink to={'reviews'}>Reviews</NavLink>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
