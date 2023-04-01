import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Cast = ({ fetchCast }) => {
  const [actors, setActors] = useState('');

  const { movieId } = useParams();

  useEffect(() => {
    const cast = async () => {
      const data = await fetchCast(movieId);
      setActors(data.cast);
    };
    cast();
  }, [movieId, fetchCast]);
  return (
    <ul>
      {actors.length > 0 ? (
        actors.map(({ id, name, character, profile_path }) => (
          <li key={id}>
            {profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                alt={name}
              />
            ) : (
              <p>No photo</p>
            )}
            <p>{name}</p>
            <p>Character: {character}</p>
          </li>
        ))
      ) : (
        <p>No photo</p>
      )}
    </ul>
  );
};

Cast.propTypes = {
  fetchCast: PropTypes.func.isRequired,
};

export default Cast;
