import React from 'react';
import Layout from '../components/layout/Layout';

const Policy = () => {
  return (
    <>
      <Layout title={'Ecom.com -Privacy Policy'}>
        <div className="row contactus ">
          <div className="col-md-6 ">
            <img
              src="/images/about.jpeg"
              alt="aboutus"
              style={{ width: '100%' }}
            />
          </div>
          <div className="col-md-4">
            <h1 className="bg-dark p-2 text-white text-center">
              PRIVACY POLICY
            </h1>
            <p className="text-justify mt-2">1. First term</p>
            <p className="text-justify mt-2">2. Secon term</p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Policy;
