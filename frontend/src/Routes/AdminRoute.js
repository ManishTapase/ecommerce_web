import React ,{useState,useEffect}from 'react';
import { useAuth } from '../Contexts/AuthContext';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
const AdminRoute = () => {
    const [auth,setAuth] = useAuth("");
    const [ok,setOk] = useState(false);
    useEffect(()=>{
        const checkAuth = async()=>{
            const result = await axios.get("http://localhost:5000/api/v1/auth/admin-auth");
            if(result.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        }
    if(auth?.token) checkAuth();
    },[auth?.token])
  return ok ?  <Outlet/> : <Spinner path=''/>;
}
export default AdminRoute;
