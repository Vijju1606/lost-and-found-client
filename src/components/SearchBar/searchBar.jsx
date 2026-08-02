import { useState } from "react";
import "./searchBar.css";
import { getFoundItems } from "../../services/foundItemService";
import ItemCard from "../ItemCard/ItemCard";

function SearchBar({ onSearchStateChange }){
    const [search,setSearch]=useState("");
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (event) => {
        event.preventDefault();
        const term = search.trim().toLowerCase();
        if (!term) {
            setResults([]);
            setSearched(false);
            onSearchStateChange?.(false);
            return;
        }
        try {
            setLoading(true);
            const response = await getFoundItems();
            const items = response.data || response || [];
            setResults(items.filter((item) =>
                [item.itemName, item.description, item.location]
                    .some((value) => value?.toLowerCase().includes(term))
            ));
            setSearched(true);
            onSearchStateChange?.(true);
        } catch {
            alert("Unable to search found items.");
        } finally {
            setLoading(false);
        }
    };
    return(
        <section className="search-section">
            <h2>Search For Found Items</h2>
            <form className="search-box" onSubmit={handleSearch}>
                <input type="text" placeholder="search by item name..." value={search} onChange={(e)=> setSearch(e.target.value)}/>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Searching..." : "Search"}</button>
            </form>
            {searched && (
                <div className="search-results">
                    <h3>Found item results</h3>
                    {results.length === 0 ? <p>No found items match your search.</p> : (
                        <div className="found-grid">
                            {results.map((item) => <ItemCard key={item.id} item={item} />)}
                        </div>
                    )}
                </div>
            )}
        </section>
    )

}
export default SearchBar;
