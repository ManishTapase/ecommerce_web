import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../Componets/Layouts/layout";
import { Checkbox, Radio } from "antd";
import "./short.css";
import axios from "axios";
import { toast } from "react-toastify";
import Product from "./Product";
import { Prices } from "../Prices/Prices";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const Gadgets = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [f, setF] = useState(true);
  const [mainCat, setMainCat] = useState("");
  useEffect(() => {
    AllCategories();
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/product/all-products`
      );
      if (data?.success) {
        const filterbymainCat = data.product.filter((it) => {
          return it.mainCategory == "electronic" ? it : null;
        });
        setProducts(filterbymainCat);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const AllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/category/allcategory`
      );
      if (data.success) {
        const filtered = data.category.filter((elm) => {
          return elm.slug1 == "electronic" ? elm : null;
        });
        setMainCat(filtered[0].main);
        setCategories(filtered);
      }
    } catch (error) {
      toast.success({ error: "something went wrong..!" });
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    if (!checked.length) {
      setF(false);
    }
  };

  //get products
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      setF(false);
    }
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/product/filter-products`,
        {
          checked,
          radio,
        }
      );
      console.log(data.products);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div
          style={{
            position: "relative",
            top: "10vh",
            height: "95vh",
            width: "100vw",
            display: "flex",
            flexDirection: "row",
            overflowX:"none",
            overflowY:"scroll"
          }}
        >
          <input id="check" type="checkbox" />
          <label htmlFor="check">
            <i
              id="cross"
              className="fa-solid fa-xmark"
              style={{ color: "#1e942c", cursor: "pointer" }}
            />
            <i
              id="bars"
              className="fa-solid fa-bars "
              style={{ color: "#1e942c", cursor: "pointer", fontSize: "20px" }}
            />
          </label>
          <div className="container1">
            <h3
              style={{
                color: "#00d35f",
                position: "absolute",
                left: "4.7em",
                top: ".7em",
              }}
            >
              SHORT
            </h3>
            <span id="container2">
              <ul id="mainContainer">
                <li id="element1">
                  <a>GATEGORIES</a>
                  <div id="element2">
                    {categories?.map((c) => (
                      <Checkbox
                        key={c._id}
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                      >
                        {c.name}
                      </Checkbox>
                    ))}
                  </div>
                </li>
                <li id="element1">
                  <a>PRICES</a>
                  <div className="d-flex flex-column">
                    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                      {Prices?.map((p) => (
                        <div key={p.name}>
                          <Radio value={p.array}>{p.name}</Radio>
                        </div>
                      ))}
                    </Radio.Group>
                  </div>
                </li>
              </ul>
              <span style={{ position: "relative", left: "2.5em" }}>
                <button
                  style={{
                    color: "white",
                    background: "#00d35f",
                    border: "0px",
                    margin: "0px",
                    borderRadius: "2px",
                  }}
                  onClick={() => window.location.reload()}
                >
                  RESET FILTERS
                </button>
              </span>
            </span>
          </div>
          {!products.length ? (
            <>
              <span className="loader" />
            </>
          ) : (
            <>
              <div className="proCont">
                <Product products={products} />
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Gadgets;
