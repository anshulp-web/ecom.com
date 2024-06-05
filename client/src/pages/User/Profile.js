import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import UserMenu from '../../components/layout/UserMenu';
import { useAuth } from '../../context/Auth';
import Password from 'antd/es/input/Password';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setName(auth?.user?.data?.name);
    setPhone(auth?.user?.data?.phone);
    setAddress(auth?.user?.data?.address);
    setEmail(auth?.user?.data?.email);
  }, [auth?.user?.data]);
  //UPDATE PROFILE
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/update-profile`,
        { name, phone, address, email }
      );
      if (data?.success) {
        setAuth({
          ...auth,
          user: data?.result,
        });
        let local = localStorage.getItem('auth');
        local = JSON.parse(local);

        local.data = data.result;

        localStorage.setItem('auth', JSON.stringify(local));

        toast.success('Profile Updated Successfully');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in profile update');
    }
  };
  return (
    <>
      <Layout title={'Ecom.com -User Profile'}>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h2>User Profile</h2>
              <form onSubmit={handleProfileUpdate}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    disadbled="true"
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    style={{ backgroundColor: '#8080802b' }}
                    value={email}
                    onChange={(e) => setEmail(email)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary mb-5">
                  Update User Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
