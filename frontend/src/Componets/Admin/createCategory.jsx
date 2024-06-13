import React, { useEffect, useState } from "react";
import AdminMenu from "../DashBoard/AdminMenu";
import Layout from "../Layouts/layout";
import axios from "axios";
import { Modal } from "antd";
import {toast }from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const CreateCategory = () => {
  // const [mainName, setMainName] = useState("");
  const [name, setName] = useState("");
  const [main, setMain] = useState("");
  const [categories, setCategories] = useState([]);
  const [upName, setUpName] = useState("");
  const [upMainName, setUpMainName] = useState("");
  const [select, setSelect] = useState(null);
  const [visible, setVisible] = useState(false);
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/category/create-Category`,
        { name,main }
      );
      if (data?.success) {
        toast.success(`${name} is created !`);
        AllCategories();
        setName("");
        setMain("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
  };
 
  useEffect(() => {
    AllCategories();
  }, []);

  const AllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/category/allcategory`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.promise(resolveAfter3Sec,{error:"something went wrong..!"});
    }
  };

  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/v1/category/update-category/${select._id}`,
        { name:upName, main:upMainName }
      );
      console.log(select._id);
      if(data.success){
        toast.promise(resolveAfter3Sec,{success:data.message});
        AllCategories();
        setVisible(false);
        setUpName("");
        setUpMainName("");
        select(null);
      }else{
        toast.promise(resolveAfter3Sec,{error:data.message});
      }
    } catch (error) {
      toast.promise(resolveAfter3Sec,{error:"something went wrong..!"});
    }
  };

  const handelDelete = async(_id)=>{
    try {
      const {data} = await axios.delete(`${backendUrl}/api/v1/category/delete-category/${_id}`);
        if(data.success){
            AllCategories();
            toast.promise(resolveAfter3Sec,{success:data.message});
            setSelect(null);
        }
    } catch (error) {
      toast.promise(resolveAfter3Sec,{error:"something went wrong..!"});
    }
  }

  return (
    <>
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
          <div  id="orderBox" style={{ width: "53em", height: "90vh", overflow: "scroll" }}>
            <h2>Manage categories </h2>
            <div className="p-3" style={{ display: "flex" }}>
              <form onSubmit={handelSubmit} action="">
                <input
                  placeholder="Enter new category name"
                  type="text"
                  name="category"
                  className="control-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  placeholder="Enter main category name"
                  type="text"
                  name="category"
                  className="control-input"
                  value={main}
                  onChange={(e) => setMain(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  submit
                </button>
              </form>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories &&
                    categories?.map((c) => {
                      return (
                        <tr key={c._id}>
                          <td>{c.name}</td>
                          {" "}
                          <td>{c.main}</td>
                          <td>                         
                          <button
                            className="btn btn-primary"
                            onClick={(e) => {
                              setSelect(c);
                              setUpName(c.name);
                              setUpMainName(c.main);
                              setVisible(true);
                            }}
                          >
                            edit
                          </button>
                          <button className="btn btn-danger" onClick={()=>handelDelete(c._id)}>
                            delete
                         </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <div className="p-3" style={{ display: "flex" }}>
                <form onSubmit={handelUpdate} action="">
                  <input
                    placeholder="Enter new category name"
                    type="text"
                    name="category"
                    className="control-input"
                    value={upName}
                    onChange={(e) => setUpName(e.target.value)}
                  />
                  <input
                    placeholder="Enter new category name"
                    type="text"
                    name="category"
                    className="control-input"
                    value={upMainName}
                    onChange={(e) => setUpMainName(e.target.value)}
                  />
                  <button className="btn btn-primary" type="submit">
                    submit
                  </button>
                </form>
              </div>
            </Modal>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;
