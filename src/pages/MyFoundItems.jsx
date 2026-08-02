import { useEffect, useState } from "react";
import { getMyFoundItems } from "../services/foundItemService";
import ItemCard from "../components/ItemCard/ItemCard";
import "./MyLostItems.css";

function MyFoundItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getMyFoundItems().then((response) => setItems(response.data || [])).catch(() => alert("Unable to load your found items.")).finally(() => setLoading(false)); }, []);
  if (loading) return <h2>Loading...</h2>;
  return <div className="my-lost-items"><h2>My Found Items</h2>{items.length === 0 ? <p>No found items reported.</p> : <div className="items-grid">{items.map((item) => <ItemCard key={item.id} item={item} />)}</div>}</div>;
}
export default MyFoundItems;
