import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Layout from "../Layouts/layout";
const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
 const HandelSubmit = async(e)=>{
       e.preventDefault();
       try{
         const res = await axios.post('/api/v1/auth/login',{
          email,password
         })
          console.log(res.data);
         if(res.data.success){
          navigate("/");
          localStorage.setItem("user",JSON.stringify(res.data));
         }else{
          alert("error in login ");
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
              height: "22em",
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
                }}
              >
                Login
              </h4>
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
              <button
                type="submit"
                style={{
                  position: "relative",
                  top: "2em",
                  border: "0px",
                  borderRadius: "5px",
                  fontFamily: "Ubuntu",
                  background:"green",
                  color:"white"
                }}
              >
                sign in
              </button>
              <div style={{ position: "relative", top: "2.5em" }}>
                <p
                  style={{
                    fontFamily: "Bebas Neue, cursive",
                  }}
                >
                  I Don't have an account?
                  <span
                    onClick={()=>navigate('/register')}
                    style={{
                      color: "green",
                      padding: "10px",
                      cursor: "pointer",
                    }}
                  > {" "}
                    Register
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

export default Login;
