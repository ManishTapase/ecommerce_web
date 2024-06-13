import {useState,useContext,createContext,useEffect} from 'react';
const WishlistContext = createContext();
const WishlistProvider = ({children}) =>{
    const [wishlist, setWishlist] = useState([]);
    useEffect(() =>{
      let existingCartItem = localStorage.getItem("wishlist");
      if (existingCartItem) setWishlist(JSON.parse(existingCartItem));
    }, []);
    return (
      <WishlistContext.Provider value={[wishlist, setWishlist]}>
        {children}
      </WishlistContext.Provider>
    );
}

const useWishlist = () => useContext(WishlistContext);
export {useWishlist,WishlistProvider};