import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const Product2 = ({ products }) => {
  const [cart , setCart] = useCart();
  const navigate = useNavigate();
  return (
      <div
        style={{
          position:"relative",
          left:".8em",
          height: "80vh",
          width: "100vw",
          display: "flex",
          flexWrap:"wrap",
          flexDirection:"row",
        }}
      >
        {products.map((p) => {
          return (
            <div
              style={{
                width: "13rem",
                height: "18rem",
                marginRight:"10px",
                marginBottom:"10px",
                border:"1px solid black"
              }}
              key={p._id}
            >
              <div
                style={{
                  width: "9rem",
                  height: "9rem",
                  margin: "0px",
                  padding: "0px",
                }}
              >
                <img
                  src={`${backendUrl}/api/v1/product/get-product-photo/${p._id}`}
                  className="card-img-top"
                  id="images"
                  style={{
                    width: "8rem",
                    height: "8rem",
                    position: "relative",
                    left: "1.5em",
                    top:".5em"
                  }}
                  alt={p.name}
                />
              </div>
              <div className="card-body" style={{position:"relative",left:"2em"}}>
                <h5 className="card-title">{p.name.substr(0, 12)}</h5>
                <h6 className="card-title card-price">Rs.&nbsp;{p.price}</h6>
                <p className="card-text " id="description">
                  {p.discription.substr(0, 15)}...
                </p>
                <div style={{ display: "flex", flexFlow: "row" }}>
                  <button
                    style={{
                      height: "2em",
                      width: "5em",
                      borderRadius: "3px",
                      border: "1px solid #22ae0f",
                      background:"white"
                    }}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                   DETAILS
                  </button>
                  &nbsp;
                  <button
                    style={{
                      border:"0px",
                      margin:"0px",
                      background:"white"
                    }}
                  >
                   <i
                      className="fa-regular fa-heart fa-xl"
                      style={{ color: "#22ae0f" }}
                    />
                  </button>
                  <button
                     style={{
                      border:"0px",
                      margin:"0px",
                      background:"white"

                    }}
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
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
  );
};

export default Product2;
