import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../Layouts/layout";
import { useAuth } from "../../Contexts/AuthContext";
import UserMenu from "../DashBoard/UserMenu";
import axios from "axios";
import Product from "../../Home/Product";
import { toast } from "react-toastify";
const Orders = () => {
  const [auth, setAuth] = useAuth();
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const buyer = auth.user.id;
  var count = [[]];
  var product = [[]];
  useLayoutEffect(() => {
    getOrders().then(() => {
      order.forEach((it) => {
        product.push(it.products);
        count.push(it.cnt);
      });
      product.splice(0, 1);
      count.splice(0, 1);
    });
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/product/all-orders"
      );
      if (data?.success) {
        const filterbymainCat = data.orders.filter((it) => {
          return it.buyer == buyer ? it : null;
        });
        setOrder(filterbymainCat);
        console.log(order)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllProducts = async (e) => {
    try {
      const { data } = await axios.get(
        "/api/v1/product/all-products"
      );
      if (data.success) {
        setProducts(data.product);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  console.log(products);
  console.log(order);
  const handelName = (pid) => {
    try {
      var name = "";
      const fil = products.filter((it) => {
        return it._id == pid ? (name = it.name) : null;
      });
      return name;
    } catch (error) {
      console.log(error);
    }
  };

  const handelDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-order/${pid}`
      );
      if (data.success) {
        toast.success("order cancel successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something Went Wrong`);
    }
  };

  return (
    <>
      <Layout>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            position: "relative",
            top: "4em",
          }}
        >
          <div
            style={{
              width: "20em",
              height: "90vh",
              borderRight: "2px solid #1bdd35",
            }}
          >
            <UserMenu />
          </div>
          <div
            // id="orderBox"
            style={{ width: "52em", height: "90vh", overflow: "scroll" }}
          >
            {order?.map((it, index) => {
              return (
                <>
                  <div
                    style={{
                      height: "max-content",
                      width: "50em",
                      border: "1px solid #1bdd35",
                      marginBottom: "10px",
                      marginLeft: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">ORDER {index + 1}</th>
                          <th scope="col">product name</th>
                          <th scope="col">quantity</th>
                          <th scope="col">status</th>
                          <th scope="col">amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">
                            {" "}
                            <td>
                              <button
                                onClick={() => handelDelete(it._id)}
                                style={{
                                  background: "#e94444",
                                  border: "2px solid red",
                                  margin: "0px",
                                  padding: "5px",
                                  borderRadius: "5px",
                                  color: "white",
                                }}
                              >
                                CANCEL
                              </button>
                            </td>
                          </th>
                          <td>
                            {it?.products?.map((p) => {
                              return (
                                <>
                                  <tr>
                                    <h6>{handelName(p)}</h6>
                                  </tr>
                                </>
                              );
                            })}
                          </td>
                          <td>
                            {it?.cnt?.map((p) => {
                              return (
                                <>
                                  <tr>
                                    <h6>{p}</h6>
                                  </tr>
                                </>
                              );
                            })}
                          </td>
                          <td>{it.status}</td>
                          <td>{it.payment.transaction.amount}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Orders;
