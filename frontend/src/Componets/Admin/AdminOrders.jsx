import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../Layouts/layout";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import AdminMenu from "../DashBoard/AdminMenu";
import { Modal, Select } from "antd";
const { Option } = Select;
import "../DashBoard/admin.css"
const AdminOrders = () => {
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [orderId, setOrderId] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const statuses = [
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ];
  const [status, setStatus] = useState("");
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
    getAllUsers();
  }, []);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/product/all-orders`
      );
      if (data?.success) {
        // const filterbymainCat = data.orders.filter((it) => {
        //   return it.buyer == buyer ? it : null;
        // });
        setOrder(data.orders);
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
        `${backendUrl}/product/all-products`
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
  const getAllUsers = async (e) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/auth/all-users`
      );
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
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
  const handelUserName = (uid) => {
    try {
      var name = "";
      const fil = users.filter((it) => {
        return it._id == uid ? (name = it.name) : null;
      });
      return name;
    } catch (error) {
      console.log(error);
    }
  };
  const handelUserAddress = (uid) => {
    try {
      var name = "";
      const fil = users.filter((it) => {
        return it._id == uid ? (name = it.address) : null;
      });
      return name;
    } catch (error) {
      console.log(error);
    }
  };

  const handelUpdateStatus = async (oid) => {
    try {
      const { data } = await axios.put(
        `/api/v1/product/update-status/${oid}`,
        { status: status }
      );
      console.log(oid);
      console.log(status);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div
          id="ordersss"
        >
          <div
            id="adminOrdermenu"
          >
            <AdminMenu />
          </div>
          {!order.length ? (
            <>
              <h2> Nothing have you ordered...!</h2>
            </>
          ) : (
            <>
              <div
                id="orderBox"
                style={{ width: "52em", height: "90vh", overflow: "scroll" }}
              >
                {order?.map((it, index) => {
                  return (
                    <>
                      <div
                         id="tuple"
                      >
                        <table className="table" key={it._id}>
                          <thead>
                            <tr>
                              <th scope="col">ORDER {index + 1}</th>
                              <th scope="col">PRODUCT NAME</th>
                              <th scope="col">QUANTITY</th>
                              <th scope="col">STATUS</th>
                              <th scope="col">AMOUNT</th>
                              <th scope="col">ADDRESS</th>
                            </tr>
                          </thead>
                          <tbody key={it._id}>
                            <tr>
                              <th scope="row">
                                <tr>
                                  <h6>{handelUserName(it.buyer)}</h6>
                                </tr>
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
                                        <td>
                                          {" "}
                                          <h6>{p}</h6>
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                              </td>
                              <td>
                                {
                                  <>
                                    {" "}
                                    <h6>{it.status}</h6>
                                    <button
                                      onClick={() => {
                                        setVisible(true);
                                        setOrderId(it._id);
                                      }}
                                      style={{
                                        background: "#2675ce",
                                        border: "2px solid blue",
                                        margin: "0px",
                                        padding: "5px",
                                        color: "white",
                                        fontSize: "10px",
                                        fontWeight: "bold",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      edit
                                    </button>
                                  </>
                                }
                              </td>

                              <td>{it.payment.transaction.amount}</td>
                              <td>
                                <span
                                  style={{
                                    display: "flex",
                                    overflowY: "scroll",
                                  }}
                                >
                                  {handelUserAddress(it.buyer)}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
          <div className="p-3" style={{ display: "flex" }}>
            <form onSubmit={() => handelUpdateStatus(orderId)} action="">
              <Select
                bordered={false}
                style={{ height: "3em" }}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setStatus(value);
                }}
              >
                {statuses?.map((c, i) => {
                  return (
                    <Option key={i} value={c}>
                      {c}
                    </Option>
                  );
                })}
              </Select>
              <button className="btn btn-primary" type="submit">
                submit
              </button>
            </form>
          </div>
        </Modal>
      </Layout>
    </>
  );
};

export default AdminOrders;
