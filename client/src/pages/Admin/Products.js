import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Products = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/products`
      );
      if (data?.success) {
        setProducts(data?.products);
      } else {
        toast.error('Something went wrong in product fetchnig');
      }
    } catch (error) {
      toast.error('Something went wrong in product fetchnig');
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Layout title={'Ecom.com -All Products'}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2 className="text-center">All Products</h2>
            <div className="d-flex m-2 flex-wrap">
              {products?.map((prod) => (
                <Link
                  to={`/dashboard/admin/product/${prod.slug}`}
                  className="product-link"
                  key={prod._id}
                >
                  <div className="card m-2" style={{ width: '18rem' }}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${prod._id}`}
                      alt="img"
                      className="card-img-top product-image"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{prod?.name}</h5>

                      <p className="card-text">
                        {prod?.description.substring(0, 30)}...
                      </p>
                      <p className="card-text">Rs {prod?.price}</p>
                      <p className="card-text">{prod?.category?.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;
