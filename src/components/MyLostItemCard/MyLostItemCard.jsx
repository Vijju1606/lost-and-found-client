import { Link } from "react-router-dom";
import "./MyLostItemCard.css";
import { getAssetUrl } from "../../services/api";

function MyLostItemCard({
    item,
    onDelete,
    onEdit,
    onMatch
}) {

    return (
        <div className="my-lost-card">

            <img
                src={getAssetUrl(item.imageUrl)}
                alt={item.itemName}
                className="my-lost-image"
            />

            <div className="my-lost-body">

                <h3>{item.itemName}</h3>

                <p><strong>Description : </strong>{item.description}</p>

                <p>
                    <strong>Location:</strong> {item.location}
                </p>

                <p>
                    <strong>Date:</strong>{" "}
                    {new Date(item.dateLost).toLocaleDateString()}
                </p>

                <Link
                    to={`/lost-items/${item.id}`}
                    className="btn view-btn"
                >
                    View Details
                </Link>
                
                <Link
                    to={`/edit-lost-item/${item.id}`}
                    className="btn view-btn"
                >
                    Edit
                </Link>

        

<button
    className="btn delete-btn"
    onClick={() => onDelete(item.id)}
>
    Delete
</button>


 <Link to={`/matches/${item.id}`}
                    className="btn view-btn"
                >
                    Found Matches
                </Link>

            </div>

        </div>
    );
}

export default MyLostItemCard;
