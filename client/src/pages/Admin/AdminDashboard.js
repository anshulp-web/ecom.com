import React from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import { useAuth } from '../../context/Auth';
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <>
      <Layout title={'Ecom.com -Admin Dashboard'}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                <h4>{auth?.user?.data?.name}</h4>
                <h4>{auth?.user?.data?.email}</h4>
                <h4>{auth?.user?.data?.phone}</h4>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminDashboard;
