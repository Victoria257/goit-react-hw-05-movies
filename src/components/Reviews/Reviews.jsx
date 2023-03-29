import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Reviews = ({ fetchReviews }) => {
  const [reviewList, setReviewList] = useState('');
  const { movieId } = useParams();

  useEffect(() => {
    const review = async () => {
      const data = await fetchReviews(movieId);
      setReviewList(data.results);
    };
    review();
  }, [fetchReviews]);
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

export default Reviews;
