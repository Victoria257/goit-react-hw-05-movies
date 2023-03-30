import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
      {actors &&
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
        ))}
    </ul>
  );
};

export default Cast;
