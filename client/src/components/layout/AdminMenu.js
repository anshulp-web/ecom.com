import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <>
      <div className="text-center admin-menu">
        <h1>Admin Panel</h1>
        <div className="list-group">
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            Create Product
          </NavLink>

          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            Products
          </NavLink>

          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
