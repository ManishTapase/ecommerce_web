import React, { useEffect, useState } from "react";
import Layout from "../Layouts/layout";
import AdminMenu from "../DashBoard/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./create.css"
const { Option } = Select;
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discription, setDiscription] = useState("");
  const [category, setCategory] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("discription", discription);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("mainCategory", mainCategory);
      productData.append("shipping", shipping);
      const { data } = await axios.post(
        `${backendUrl}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        navigate("/dashboard/admin/product");
        toast.promise(resolveAfter3Sec, { success: data.message });
      } else {
        toast.promise(resolveAfter3Sec, { error: data.message });
      }
    } catch (error) {
      console.log(error);
      toast.promise(resolveAfter3Sec, { error: "something went wrong..!" });
    }
  };

  const AllCategories = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/category/allcategory`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    AllCategories();
  }, []);
  return (
    <>
      <Layout>
        <div className="row"
           id="createProduct"
        >
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div  id="orderBox" style={{ width: "53em", height: "90vh", overflow: "scroll" ,background:"white",zIndex:"3"}}>
            <h3>Create Product</h3>
            <div
              className="p-3"
              style={{
                display: "flex",
                flexFlow: "column",
              }}
            >
              <Select
                bordered={false}
                style={{ height: "3em" }}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                  categories.findIndex((it)=>{
                    if(it._id == category) return setMainCategory(it.main); 
                  })
                }}
              >
                {categories?.map((c) => {
                  return (
                    <Option
                      key={c._id}
                      value={c._id}
                    >
                      {c.name}
                    </Option>
                  );
                })}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "upload photo"}
                  <input
                    type="file"
                    multiple
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="write a name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={discription}
                    placeholder="write a description"
                    className="form-control"
                    onChange={(e) => setDiscription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="Number"
                    value={quantity}
                    placeholder="write a quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={price}
                    placeholder="write a price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <Select
                  bordered={false}
                  placeholder="Select a shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="1">YES</Option>
                  <Option value="0">NO</Option>
                </Select>
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
