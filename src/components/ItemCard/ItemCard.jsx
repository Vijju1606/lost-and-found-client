import "./ItemCard.css";
 import { Link } from "react-router-dom";
 import { useAuth } from "../../context/AuthContext";
 import { getItemImageUrl, useImageFallback } from "../../services/api";
 

 function ItemCard({item}){
 const { userId } = useAuth();
 const isOwnItem = userId && Number(item.userId) === Number(userId);
 return(
 <div className="item-card" key={item.id}>

                        <div className="item-image">
                           <img
  src={getItemImageUrl(item)}
  alt={item.itemName}
  onError={useImageFallback}
/>
                        </div>

                        <h3>{item.itemName}</h3>

                        {isOwnItem && <span className="own-item-badge">It’s yours</span>}

                        <p>{item.location}</p>

                        <small>{item.dateFound}</small>

                        <button className="btn btn-primary">
                            <Link to= {`/found-items/${item.id}`}>
                            View Details</Link>
                        </button>
                        {isOwnItem && (
                          <Link className="btn btn-secondary" to={`/edit-found-item/${item.id}`}>
                            Replace Image
                          </Link>
                        )}

                    </div>
 )
}
export default ItemCard;
