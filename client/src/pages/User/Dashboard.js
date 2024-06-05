import React from 'react';
import Layout from '../../components/layout/Layout';
import UserMenu from '../../components/layout/UserMenu';
import { useAuth } from '../../context/Auth';
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <>
      <Layout title={'Ecom.com -Dashboard'}>
        <>
          <div className="container-fluid m-3 p-3">
            <div className="row">
              <div className="col-md-3">
                <UserMenu />
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
        </>
      </Layout>
    </>
  );
};

export default Dashboard;
