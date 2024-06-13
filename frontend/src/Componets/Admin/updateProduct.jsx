import React, { useEffect, useState } from "react";
import Layout from "../Layouts/layout";
import AdminMenu from "../DashBoard/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
const UpdateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discription, setDiscription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState(false);
  const [pid, setPid] = useState("");
  const params = useParams();
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/single-product/${params.slug}`
      );
      if (data?.success) {
        toast.success(data.message);
        setPid(data.singleproduct._id);
        setName(data.singleproduct.name);
        setDiscription(data.singleproduct.discription);
        setPrice(data.singleproduct.price);
        setQuantity(data.singleproduct.quantity);
        setCategory(data.singleproduct.category);
        setShipping(data.singleproduct.shipping);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong....!");
    }
  };

  const AllCategories = async (req, res) => {
    try {
      const { data } = await axios.get(
        "/api/v1/category/allcategory"
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
    getSingleProduct();
  }, []);

  const handelUpdate = async () => {
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("discription", discription);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `/api/v1/product/update-product/${pid}`,
        productData
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/product");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while updating product");
    }
  };

  const handelDelete = async()=>{
    try {
      const {data} = await axios.delete( `/api/v1/product/delete-product/${pid}`);
      if(data.success){
        toast.success('product deleted successfully');
        navigate("/dashboard/admin/product");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something Went Wrong`);
    }
  }
  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>Update Product</h3>
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
                }}
                value={category}
              >
                {categories?.map((c) => {
                  return (
                    <Option key={c._id} value={c._id}>
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
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div>
                    <img
                    src={`/api/v1/product/get-product-photo/${pid}`}
                      alt="product-photo"
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
                  value={shipping ? "YES" : "NO"}
                >
                  <Option value="1">YES</Option>
                  <Option value="0">NO</Option>
                </Select>
                <button className="btn btn-primary" onClick={handelUpdate}>
                  UPDATE PRODUCT
                </button>
                <button className="btn btn-danger" onClick={handelDelete}>DELETE PRODUCT</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateProduct;
