import { FaStar } from "react-icons/fa";

const RatingStars = ({ ratings = 0, noOfReviews }) => {
  // Only create stars if ratings is a valid number
  const ratingStars =
    typeof ratings === "number" && ratings > 0
      ? Array(Math.round(ratings))
          .fill(null)
          .map((_, index) => <FaStar key={index} />)
      : null;

  return (
    <div className="flex flex-row items-center gap-1">
      {ratingStars && (
        <span className="flex flex-row gap-1 text-yellow-400">
          {ratingStars}
        </span>
      )}
      {noOfReviews !== undefined && <span>({noOfReviews})</span>}
    </div>
  );
};

export default RatingStars;
