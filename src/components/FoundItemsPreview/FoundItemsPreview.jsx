import "./FoundItemsPreview.css";
import { useEffect,useState } from "react";
import { getFoundItems } from "../../services/foundItemService";
import ItemCard from "../ItemCard/ItemCard";
import { Link } from "react-router-dom";



function FoundItemsPreview() {

    const [foundItems, setFoundItems]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        loadFoundItems()
    },[]);

    const loadFoundItems = async () =>{
        try{
            const data=await getFoundItems();
            
            setFoundItems(data);
        }
        catch(error){
        }
        finally{
            setLoading(false);
        }
    };

    

   

    return (
        <section className="found-preview">

            <div className="section-header">
                <h2>Latest Found Items</h2>
                <Link to="/found-items">View All →</Link>
            </div>

            <div className="found-grid">

                {foundItems.slice(0,6).map(item => ( <ItemCard key={item.id} item={item}/>

                   

                ))}

            </div>

        </section>
    );
}

export default FoundItemsPreview;
