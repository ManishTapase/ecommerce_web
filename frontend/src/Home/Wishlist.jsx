import React from "react";
import Layout from "../Componets/Layouts/layout.jsx";
import { useWishlist } from "../Contexts/WishlistContext.jsx";
import { toast } from "react-toastify";
import { useCart } from "../Contexts/CartContext.jsx";
import "./wishlist.css";
const Wishlist = () => {
  const [wishlist, setWishlist] = useWishlist();
  const [cart, setCart] = useCart();
  const handelRemove = (id) => {
    try {
      let myWish = [...wishlist];
      let index = myWish.findIndex((item) => item.p._id === id);
      myWish.splice(index, 1);
      setWishlist(myWish);
      localStorage.setItem("wishlist", JSON.stringify(myWish));
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <>
      <Layout>
        <div
          style={{
            height: "max-content",
            width: "100vw",
            border: "2px solid black",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            top: "4em",
          }}
        >
          <div
            id="wishlistDiv"
            style={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              overflowX: "hidden",
              overflowY: "scroll",
              position: "relative",
              top: "1em",
            }}
          >
            {wishlist.length != 0 ? (
              <>
                {wishlist?.map((elm, i) => (
                  <div
                    className="row card flex-row"
                    style={{
                      width: "21em",
                      height: "8em",
                      marginBottom: "10px",
                      marginLeft: "10px",
                    }}
                    key={i}
                  >
                    <div
                      style={{
                        height: "7rem",
                        width: "8rem",
                        position: "relative",
                      }}
                    >
                      <img
                        src={`http://localhost:5000/api/v1/product/get-product-photo/${elm.p._id}`}
                        style={{
                          height: "7rem",
                          width: "8rem",
                          position: "relative",
                        }}
                        alt={elm.p.name}
                        width="100%"
                        height={"130px"}
                      />
                    </div>
                    <div
                      style={{
                        width: "12rem",
                        height: "8rem",
                        position: "relative",
                        left: "1em",
                      }}
                    >
                      <h5>{elm.p.name}</h5>
                      <p>Rs.&nbsp;{elm.p.price}</p>
                      <div>
                        <span>
                          <button
                            style={{
                              border: "0px",
                              margin: "0px",
                              background: "white",
                            }}
                            onClick={() => {
                              var item =
                                localStorage.cart !== undefined
                                  ? JSON.parse(localStorage.cart)
                                  : [];
                              item.push({ p: elm.p, cnt: 1 });
                              localStorage.setItem(
                                "cart",
                                JSON.stringify(item)
                              );
                              setCart(item);
                              toast.success("Item Added to cart");
                              handelRemove(elm.p._id);
                            }}
                          >
                            <i
                              className="fa-solid fa-cart-plus fa-xl"
                              style={{ color: "#22ae0f" }}
                            />
                          </button>
                        </span>
                        &nbsp;
                        <button
                          style={{
                            height: "2em",
                            width: "5em",
                            borderRadius: "3px",
                            border: "1px solid #22ae0f",
                            background: "white",
                          }}
                          onClick={() => handelRemove(elm.p._id)}
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <h2
                  style={{
                    fontFamily: "Bebas Neue, cursive",
                    letterSpacing: "3px",
                    position: "relative",
                    top: "4em",
                    left: "12em",
                  }}
                >
                  NOTHING IN YOUR WISH{" "}
                  <span>
                    {" "}
                    <i
                      className="fa-solid fa-list-ul"
                      style={{ color: "#22ae0f" }}
                    />
                  </span>
                </h2>
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Wishlist;
