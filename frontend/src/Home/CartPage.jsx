import React, { useEffect, useState } from "react";
import Layout from "../Componets/Layouts/layout";
import { useAuth } from "../Contexts/AuthContext";
import { useCart } from "../Contexts/CartContext";
import "./cart.css";
import axios from "axios";
import { toast } from "react-toastify";
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../Contexts/WishlistContext";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const CartPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useWishlist();
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.p._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        return (total = total + item.cnt * item.p.price);
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth.user) {
      setName(auth.user.name);
      setEmail(auth.user.email);
      setPhone(auth.user.phone);
      setAddress(auth.user.address);
    }
  }, [auth.user]);

  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/v1/auth/update-User-Profile`,
        {
          name,
          address,
          phone,
          email,
        }
      );
      console.log(data);
      if (data.success) {
        setAuth({ ...auth, user: data?.updatedUser });
        // let ls = localStorage.getItem("user");
        let ls = localStorage.getItem("user");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("user", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
        // localStorage.setItem("user", JSON.stringify(data.updatedUser));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handel payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${backendUrl}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/order");
      toast.success("payment completed Sucessfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div className="cart-page">
          <div
            style={{ boxShadow: "0px 5px 0px lightblue",width:"100vw" }}
          >
            <h4 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello👋 Guest"
                : `Hello👋 ${auth?.token && auth?.user?.name}`}
              <p
                className="text-center"
                style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
              >
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h4>
          </div>
          <div id="mainCartContainer">
            <div id="main">
              {" "}
              <br />
              {cart?.map((elm, i) => (
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
                      src={`${backendUrl}/api/v1/product/get-product-photo/${elm.p._id}`}
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
                      <button
                        style={{
                          border: "0px",
                          margin: "0px",
                          background: "white",
                        }}
                        onClick={() => {
                          var item =
                            localStorage.wishlist !== undefined
                              ? JSON.parse(localStorage.wishlist)
                              : [];
                          item.push({ p: elm.p });
                          localStorage.setItem(
                            "wishlist",
                            JSON.stringify(item)
                          );
                          setWishlist(item);
                          toast.success("Item Added to wishlist");
                          removeCartItem(elm.p._id);
                        }}
                      >
                        <i
                          className="fa-regular fa-heart fa-xl"
                          style={{ color: "#22ae0f" }}
                        />
                      </button>
                      <span>
                        <i
                          className="fa-regular fa-square-minus"
                          style={{ color: "#1ca037", cursor: "pointer" }}
                          onClick={() => {
                            var item = JSON.parse(localStorage.cart);
                            var bool = false;
                            for (let i = 0; i < item.length; i++) {
                              if (item[i].p._id === elm.p._id) {
                                if (item[i].cnt === 1) {
                                  return removeCartItem(elm.p._id);
                                }
                                if (item[i].cnt > 1) {
                                  item[i].cnt = item[i].cnt - 1;
                                  bool = true;
                                  break;
                                }
                              }
                            }
                            if (bool) {
                              localStorage.setItem(
                                "cart",
                                JSON.stringify(item)
                              );
                              setCart(item);
                              toast.success("Item Removed from cart");
                            } else {
                            }
                          }}
                        />{" "}
                        {elm.cnt}{" "}
                        <i
                          className="fa-regular fa-square-plus"
                          style={{ color: "#1ca037", cursor: "pointer" }}
                          onClick={() => {
                            var item = JSON.parse(localStorage.cart);
                            var bool = false;
                            for (let i = 0; i < item.length; i++) {
                              if (item[i].p._id === elm.p._id) {
                                if (
                                  item[i].cnt > 0 &&
                                  item[i].p.quantity > item[i].cnt
                                ) {
                                  item[i].cnt = item[i].cnt + 1;
                                  bool = true;
                                  break;
                                } else {
                                  toast.success("Item is out of stock");
                                  bool = false;
                                }
                              }
                            }
                            if (bool) {
                              localStorage.setItem(
                                "cart",
                                JSON.stringify(item)
                              );
                              setCart(item);
                              toast.success("Item Added to cart");
                            }
                          }}
                        />
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
                        onClick={() => removeCartItem(elm.p._id)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div id="main2">
              <div id="elm1">
                <h5
                  style={{
                    fontFamily: "Bebas Neue, cursive",
                    letterSpacing: "3px",
                    position: "relative",
                    left: "9rem",
                  }}
                >
                  BILL
                </h5>
                <h6
                  style={{
                    color: "#626262",
                    fontFamily: "Bebas Neue, cursive",
                    letterSpacing: "3px",
                  }}
                >
                  in your cart
                </h6>
                <div
                  style={{
                    height: "max-content",
                    width: "20em",
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                  }}
                >
                  {" "}
                  {cart?.map((p) => {
                    return (
                      <>
                        <h5
                          style={{
                            fontFamily: "monospace",
                            fontSize: "15px",
                            color: "green",
                            background: "#30c88e6f",
                            padding: "2px",
                            borderRadius: "2px",
                            marginLeft: "5px",
                            marginTop: "5px",
                          }}
                        >
                          {p.p.name}&nbsp;
                          <span
                            style={{
                              fontFamily: "monospace",
                              fontSize: "13px",
                              color: "green",
                              background: "#30c88e6f",
                            }}
                          >
                            {p.cnt}
                          </span>
                        </h5>
                      </>
                    );
                  })}
                </div>
                <h6
                  style={{
                    color: "#626262",
                    fontFamily: "Bebas Neue, cursive",
                    letterSpacing: "3px",
                  }}
                >
                  coupon
                </h6>
                <input
                  type="text"
                  style={{
                    height: "2em",
                    width: "7em",
                    border: "1.5px solid green",
                    color: "green",
                  }}
                  placeholder="   COUPON"
                />
                <h6
                  style={{
                    color: "#626262",
                    fontFamily: "Bebas Neue, cursive",
                    letterSpacing: "3px",
                    marginTop: "10px",
                  }}
                >
                  TOTAL PRICE OF CART ITEMS
                </h6>
                <h5>Rs.&nbsp;{totalPrice()}</h5>
              </div>
              <input type="checkbox" id="checking" />
              <label htmlFor="checking">
                <i
                  id="right"
                  className="fa-solid fa-circle-arrow-right fa-2xl"
                  style={{ color: "#3aa80b", cursor: "pointer" }}
                />

                <i
                  id="left"
                  className="fa-solid fa-circle-arrow-left fa-2xl"
                  style={{ color: "#3aa80b", cursor: "pointer" }}
                />
              </label>
              <div
                id="el2"
              >
                <form
                  onSubmit={handelUpdate}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <h5
                    style={{
                      fontFamily: "Bebas Neue, cursive",
                      letterSpacing: "3px",
                    }}
                  >
                    Address
                  </h5>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      required
                      style={{
                        width: "25em",
                        height: "2em",
                        border: "0.5px solid rgba(41, 40, 40, 0.891)",
                        borderRadius: "10px",
                        fontFamily: "Ubuntu",
                        position: "relative",
                        top: "1em",
                        padding: "10px",
                      }}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Enter your email"
                      name="name"
                      required
                      style={{
                        width: "25em",
                        height: "2em",
                        border: "0.5px solid rgba(41, 40, 40, 0.891)",
                        borderRadius: "10px",
                        fontFamily: "Ubuntu",
                        position: "relative",
                        top: "1em",
                        padding: "10px",
                      }}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="Number"
                      placeholder="Enter your phone"
                      name="email"
                      required
                      style={{
                        width: "25em",
                        height: "2em",
                        border: "0.5px solid rgba(41, 40, 40, 0.891)",
                        borderRadius: "10px",
                        fontFamily: "Ubuntu",
                        position: "relative",
                        top: "1em",
                        padding: "10px",
                      }}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Enter your Address"
                      name="Address"
                      required
                      style={{
                        width: "25em",
                        height: "2em",
                        border: "0.5px solid rgba(41, 40, 40, 0.891)",
                        borderRadius: "10px",
                        fontFamily: "Ubuntu",
                        position: "relative",
                        top: "1em",
                        padding: "10px",
                      }}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      position: "relative",
                      top: "2em",
                      border: "0px",
                      borderRadius: "5px",
                      fontFamily: "Ubuntu",
                    }}
                  >
                    UPDATE
                  </button>
                  {setFlag === true ? (
                    <>
                      <h5
                        style={{
                          color: "#626262",
                          fontFamily: "Bebas Neue, cursive",
                          letterSpacing: "3px",
                          position: "relative",
                          top: "3em",
                        }}
                      >
                        WANT SEE BILL
                      </h5>
                    </>
                  ) : (
                    <>
                      <h5
                        style={{
                          color: "#626262",
                          fontFamily: "Bebas Neue, cursive",
                          letterSpacing: "3px",
                          position: "relative",
                          top: "3em",
                        }}
                      >
                        GO FOR PAYMENT
                      </h5>
                    </>
                  )}
                </form>
              </div>
              <div
                id="elm3"
              >
                <div
                  style={{
                    background: "white",
                    width: "22em",
                    position: "sticky",
                    height: "2em",
                    zIndex: "5",
                  }}
                >
                  <h5
                    style={{
                      fontFamily: "Bebas Neue, cursive",
                      letterSpacing: "3px",
                      position: "relative",
                      left: "9rem",
                    }}
                  >
                    PAYMENT
                  </h5>
                </div>
                <div
                 className="paymentCard"
                >
                  <div
                    style={{
                      // height: "16em",
                      width: "20em",
                      position: "relative",
                      top: "-1.5em",
                    }}
                  >
                    {!clientToken || !auth?.token || !cart?.length ? (
                      <>
                        <h2
                          style={{
                            fontFamily: "Bebas Neue, cursive",
                            letterSpacing: "3px",
                            position: "relative",
                            top: "6em",
                          }}
                        >
                          NOTHING IN YOUR{" "}
                          <span>
                            {" "}
                            <i
                              className="fa-solid fa-cart-shopping fa-2xl"
                              style={{ color: "#22ae0f" }}
                            />
                          </span>
                        </h2>
                      </>
                    ) : (
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken,
                          }}
                          onInstance={(instance) => setInstance(instance)}
                        />
                        <button
                          className="btn btn-primary"
                          onClick={handlePayment}
                          disabled={
                            loading || !instance || !auth?.user?.address
                          }
                          style={{ position: "relative", left: "6em" }}
                        >
                          {loading ? "processing..." : "Make Payment"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default CartPage;
