import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./prod.css";
import { useCart } from "../Contexts/CartContext";
import { toast } from "react-toastify";
import { useWishlist } from "../Contexts/WishlistContext";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const Product = ({ products }) => {
  const [cart, setCart] = useCart();
  const [wishlist,setWishlist] = useWishlist();
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "max-content",
        width: "100vw",
        display: "flex",
        flexFlow: "column",
        position:"relative",
        left:"2em"
      }}
    >
      <div
        className="maindiv"
        style={{
          position: "relative",
          height: "max-content",
          width: "100vw",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          overflowY:"scroll",
          overflowX:"hidden"
        }}
      >
        {products.map((p) => {
          return (
            <div
              id="cardID"
              key={p._id}
            >
              <div
                id="innerCard"
              >
                <img
                  src={`${backendUrl}/api/v1/product/get-product-photo/${p._id}`}
                  className="card-img-top"
                  id="images"
                  style={{
                    width: "11rem",
                    height: "11rem",
                    position: "relative",
                    // left: "2em",
                  }}
                  alt={p.name}
                />
              </div>
              <div
                className="card-body"
                style={{ position: "relative",  }}
              >
                <h6 className="card-title" >{p.name.substr(0, 12)}</h6>
                <h6 className="card-title card-price">Rs.&nbsp;{p.price}</h6>
                <p className="card-text " id="description">
                  {p.discription.substr(0, 15)}...
                </p>
                <div style={{ display: "flex", flexFlow: "row",position:"relative",left:".8em",padding:"0px",margin:"0px",border:"0px",top:"-.5em" }}>
                  <button
                    style={{
                      height: "2em",
                      width: "5em",
                      borderRadius: "3px",
                      border: "1px solid #22ae0f",
                      background: "white",
                    }}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    DETAILS
                  </button>
                  &nbsp;
                  <button
                    style={{
                      border: "0px",
                      margin: "0px",
                      background: "white",
                      
                    }}

                    onClick={() => {
                      var item = localStorage.wishlist !== undefined ? JSON.parse(localStorage.wishlist) : [];
                      console.log(item);
                      var bool = false;
                      if(item.length>0){
                        for (let i = 0; i < item.length; i++) {
                          if (item[i].p._id === p._id) {
                            return  toast.success("Already in Wishlist");
                            // item[i].cnt = item[i].cnt + 1;
                            // bool = true;
                            // break;
                          }
                        }
                      }
                      if (!bool) {
                        item.push({ p, cnt: 1 });
                        localStorage.setItem("wishlist", JSON.stringify(item));
                        setWishlist(item);
                        toast.success("Item Added to wishlist");
                      }
                    }}

                  >
                    <i
                      className="fa-regular fa-heart fa-xl"
                      style={{ color: "#22ae0f" }}
                    />
                  </button>
                  <button
                    style={{
                      border: "0px",
                      margin: "0px",
                      background: "white",
                    }}
                    onClick={() => {
                    
                      var item = localStorage.cart !== undefined ? JSON.parse(localStorage.cart) : [];
                      console.log(item);
                      var bool = false;
                      if(item.length>0){
                        for (let i = 0; i < item.length; i++) {
                          if (item[i].p._id === p._id) {
                            return  toast.success("Already in your cart");
                            // item[i].cnt = item[i].cnt + 1;
                            // bool = true;
                            // break;
                          }
                        }
                      }
                      if (!bool) {
                        item.push({ p, cnt: 1 });
                        localStorage.setItem("cart", JSON.stringify(item));
                        setCart(item);
                        toast.success("Item Added to cart");
                      }
                    }}
                  >
                    <i
                      className="fa-solid fa-cart-plus fa-xl"
                      style={{ color: "#22ae0f" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        &nbsp;
      </div>
    </div>
  );
};

export default Product;
