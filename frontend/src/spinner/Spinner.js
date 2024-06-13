import React,{useState,useEffect} from "react";
import {useNavigate,useLocation} from "react-router-dom"
const Spinner = ({path = "/login"}) => {
const [count,setCount] = useState(5);
const navigate = useNavigate();
const location = useLocation();
useEffect(()=>{
    const interval = setInterval(()=>{
        setCount((preValue)=> --(preValue));
    },1000)
    count === 0 && navigate(`/${path}`, {
        state:location.pathname
    })
 return ()=>clearInterval(interval);
},[count,path,navigate,location])
  return (
      <>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <h3 className="text-center">Redirecting to you {count} seconds </h3>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
  );
};

export default Spinner;
