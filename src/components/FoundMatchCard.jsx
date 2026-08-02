import { Link } from "react-router-dom";
import { getAssetUrl, useImageFallback } from "../services/api";

function FoundMatchCard({ match ,onContact}) {
  return (
    <div className="my-lost-card">

      <img
        src={getAssetUrl(match.imageUrl)}
        alt={match.itemName}
        className="my-lost-image"
        onError={useImageFallback}
      />

      <div className="my-lost-body">

        <h3>{match.itemName}</h3>

        <p>
          <strong>Description:</strong> {match.description}
        </p>

        <p>
          <strong>Location:</strong> {match.location}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(match.dateFound).toLocaleDateString()}
        </p>

        <p className="match-score">
          ⭐ Match Score: {match.matchPercentage}%
        </p>

        <Link
          to={`/found-items/${match.foundItemId}`}
          className="btn view-btn"
        >
          View Details
        </Link>

        <button className="btn match-btn"  onClick={()=> onContact(match)}>
          
          Contact Owner
        </button>

      </div>

    </div>
  );
}

export default FoundMatchCard;
