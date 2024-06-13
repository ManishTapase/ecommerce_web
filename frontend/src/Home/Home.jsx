import React, { useEffect, useState } from "react";
import Layout from "../Componets/Layouts/layout";
import Product from "./Product";
import axios from "axios";
import { toast } from "react-toastify";
import cloths from "../images/cloths.png";
import gadgets from "../images/gadgets.png";
import shoes from "../images/shoes.png";
import Screen from "./Screen";
import "./home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getAllProducts = async (e) => {
    try {
      const { data } = await axios.get(
        "/api/v1/product/all-products"
      );
      
      if (data.success) {
        setProducts(data.product);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Layout>
        <Screen />
        <br />
        <br />
        <label
         id="categoryLable"
         >
          CATEGORIES
        </label>
        <br />
        <br />
        <div
          className="main"
          style={{
            height: "25vh",
            width: "100vw",
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-around",
          }}
        >
          <div id="container">
            <img
              className="image"
              src={cloths}
              alt="cloths"
              style={{ height: "22vh", width: "26vw" }}
            />
            <div className="middle">
              <div
                className="text"
                title="Full Image"
                onClick={() => navigate("/cloths")}
              >
                cloths
              </div>
            </div>
          </div>
          <div id="container">
            <img
              className="image"
              src={gadgets}
              alt="gadgets"
              style={{ height: "22vh", width: "26vw" }}
            />
            <div className="middle">
              <div
                className="text"
                title="Full Image"
                onClick={() => navigate("/gadgets")}
              >
                Gadgets
              </div>
            </div>
          </div>
          <div id="container">
            <img
              className="image"
              src={shoes}
              alt="shoes"
              style={{ height: "22vh", width: "26vw" }}
            />
            <div className="middle">
              <div
                className="text"
                title="Full Image"
                onClick={() => navigate("/shoes")}
              >
                Shoes
              </div>
            </div>
          </div>
        </div>{" "}
        <br />
        <label
          id="productLable"
        >
          RECENT ADDED PRODUCTS
        </label>
        <br />
        <br />
        {!products.length ? (
          <>
            <span className="loader" />
          </>
        ) : (
          <>
            <div className="homeProCont">
              <Product products={products} />
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default Home;
