import Hero from "../components/Hero/Hero";
import SearchBar from "../components/SearchBar/searchBar";
import LostItemsPreview from "../components/LostItemsPreview/LostItemsPreview";
import FoundItemsPreview from "../components/FoundItemsPreview/FoundItemsPreview";
import { useState } from "react";



function Home(){
    const [searchActive, setSearchActive] = useState(false);
    return (
        <>
          <Hero/>
          <SearchBar onSearchStateChange={setSearchActive}/>
          
          {!searchActive && <FoundItemsPreview/>}
    
        
        </>
  
    
);
}
export default Home;
