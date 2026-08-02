import { useEffect,useState} from "react";
import ItemCard from "../components/ItemCard/ItemCard";
import { getFoundItems } from "../services/foundItemService";
import "./FoundItems.css";

function FoundItems(){
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
          <section className="found-items">

            <div className="section-header">
                <h2>All Found Items</h2>
                
            </div>

            <div className="found-grid">

                {foundItems.map(item => ( <ItemCard key={item.id} item={item}/>

                   

                ))}

            </div>

        </section>



    );
}
export default FoundItems;
