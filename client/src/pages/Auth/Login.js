import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/layout/Layout';
import toast from 'react-hot-toast';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/Authstyle.css';
import { useAuth } from '../../context/Auth';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);

        setAuth({
          ...auth,
          user: res.data,
          token: res.token,
        });

        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || '/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error in Login');
    }
  };
  return (
    <>
      <Layout title={'Ecom.com -Login'}>
        <div className="register form-container">
          <h4>Login</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="exampleInputEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="exampleInputPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary text-center">
              Login
            </button>
            <div className="mb-3 text-center mt-3">
              <NavLink to="/forgot-password">Forgot Password?</NavLink>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
