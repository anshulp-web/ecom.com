import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import { Select } from 'antd';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Option } from 'antd/es/mentions';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const [categories, SetCategories] = useState([]);
  const [category, SetCategory] = useState('');
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [shipping, setShipping] = useState('');
  const [id, setId] = useState('');
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchCategory();
    fetchSingleProduct();
  }, []);
  const fetchCategory = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/category/get-category`
    );
    if (data.success) {
      SetCategories(data.allCategory);
    }
  };

  //GET SINGLE PRODUCT
  const fetchSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.id}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setPrice(data.product.price);
      setDescription(data.product.description);
      setQuantity(data.product.quantity);
      SetCategory(data.product.category._id);
      setShipping(data.product.shipping);
    } catch (error) {
      toast.error('Something went wrong in fetching single product');
    }
  };

  //CREATE CATEGORY
  const handleSubmit = async (e) => {
    e.preventDefault();
    switch (true) {
      case !category:
        return toast.error('Category is required');
      case !name:
        return toast.error('Name is required');
      case !price:
        return toast.error('Price is required');
      case !quantity:
        return toast.error('Quantity is required');
      case !description:
        return toast.error('Description is required');
      case !shipping:
        return toast.error('Shipping is required');
    }
    try {
      const productData = new FormData();
      productData.append('category', category);
      photo && productData.append('photo', photo);
      productData.append('name', name);
      productData.append('price', price);
      productData.append('quantity', quantity);
      productData.append('description', description);
      productData.append('shipping', shipping);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success('Product updated successfully');
        navigate('/dashboard/admin/products');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong in update');
    }
  };
  //DELETE PRODUCT
  const deleteProduct = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success('Product deleted successfully');
        navigate('/dashboard/admin/products');
      } else {
        toast.error('Something went wrong in product delete');
      }
    } catch (error) {
      toast.error('Something went wrong in product delete');
    }
  };
  return (
    <>
      <Layout title={'Ecom.com -Create Product'}>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 w-80">
                    <Select
                      placeholder="Select a category"
                      bordered={false}
                      showSearch
                      className="form-select mb-3"
                      value={category}
                      onChange={(value) => {
                        SetCategory(value);
                      }}
                    >
                      {categories.map((c) => (
                        <Option key={c._id} value={c._id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="mb-3 w-80">
                    <label className="btn btn-outline-secondary col-md-12">
                      {photo ? photo.name : 'Upload photo'}
                      <input
                        type="file"
                        name="photo"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        accept="image/*"
                        hidden
                      />
                    </label>
                  </div>
                  <div className="mb-3">
                    {photo ? (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="Image photo"
                          className="img img-responsive w-25 h-100"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                          alt="Image photo"
                          className="img img-responsive w-25 h-100"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-3 w-80">
                    <input
                      type="text"
                      placeholder="Product Name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 w-80">
                    <input
                      type="number"
                      placeholder="Product Price"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 w-80">
                    <input
                      type="number"
                      placeholder="Product Quantity"
                      className="form-control"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 w-80">
                    <textarea
                      placeholder="Product Description"
                      cols="30"
                      rows="2"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3 w-80">
                    <Select
                      placeholder="Select a shipping"
                      bordered={false}
                      showSearch
                      value={shipping ? 'Yes' : 'No'}
                      className="form-select mb-3"
                      onChange={(value) => {
                        setShipping(value);
                      }}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <button
                    type="submit"
                    style={{ margin: '0px auto' }}
                    className="btn btn-primary mb-3 d-block"
                  >
                    Update Product
                  </button>
                  <button
                    type="button"
                    onClick={deleteProduct}
                    style={{ margin: '0px auto' }}
                    className="btn btn-danger mb-3 d-block"
                  >
                    Delete Product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateProduct;
