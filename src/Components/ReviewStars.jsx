import classNames from "classnames";
import { useState } from "react";

const ReviewStars = ({
  totalStars,
  initialRating,
  onRatingChange,
  readonly,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (starIndex) => {
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (starIndex) => {
    if (!readonly) {
      setRating(starIndex);
      onRatingChange(starIndex);
    }
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= rating || starValue <= hoverRating;
        return (
          <span
            key={index}
            className={classNames("bi bi-star-fill fs-5", {
              filled: filled && !readonly,
              unfilled: !filled && !readonly,
              "pointer-events-none": readonly,
            })}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
            style={{ color: filled ? "gold" : "gray" }}
          >
            <i />
          </span>
        );
      })}
    </div>
  );
};

export default ReviewStars;
