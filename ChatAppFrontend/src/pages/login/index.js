import axios from 'axios';
import {isEmpty} from 'lodash';
import React, {useState} from 'react';
import { Redirect, useHistory} from 'react-router-dom';
import './login.css';

const Login = () => {
  const [formRegister, setFormRegister] = useState({
    fullName: '',
    username: '',
    password: '',
    dateOfBirth: '',
    gender: 'male',
    city: '',
  });
  console.log("🚀 ~ file: index.js ~ line 9 ~ Login ~ formRegister", formRegister)

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
          localStorage.setItem('token', token);
          localStorage.setItem('userInfo', JSON.stringify(restData));
        }
        history.push('/message');
      })
      .catch((error) => {
        if (error.response?.status === 401) setShow(true)
        console.log(error?.response)
      });

    event.preventDefault();
  };

  const handleSubmitRegister = (event) => {
    const registerProps = {
      username: formRegister.username,
      password: formRegister.password,
      knownas: formRegister.fullName,
      gender: formRegister.gender,
      city: formRegister.city
    }

    if (formRegister.dateOfBirth) registerProps.dateOfBirth = formRegister.dateOfBirth

    axios
      .post(`http://localhost:5000/api/account/register`, registerProps)
      .then((res) => {
        if (res?.status === 201) {
          history.push('/login');
        }
      })
      .catch((error) => console.log(error));

    event.preventDefault();
  };

  const [show, setShow] = useState(false);

  const handleChangeRegister = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  };

  const handleChangeLogin = (event) => {
    setShow(false)
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
          {show && <div className="ml-3 mt-3 text-danger">Username or password incorrect</div>}
        </div>
        <div className="register-wrapper mt-5 mb-5">
          <div className="register-container">
            <form onSubmit={handleSubmitRegister} className="register-form">
              <h3>Sign up</h3>

              <div className="form-group">
                <label>
                  User name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter user name"
                  name="username"
                  value={formRegister.username}
                  onChange={handleChangeRegister}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={formRegister.password}
                  onChange={handleChangeRegister}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Your name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="Enter your name"
                  value={formRegister.fullName}
                  onChange={handleChangeRegister}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date of birth</label>
                <input
                  type="date"
                  className="form-control"
                  name="dateOfBirth"
                  value={formRegister.dateOfBirth}
                  onChange={handleChangeRegister}
                />
              </div>

              <div className="form-group">
                <label>Your city</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="Enter your city"
                  value={formRegister.city}
                  onChange={handleChangeRegister}
                />
              </div>

              <div className="form-group">
                <p>Please select your gender:</p>
                <div className="d-flex align-items-center">
                  <input
                    className="mb-2"
                    type="radio"
                    name="gender"
                    onChange={handleChangeRegister}
                    value="male"
                    id="male"
                    checked={formRegister.gender === 'male'}
                  />
                  <label for="male" className="ml-2">Male</label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    className="mb-2"
                    type="radio"
                    name="gender"
                    onChange={handleChangeRegister}
                    value="female"
                    id="female"
                    checked={formRegister.gender === 'female'}
                  />
                  <label for="female" className="ml-2">Female</label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    className="mb-2"
                    type="radio"
                    name="gender"
                    onChange={handleChangeRegister}
                    value="other"
                    id="other"
                    checked={formRegister.gender === 'other'}
                  />
                  <label for="other" className="ml-2">Other</label>
                </div>
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
