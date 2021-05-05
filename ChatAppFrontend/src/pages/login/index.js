import axios from 'axios';
import {isEmpty} from 'lodash';
import React, {useState} from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import './login.css';

const Login = () => {
  const [formRegister, setFormRegister] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
  });

  const [formLogin, setFormLogin] = useState({
    username: '',
    password: '',
  });

  const history = useHistory();

  const handleSubmitLogin = (event) => {
    axios
      .post(`http://localhost:5000/api/account/login`, formLogin)
      .then((res) => {
        if (!isEmpty(res?.data)) {
          const {token, ...restData} = res?.data;
          console.log('🚀 ~ file: index.js ~ line 29 ~ .then ~ token', token);
          localStorage.setItem('token', token);
          localStorage.setItem('userInfo', JSON.stringify(restData));
        }
        history.push('/message');
      })
      .catch((error) => console.log(error));

    event.preventDefault();
  };

  const handleSubmitRegister = (event) => {
    axios
      .post(`http://localhost:5000/api/account/register`, formRegister)
      .then((res) => {
        if (res?.status === 201) {
          history.push('/login');
        }
      })
      .catch((error) => console.log(error));

    event.preventDefault();
  };

  const handleChangeRegister = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  };

  const handleChangeLogin = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  };

  return localStorage.getItem('token') ? (
    <Redirect to="/message" />
  ) : (
    <div className="wrapper">
      <div className="left">
        <div>
          <h3>Connect</h3>
          <p>Description connect</p>
        </div>
        <div>
          <h3>Chat</h3>
          <p>Description chat</p>
        </div>
      </div>
      <div className="right">
        <div className="login-wrapper mt-3">
          <form className="login-form d-flex" onSubmit={handleSubmitLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter user name"
                name="username"
                onChange={handleChangeLogin}
                value={formLogin.username}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={formLogin?.password}
                onChange={handleChangeLogin}
              />
            </div>

            <button type="submit" className="btn btn-dark">
              Login
            </button>
          </form>
        </div>
        <div className="register-wrapper mt-5">
          <div className="register-container">
            <form onSubmit={handleSubmitRegister} className="register-form">
              <h3>Sign up</h3>

              <div className="form-group">
                <label>First name</label>
                <input
                  type="text"
                  name="firstname"
                  className="form-control"
                  placeholder="First name"
                  value={formRegister.firstname}
                  onChange={handleChangeRegister}
                />
              </div>

              <div className="form-group">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  name="lastname"
                  value={formRegister.lastname}
                  onChange={handleChangeRegister}
                />
              </div>

              <div className="form-group">
                <label>User name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter user name"
                  name="username"
                  value={formRegister.username}
                  onChange={handleChangeRegister}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={formRegister.password}
                  onChange={handleChangeRegister}
                />
              </div>

              <button type="submit" className="btn btn-dark btn-lg btn-block">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
