import React, { useState } from "react";
import {NavLink} from 'react-router-dom';
import "./admin.css"
const UserMenu = () => {
  const [color1,setColor1] = useState("white")
  const [color2,setColor2] = useState("#1bdd35")
  return (
      
      <div
        className="list-group"
        id="newwone"
       >
        <h3>USER MENU</h3>
        <NavLink
           style={{
            backgroundColor:color1,
            color:"green"
          }}
          onClick={()=>{setColor2("white");setColor1("#1bdd35");}}
          to={"/dashboard/user/profile"}
          className="list-group-item list-group-item-action"
        >
          Profile
        </NavLink>
        <NavLink
          id="ord"
          style={{
            backgroundColor:color2,
            color:"green"
          }}
          onClick={()=>{setColor1("white");setColor2("#1bdd35")}}
          to={"/dashboard/user/order"}
          className="list-group-item list-group-item-action"
        >
          Orders
        </NavLink>
      </div>

  );
};

export default UserMenu;
