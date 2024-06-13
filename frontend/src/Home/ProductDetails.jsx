import React, { useEffect, useState } from "react";
import Layout from "../Componets/Layouts/layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [pid, setPid] = useState("");
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  useEffect(() => {
    if (params?.slug) getSingleProduct();
  }, [params?.slug]);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/product/single-product/${params.slug}`
      );
      if (data.success) {
        setPid(data.singleproduct._id);
        setProduct(data.singleproduct);
        getSimilarProducts(
          data.singleproduct._id,
          data.singleproduct.category
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong....!");
    }
  };

    // similar products
    const getSimilarProducts = async (pid, cid) => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/v1/product/related-product/${pid}/${cid}`
        );
        setRelatedProducts(data?.products);
      } catch (error) {
        console.log(error);
      }
    }; 
  
  return (
    <Layout>
      <div
        style={{
          position: "relative",
          top: "10vh",
          left: "8vw",
          height: "80vh",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            height: "30em",
            width: "25em",
            marginRight: "20px",
            padding: "0px",
            border: "0px",
          }}
        >
          <img
            src={`${backendUrl}/api/v1/product/get-product-photo/${pid}`}
            className="card-img-top"
            alt={product.name}
            height="400px"
            width={"400px"}
          />
        </div>
        <div
          style={{
            height: "30em",
            width: "30em",
            position: "relative",
            padding: "0px",
            margin: "0px",
            border: "0px",
          }}
        >
          <hr />
          <h6
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            {product.name ? product.name.toUpperCase() : " "}
          </h6>
          <h6
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontWeight: "5px",
              fontSize: "15px",
            }}
          >
            {product.discription}
          </h6>
          <h4>Rs.&nbsp;{product.price}</h4>
          <button type="button" className="btn">
            {" "}
            <i
              className="fa-regular fa-heart fa-3x"
              style={{
                color: "#22ae0f",
                marginRight: "20px",
                padding: "5px",
              }}
            />
          </button>
          &nbsp; &nbsp;
          <button
            type="button"
            className="btn"
            style={{
              height: "3em",
              width: "15em",
              background: "#22ae0f",
              border: "0px",
              margin: "0px",
              borderRadius: "2px"
            }}
          >
            <h5
              style={{
                position:"relative",
                top:"3px",
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight:"bold",
                fontSize: "20px",
                color:"white"
              }}
            >
              ADD TO CART
            </h5>
          </button>
        </div>
      </div>
      <hr />

      <div className="row container similar-products">
        <h5  style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontWeight: "bold",
              fontSize: "30px",
            }}>SIMILAR PRODUCTS...</h5>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => {
          return (
            <div
              style={{
                width: "13rem",
                height: "18rem",
                marginRight: "10px",
                marginBottom: "10px",
                // border: "1px solid black",
                // boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                boxShadow: "10px 10px 5px lightblue",
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
                    left: "2em",
                  }}
                  alt={p.name}
                />
              </div>
              <div
                className="card-body"
                style={{ position: "relative", left: "2em" }}
              >
                <h5 className="card-title" >{p.name.substr(0, 12)}</h5>
                <h6 className="card-title card-price">Rs.&nbsp;{p.price}</h6>
                <p className="card-text " id="description">
                  {p.discription.substr(0, 15)}...
                </p>
                <div style={{ display: "flex", flexFlow: "row" }}>
                  <button
                    style={{
                      height: "2em",
                      width: "8em",
                      borderRadius: "3px",
                      border: "1px solid #22ae0f",
                      background: "white",
                    }}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    DETAILS
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
