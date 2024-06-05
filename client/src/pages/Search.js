import React from 'react';
import Layout from '../components/layout/Layout';
import { useSearch } from '../context/Search';

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <>
      <Layout>
        <div className="text-center mt-5">
          <h2>Search Result</h2>
          <h6>
            {values?.results.length < 1
              ? 'No product found'
              : `Found ${values.results.length}`}
          </h6>
          <div className="d-flex mb-2">
            {values.results?.map((prod) => (
              <div
                key={prod._id}
                className="card m-2"
                style={{ width: '18rem' }}
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${prod._id}`}
                  alt="img"
                  className="card-img-top product-image"
                />
                <div className="card-body">
                  <h5 className="card-title">{prod.name}</h5>
                  <p className="card-text">
                    {prod.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">₹{prod.price}</p>
                  <div className="d-flex">
                    <button className="btn btn-primary">More Detail</button>
                    <button className="btn btn-primary ms-1">Add Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Search;
