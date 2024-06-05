import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const SingleProduct = () => {
  const param = useParams();
  const [product, setProduct] = useState({});
  const [similarproducts, setSimilarProduct] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    productDetail();
  }, [param.slug]);
  //GET PRODUCT USING SLUG
  const productDetail = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-single-product/${param.slug}`
      );
      if (data?.success) {
        setProduct(data.product);
        similarProduct(data?.product?._id, data?.product?.category?._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //GET SIMILAR PRODUCT
  const similarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-similar-product/${cid}/${pid}`
      );
      if (data?.success) {
        setSimilarProduct(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout title={`${product?.name}`}>
        <div className="row container mt-5">
          <div className="col-md-6">
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
              alt="img"
              className="card-img-top"
              style={{ aspectRatio: '2', objectFit: 'contain' }}
            />
          </div>
          <div className="col-md-6">
            <h2>Product Detail</h2>
            <h4>Name : {product?.name}</h4>
            <h4>Description : {product?.description?.substring(0, 30)}</h4>
            <h4>Price : Rs {product?.price}</h4>
            <h4>Category : {product?.category?.name}</h4>
            <button className="btn btn-primary ms-1">Add Cart</button>
          </div>
        </div>
        {similarproducts != '' ? (
          <div className="row">
            <h1 className="text-center">Similar Product</h1>
            <div className="d-flex flex-wrap justify-content-center">
              {similarproducts?.map((p) => (
                <div
                  key={p?._id}
                  className="card m-2"
                  style={{ width: '18rem' }}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    alt="img"
                    className="card-img-top product-image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text"> Rs {p.price}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={(e) => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ''
        )}
      </Layout>
    </>
  );
};

export default SingleProduct;
