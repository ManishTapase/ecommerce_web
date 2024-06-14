import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div
        className="list-group"
        id="newwone"
        >
        <h3>Admin Menu</h3>
        <NavLink
          to={"/dashboard/admin/create-category"}
          className="list-group-item list-group-item-action"
        >
          create category
        </NavLink>
        <NavLink
          to={"/dashboard/admin/create-product"}
          className="list-group-item list-group-item-action"
        >
          create product
        </NavLink>
        <NavLink
          to={"/dashboard/admin/product"}
          className="list-group-item list-group-item-action"
        >
          products
        </NavLink>
        <NavLink
          to={"/dashboard/admin/all-orders"}
          className="list-group-item list-group-item-action"
        >
          orders
        </NavLink>
      </div>
    </>
  );
};

export default AdminMenu;
