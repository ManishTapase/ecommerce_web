import React, { useEffect, useState } from "react";
import Layout from "../Layouts/layout";
import UserMenu from "../DashBoard/UserMenu";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/v1/auth/update-User-Profile`,
        {
          name,
          phone,
          password,
          address,
          email,
        }
      );

      if (data?.success) {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("user");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("user", JSON.stringify(ls));
        // toast.success("Profile Updated Successfully");
        toast.success(data.message);
      } else {
        toast.error("error while updating profile");
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error While Updating Your Profile");
    }
  };

  return (
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
            borderRight: "2px solid #83f292",
          }}
        >
          <UserMenu />
        </div>
        <div
          style={{
            height: "28em",
            width: "20em",
            border: "2px solid #83f292",
            borderRadius: "10px",
            position: "relative",
            left: "20vw",
            top:"2em"
          }}
        >
          <form
            onSubmit={handelUpdate}
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <h4
              style={{
                fontFamily: "Bebas Neue, cursive",
                position: "relative",
                top: ".4em",
                // color: "white",
                letterSpacing: "3px",
              }}
            >
              PROFILE
            </h4>
            <div style={{border:"2px solid #83f292" ,borderRadius:"50%",height:"6em",width:"6em",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
         <i className="fa-solid fa-user fa-4x" style={{color:"#33c446",position:"relative",top:"-.05em"}} />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                required
                style={{
                  width: "15em",
                  height: "2em",
                  border: "2px solid rgba(41, 40, 40, 0.891)",
                  background: "black",
                  borderRadius: "10px",
                  fontFamily: "Ubuntu",
                  position: "relative",
                  top: "2em",
                  padding: "10px",
                  color: "white",
                }}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Enter your email"
                name="name"
                disabled
                style={{
                  width: "15em",
                  height: "2em",
                  border: "2px solid rgba(41, 40, 40, 0.891)",
                  background: "black",
                  borderRadius: "10px",
                  fontFamily: "Ubuntu",
                  position: "relative",
                  top: "2em",
                  padding: "10px",
                  color: "white",
                }}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="Number"
                placeholder="Enter your phone"
                name="email"
                required
                style={{
                  width: "15em",
                  height: "2em",
                  border: "2px solid rgba(41, 40, 40, 0.891)",
                  background: "black",
                  borderRadius: "10px",
                  fontFamily: "Ubuntu",
                  position: "relative",
                  top: "2em",
                  padding: "10px",
                  color: "white",
                }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Enter your Address"
                name="Address"
                required
                style={{
                  width: "15em",
                  height: "2em",
                  border: "2px solid rgba(41, 40, 40, 0.891)",
                  background: "black",
                  borderRadius: "10px",
                  fontFamily: "Ubuntu",
                  position: "relative",
                  top: "2em",
                  padding: "10px",
                  color: "white",
                }}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                position: "relative",
                top: "3em",
                border: "0px",
                backgroundColor:"#1bdd35",
                borderRadius: "5px",
                fontFamily: "Ubuntu",
                color:"white"
              }}
            >
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
