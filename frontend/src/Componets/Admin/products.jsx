import React, { useEffect, useState } from "react";
import Layout from "../Layouts/layout";
import AdminMenu from "../DashBoard/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Products = () => {
  const [product, setProduct] = useState([]);
  const AllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/product/all-products"
      );
      if (data?.success) {
        toast.success(data.message);
        setProduct(data?.product);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong....!");
    }
  };

  useEffect(() => {
    AllProducts();
  }, []);
  return (
    <Layout>
      <div  style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            position: "relative",
            top: "4em",
          }}>
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All products</h1>
          <div style={{ overflowY: "scroll", scrollBehavior:"smooth",overflowX:"hidden",display:"flex",flexWrap:"wrap",flexDirection:"row" }}>
            {product.map((p) => {
              return (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div
                    className="card m-2"
                    style={{ width: "15em", height: "18em" }}
                    id="card"
                    key={p._id}
                  >
                      <img
                        src={`http://localhost:5000/api/v1/product/get-product-photo/${p._id}`}
                        className="card-img-top"
                        id="images"
                        style={{ width: "15em", height: "12em" }}
                        alt={p.name}
                      />
                  
                    <div className="card-body">
                      <h5 className="card-title">{p.name.substr(0,15)}</h5>
                      <div className="card-text" id="description" >
                        {p.discription.substr(0,30)}......
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
