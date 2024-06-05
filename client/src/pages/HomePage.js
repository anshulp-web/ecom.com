import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/Auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState('');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // FETCH CATEGORY
  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategory(data.allCategory);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategory();
    getTotal();
  }, []);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      if (data?.success) {
        setProducts(data?.products);
      } else {
        toast.error('Something went wrong fetching products');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching products:', error);
      toast.error('Something went wrong fetching products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //GET TOTAL PRODUCT COUNT
  const getTotal = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  //LOAD MORE DATA
  const loadMore = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // FILTER BY CATEGORY FUNCTION
  const handleFilter = (value, id) => {
    if (value) {
      setChecked([...checked, id]);
    } else {
      setChecked(checked.filter((c) => c !== id));
    }
  };

  // FILTER BY PRICE FUNCTION
  const handlePriceFilter = (value) => {
    setRadio(value);
  };

  // APPLY FILTERS
  useEffect(() => {
    if (checked.length || radio) {
      filterProducts();
    } else {
      fetchProducts(); // Fetch all products when no filters applied
    }
  }, [checked, radio]);

  // FILTER PRODUCTS
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/filter-product`,
        { checked, radio, page }
      );
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.error('Error filtering products:', error);
      toast.error('Something went wrong filtering products');
    }
  };

  return (
    <Layout title={'Ecom.com -Home'}>
      <div className="row">
        {/* Filter section */}
        <div className="col-md-2">
          <h4 className="text-center">Filter by categories</h4>
          <div className="d-block text-center">
            {category?.map((c) => (
              <Checkbox
                checked={checked.includes(c._id)}
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center">Filter by price</h4>
          <div className="d-flex flex-column mt-4 ms-4">
            <Radio.Group
              value={radio}
              onChange={(e) => handlePriceFilter(e.target.value)}
            >
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array} key={p._id}>
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-block text-center mt-5">
            <button
              type="button"
              onClick={() => {
                setChecked([]);
                setRadio('');
                setPage(1);
              }}
              className="btn btn-danger text-center"
            >
              Clear Filter
            </button>
          </div>
        </div>

        {/* Products display section */}
        <div className="col-md-10">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: '18rem' }}>
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
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        'cart',
                        JSON.stringify([...cart, p])
                      );
                      toast.success('Item added to cart');
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? 'Loading ...' : 'Loadmore'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
