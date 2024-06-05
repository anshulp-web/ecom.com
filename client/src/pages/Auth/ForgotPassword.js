import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [answer, setAnswer] = useState('');
  const [newpassword, newPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {
          email,
          newpassword,
          answer,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout title={'Ecom.com -Forgot Password'}>
        <div className="register form-container">
          <h4>Forgot Password</h4>
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
              <label htmlFor="exampleInputAnswer" className="form-label">
                Answer Your Security Question
              </label>
              <input
                type="text"
                className="form-control"
                name="password"
                id="exampleInputAnswer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputNewPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="exampleInputNewPassword"
                value={newpassword}
                onChange={(e) => newPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary text-center">
              Reset Password
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ForgotPassword;
