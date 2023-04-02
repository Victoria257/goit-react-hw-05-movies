import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const Reviews = ({ fetchReviews }) => {
  const [reviewList, setReviewList] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const review = async () => {
      try {
        setIsLoading(true);
        const data = await fetchReviews(movieId);
        setReviewList(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    review();
  }, [fetchReviews, movieId]);
  return (
    <ul>
      {isLoading && <p>Loading......</p>}
      {reviewList.length > 0 ? (
        reviewList.map(({ id, author, content, url }) => (
          <li key={id}>
            <h5>Author: {author}</h5>
            <p>{content}</p>
            <p>
              <span>url: </span>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </p>
          </li>
        ))
      ) : (
        <li>No review</li>
      )}
    </ul>
  );
};

Reviews.propTypes = {
  fetchReviews: PropTypes.func.isRequired,
};

export default Reviews;
