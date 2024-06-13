import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Layout from "../Layouts/layout";
const Register = () => {
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [answer,setAnswer] = useState("");
    const [address,setAddress] = useState("");
 const HandelSubmit = async(e)=>{
       e.preventDefault();
       try {
         const res = await axios.post('http://localhost:5000/api/v1/auth/register',{
          name,email,phone,password,answer,address
         })
          console.log(res.data);
         if(res.data.success){
          navigate("/login");
         }else{
          alert("error in register ");
         }
       } catch (error) {
          alert("somthing went wrong....!",error);
       }
         
 }
  return (
    <>
      <Layout>
        <section
          style={{
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "28em",
              width: "20em",
              border: "2px solid #83f292",
              borderRadius: "10px",
            }}
          >
            <form
              onSubmit={HandelSubmit}
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
                  letterSpacing:"3px"
                }}
              >
                Register
              </h4>
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
                    borderRadius: "10px",
                    fontFamily: "Ubuntu",
                    position: "relative",
                    top: "1em",
                    padding: "10px",
                    color: "green",
                  }}
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter your email"
                  name="name"
                  required
                  style={{
                    width: "15em",
                    height: "2em",
                    border: "2px solid rgba(41, 40, 40, 0.891)",
                    borderRadius: "10px",
                    fontFamily: "Ubuntu",
                    position: "relative",
                    top: "1em",
                    padding: "10px",
                    color: "green",
                  }}
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
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
                    borderRadius: "10px",
                    fontFamily: "Ubuntu",
                    position: "relative",
                    top: "1em",
                    padding: "10px",
                    color: "green",
                  }}
                  value={phone}
                  onChange ={(e)=> setPhone(e.target.value)}
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
                    borderRadius: "10px",
                    fontFamily: "Ubuntu",
                    position: "relative",
                    top: "1em",
                    padding: "10px",
                    color: "green",
                  }}
                  value={address}
                  onChange={(e)=>{setAddress(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  required
                  style={{
                    width: "15em",
                    height: "2em",
                    border: "2px solid rgba(41, 40, 40, 0.891)",
                    borderRadius: "10px",
                    fontFamily: "Ubuntu",
                    position: "relative",
                    top: "1em",
                    padding: "10px",
                    color: "green",
                  }}
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter your pet name ?"
                  required
                  name="name"
                  style={{
                    width: "15em",
                    height: "2em",
                    border: "2px solid rgba(41, 40, 40, 0.891)",
                    borderRadius: "10px",
                    fontFamily: "Ubuntu",
                    position: "relative",
                    top: "1em",
                    padding: "10px",
                    color: "green",
                  }}
                value={answer}
                onChange={(e)=>setAnswer(e.target.value)}
                />
              </div>
              <button
                type="submit"
                style={{
                  position: "relative",
                  top: "2em",
                  border: "0px",
                  borderRadius: "5px",
                  fontFamily: "Ubuntu",
                  color:"white",
                  background:"green",
                }}
              >
                sign up
              </button>
              <div style={{ position: "relative", top: "2.5em" }}>
                <p
                  style={{
                    fontFamily: "Bebas Neue, cursive",
                  }}
                >
                  I Already have an account?
                  <span
                    onClick={()=>navigate('/login')}
                    style={{
                      color:"green",
                      padding: "10px",
                      cursor: "pointer",
                    }}
                   >
                    {" "}
                    Login
                  </span>
                </p>
              </div>
            </form>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Register;
