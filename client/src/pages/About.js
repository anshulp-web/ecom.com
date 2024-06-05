import React from 'react';
import Layout from '../components/layout/Layout';

const About = () => {
  return (
    <>
      <Layout title="Ecom.com -About">
        <div className="row contactus ">
          <div className="col-md-6 ">
            <img
              src="/images/about.jpeg"
              alt="aboutus"
              style={{ width: '100%' }}
            />
          </div>
          <div className="col-md-4">
            <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
            <p className="text-justify mt-2">Ecommerce platform</p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
