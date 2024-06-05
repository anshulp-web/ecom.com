import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../../context/Auth';
import toast from 'react-hot-toast';
import SearchInput from '../SearchForm/SearchInput';
import { Badge } from 'antd';
import { useCart } from '../../context/Cart';
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();
  const handlelogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    toast.success('Logout successfull');
    navigate('/login');
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to="/" className="navbar-brand">
              <FiShoppingCart /> Ecom.com
            </NavLink>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Signup
                    </NavLink>
                  </li>
                  <li className="nav-item" style={{ cursor: 'pointer' }}>
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/cart" className="nav-link">
                      Cart <Badge count={cart?.length} showZero></Badge>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <span
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.data?.name}
                    </span>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.data?.role == 1 ? 'admin' : 'user'
                          }`}
                          className="dropdown-item "
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <span
                          style={{ cursor: 'pointer' }}
                          onClick={handlelogout}
                          className="dropdown-item"
                        >
                          Logout
                        </span>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/cart" className="nav-link">
                      Cart <Badge count={cart?.length} showZero></Badge>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
