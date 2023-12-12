import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const ListReviews = ({ reviews }) => {
    const [ratings, setRatings] = useState(0);

    useEffect(() => {
        let sum = 0;
        reviews.forEach(review => {
            sum += review.rating;
        });
        setRatings(sum / reviews.length);
    }, [reviews]);

    return (
     <div className="reviews w-75">
            <h3>Outras avaliações</h3>
            <hr />
                {reviews && reviews.map(review => (
                    <div key={review._id} className="review-card my-3">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                        </div>
                        <p className="review_user">de {review.user.name}</p>
                        <p className="review_comment">{review.comment}</p>
                        <hr />
                    </div>
                ))}
            </div>
    )
}
export default ListReviews;