import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Header />
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <main>
        <Toaster />
        {children}
      </main>
      <Footer />
    </>
  );
};
Layout.defaultProps = {
  title: 'Ecom.com -shop now',
  description: 'Ecommerce App',
  author: 'anshul',
  keywords: 'mern,ecommerce app',
};
export default Layout;
