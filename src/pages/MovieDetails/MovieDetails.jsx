import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = ({ fetchMovieDetalis }) => {
  const [imagesId, setImagesId] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const detalis = async () => {
      try {
        const data = await fetchMovieDetalis(movieId);
        console.log(data);
        setImagesId(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log('final-2');
      }
    };
    detalis();
  }, [fetchMovieDetalis]);

  const { poster_path, title, vote_average, overview, genres } = imagesId;

  // const fetchMovieDetalis = async () => {
  //   const KEY_API = '1e5d776ce781b9601a1344aa67272955';
  //   const URL_API = 'https://api.themoviedb.org/3/';
  //   const response = await axios.get(
  //     `${URL_API}movie/${movieId}?api_key=${KEY_API}&language=uk&region=uk`
  //   );
  //   return response.data;
  // };

  // fetchMovieDetalis();

  // console.log(images);
  // const changeImage = images.find(image => image.id === Number(movieId));
  // console.log(movieId);
  // console.log(changeImage);
  // const { poster_path, title, vote_average, overview } = changeImage;

  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={title} />
      <h2>{title}</h2>
      <p>User score: {vote_average}</p>
      <h3>Overview </h3>
      <p>{overview} </p>
      <h4>Generes</h4>
      <div>
        {genres && genres.map(({ id, name }) => <span key={id}>{name}</span>)}
      </div>
      <p>Additional information</p>
    </div>
  );
};

export default MovieDetails;
