import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const Reviews = ({ fetchReviews }) => {
  const [reviewList, setReviewList] = useState('');
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const review = async () => {
      const data = await fetchReviews(movieId);
      setReviewList(data.results);
    };
    review();
  }, [fetchReviews, movieId]);
  return (
    <ul>
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
