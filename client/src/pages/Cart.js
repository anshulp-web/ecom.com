import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/Cart';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
} from '@mui/material';

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [name, SetName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [clientToken, setClientToken] = useState('');
  const [instance, setInstance] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //DELETE CART ITEM
  const removeCartItem = (pid) => {
    try {
      let cartData = [...cart];
      let i = cartData.findIndex((item) => item._id === pid);
      cartData.splice(i, 1);
      setCart(cartData);
      localStorage.setItem('cart', JSON.stringify(cartData));
      toast.success('Item removed successfully');
    } catch (error) {
      console.log('Error in cart delete');
    }
  };
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log('Erro in cart total');
    }
  };
  //GET PAYMENT GATEWAY TOKEN

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);
  //HANDLE PAYMNET
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/user/orders');
      toast.success('Payment Completed Successfully ');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center">
                {`Hello ${auth?.token && auth?.user?.data?.name}`}
              </h1>
              <h4 className="text-center">
                {cart?.length >= 1
                  ? `You have ${cart?.length} items in your cart.`
                  : 'Your cart is empty.'}
                {auth?.token ? '' : ' Please login to checkout'}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bolder' }}>
                        Product Image
                      </TableCell>
                      <TableCell style={{ fontWeight: 'bolder' }}>
                        Product Name
                      </TableCell>
                      <TableCell style={{ fontWeight: 'bolder' }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart
                      .filter((ct) =>
                        ct.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((ct) => (
                        <TableRow key={ct._id}>
                          <TableCell>
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${ct?._id}`}
                              alt="img"
                              className="card-img-top"
                              style={{ aspectRatio: '2', objectFit: 'contain' }}
                            />
                          </TableCell>
                          <TableCell>
                            {ct?.name}{' '}
                            <p>
                              Price: <b>Rs{ct?.price}</b>
                            </p>
                          </TableCell>
                          <TableCell>
                            <button
                              className="btn btn-danger"
                              onClick={() => removeCartItem(ct._id)}
                            >
                              Remove
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={cart?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
            <div className="col-md-4 text-center">
              <h3>Cart Summary</h3>
              <hr />

              <h5>Total Price : Rs {totalPrice()}</h5>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate('/dashboard/user/profile')}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate('/dashboard/user/profile')}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate('/login', {
                          state: '/cart',
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !cart?.length || !auth?.token ? (
                  ''
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance}
                    >
                      {loading ? 'Processing ....' : 'Make Payment'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Cart;
