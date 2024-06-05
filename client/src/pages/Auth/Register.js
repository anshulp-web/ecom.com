import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/layout/Layout';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../styles/Authstyle.css';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error in Registration');
    }
  };
  return (
    <>
      <Layout title={'Ecom.com -Signup'}>
        <div className="form-container">
          <h4>Signup</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="exampleInputName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="exampleInputPhone" className="form-label">
                Mobile Number
              </label>
              <input
                type="number"
                className="form-control"
                name="phone"
                id="exampleInputPhone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAddress" className="form-label">
                Address
              </label>
              <textarea
                name="text"
                id="exampleInputAddress"
                cols="30"
                rows="1"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAnswer" className="form-label">
                Security Question
              </label>
              <input
                name="text"
                id="exampleInputAnswer"
                cols="30"
                rows="1"
                className="form-control"
                value={answer}
                placeholder="What is your birth place"
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary text-center">
              Register
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
