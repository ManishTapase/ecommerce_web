import React from "react";
import "./LayoutsCss/Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { Badge } from "antd";
import { useCart } from "../../Contexts/CartContext";
import { useSearch } from "../../Contexts/SearchContext";
import axios from "axios";
import { useWishlist } from "../../Contexts/WishlistContext";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const Header = () => {
  const [cart, setCart] = useCart();
  const [wishlist, setWishlist] = useWishlist();
  const [auth, setAuth] = useAuth();
  const handelLogOut = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("user");
  };
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      //   console.log(values)
      console.log(data);
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg" >
        <div className="container-fluid" style={{background:"white"}}>
          <Link className="navbar-brand" href="#">
            {/* <h3 style={{ color: "#00d35f", position: "relative", left: "3vw" }}>
              SHOP
            </h3> */}
            <i
              className="fa-solid fa-store fa-2xl"
              style={{ color: "#22ae0f", position: "relative", left: "3vw" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/"
                  style={{ color: "#626262" }}
                >
                  HOME
                </NavLink>
              </li>
              <li className="nav-item" id="cloth">
                <NavLink
                  className="nav-link"
                  to="/cloths"
                  style={{ color: "#626262" }}
                >
                  CLOTH
                </NavLink>
                <ul id="hide">
                  <li>
                    <a href="" style={{ color: "#626262" }}>
                      MEN
                    </a>
                  </li>
                  &nbsp;&nbsp;
                  <li>
                    <a href="" style={{ color: "#626262" }}>
                      WOMEN
                    </a>
                  </li>
                </ul>
              </li>
              {/* <span id="hide">
                    <span id="elm">MENS</span>
                    &nbsp;&nbsp;
                    <span id="elm">WOMENS</span>
              </span> */}
              <li id="item-2">
                <NavLink
                  className="nav-link"
                  to="/gadgets"
                  style={{ color: "#626262" }}
                >
                  GADGET
                </NavLink>
              </li>
              <li id="item-2">
                <NavLink
                  className="nav-link"
                  to="/shoes"
                  style={{ color: "#626262" }}
                >
                  SHOES
                </NavLink>
              </li>
            </ul>
          </div>
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="search cloths,gadgets & shoes"
              aria-label="Search"
              style={{ background: "#30c88e6f" }}
              value={values.keyword}
              onChange={(e) =>
                setValues({ ...values, keyword: e.target.value })
              }
            />
            <button className="btn btn-outline-success" type="submit">
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </form>
          <span className="collapse navbar-collapse Auth" id="navbarNav">
            {auth.user ? (
              <>
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "#626262", transform: "uppercase" }}
                    >
                      <i
                        className="fa-regular fa-user fa-xl"
                        style={{ color: "#22ae0f", position: "relative" }}
                      ></i>{" "}
                      {auth.user.name.toUpperCase()}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth.user.role === 1 ? "admin" : "user"
                          }`}
                          className="nav-item"
                          style={{position:"relative",left:"2em",textDecoration:"none",color: "#626262"}}
                        >
                          {" "}
                          dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          onClick={handelLogOut}
                          className="nav-item"
                          style={{position:"relative",left:"2em",textDecoration:"none",color: "#626262"}}
                        >
                          logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      to="/login"
                      style={{ color: "#626262" }}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      to="/register"
                      style={{ color: "#626262" }}
                    >
                      Register
                    </NavLink>
                  </li>
                </ul>
              </>
            )}
            {auth?.user?.role == 1 ? (
              ""
            ) : (
              <>
                <ul className="navbar-nav" id="profile">
                  <li
                    className="nav-item"
                    style={{ position: "relative", left: "5vw" }}
                  >
                    <NavLink to="/wishlist" className="nav-link" href="#">
                      <Badge
                        count={wishlist?.length}
                        showZero
                        offset={[10, -5]}
                      >
                        <i
                          className="fa-regular fa-heart fa-xl"
                          style={{ color: "#22ae0f" }}
                        />{" "}
                        WISHLIST
                      </Badge>
                    </NavLink>
                  </li>
                  &nbsp;
                  <li
                    className="nav-item"
                    style={{ position: "relative", left: "5vw" }}
                  >
                    <NavLink to="/cart" className="nav-link" href="#">
                      <Badge
                        count={cart?.length}
                        style={{ background: "#22ae0f" }}
                        showZero
                        offset={[10, -5]}
                      >
                        <i
                          className="fa-solid fa-cart-shopping fa-xl"
                          style={{ color: "#22ae0f" }}
                        />{" "}
                        CART
                      </Badge>
                    </NavLink>
                  </li>
                </ul>
              </>
            )}
          </span>
        </div>
      </nav>
    </>
  );
};

export default Header;
