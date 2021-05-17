import React, {useEffect, useState} from 'react';
import HeaderBar from '../../components/headerBar';
import './profile.css';
import axios from 'axios';
import {isEmpty} from 'lodash';
import defaultUser from '../../assets/images/profile/defaultUser.png';
import {useParams} from 'react-router';
import {Button, Modal} from 'react-bootstrap';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const {username} = useParams();
  const [refetch, setRefetch] = useState(false);

  const userInfoStorage =
    localStorage.getItem('userInfo') &&
    JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${username || ''}`)
      .then((res) => {
        if (!isEmpty(res?.data)) {
          setUserInfo(res?.data);
        }
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  const [formProfile, setFormProfile] = useState({});

  useEffect(() => {
    setFormProfile({
      knownAs: userInfo?.knownAs || 'your name',
      dateOfBirth: userInfo?.dateOfBirth?.split('T')[0] || 'your DOB',
      gender: userInfo?.gender || 'your gender',
      city: userInfo?.city || 'your city',
      introduction: userInfo?.introduction || 'your introduction',
    });
  }, [userInfo]);

  const handleChangeProfile = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormProfile({
      ...formProfile,
      [name]: value,
    });
  };

  const [isEditMode, setIsEditMode] = useState(false);

  const handleSubmitProfile = (event) => {
    axios
      .put(`http://localhost:5000/api/users`, formProfile)
      .then((res) => {
        if (res?.status === 204) {
          setRefetch(!refetch);
          setIsEditMode(false);
        }
      })
      .catch((error) => console.log(error));
    event.preventDefault();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleSendRequest = () => {
    setShow(false);
  };

  return (
    <>
      <HeaderBar />
      <div className="page-content page-container wrapper" id="page-content">
        <div className="padding">
          <div className="row d-flex justify-content-between">
            <div className="col-md-8">
              <div className="card user-card-full">
                <form onSubmit={handleSubmitProfile}>
                  <div className="row m-l-0 m-r-0">
                    <div className="col-sm-4 bg-c-lite-green user-profile">
                      <div className="card-block text-center text-white">
                        <div className="m-b-25">
                          {' '}
                          <img
                            src={userInfo?.photoUrl || defaultUser}
                            className="img-radius"
                            alt="User-Profile"
                            width={100}
                          />{' '}
                        </div>
                        <p>{userInfo?.username || ''}</p>{' '}
                        {!isEditMode ? (
                          <h6 className="f-w-600">
                            {formProfile?.knownAs || ''}
                          </h6>
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            name="knownAs"
                            value={formProfile.knownAs}
                            onChange={handleChangeProfile}
                          />
                        )}
                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="text-right mt-3">
                        {userInfoStorage?.username === username ? (
                          <button
                            type="button"
                            onClick={() => setIsEditMode(!isEditMode)}
                            className="btn btn-primary"
                          >
                            Edit Profile
                          </button>
                        ) : (
                          <>
                            <Button variant="primary" onClick={handleShow}>
                              Add friend
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Notification</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                You will become friends if the friend request is
                                accepted
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="primary"
                                  onClick={handleSendRequest}
                                >
                                  Send request
                                </Button>
                                <Button
                                  variant="secondary"
                                  onClick={handleClose}
                                >
                                  Cancel
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </>
                        )}
                      </div>
                      <div className="card-block mb-3">
                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                          Information
                        </h6>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Date of Birth</p>
                            {!isEditMode ? (
                              <h6 className="text-muted f-w-400">
                                {formProfile?.dateOfBirth || ''}
                              </h6>
                            ) : (
                              <input
                                type="date"
                                className="form-control"
                                name="dateOfBirth"
                                value={formProfile?.dateOfBirth}
                                onChange={handleChangeProfile}
                              />
                            )}
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Gender</p>

                            {!isEditMode ? (
                              <h6 className="text-muted f-w-400">
                                {formProfile?.gender}
                              </h6>
                            ) : (
                              <>
                                {' '}
                                <div className="d-flex align-items-center">
                                  <input
                                    className="mb-2"
                                    type="radio"
                                    name="gender"
                                    onChange={handleChangeProfile}
                                    value="male"
                                    id="male"
                                    checked={formProfile.gender === 'male'}
                                  />
                                  <label for="male" className="ml-2">
                                    Male
                                  </label>
                                </div>
                                <div className="d-flex align-items-center">
                                  <input
                                    className="mb-2"
                                    type="radio"
                                    name="gender"
                                    onChange={handleChangeProfile}
                                    value="female"
                                    id="female"
                                    checked={formProfile.gender === 'female'}
                                  />
                                  <label for="female" className="ml-2">
                                    Female
                                  </label>
                                </div>
                                <div className="d-flex align-items-center">
                                  <input
                                    className="mb-2"
                                    type="radio"
                                    name="gender"
                                    onChange={handleChangeProfile}
                                    value="other"
                                    id="other"
                                    checked={formProfile.gender === 'other'}
                                  />
                                  <label for="other" className="ml-2">
                                    Other
                                  </label>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">City</p>
                            {!isEditMode ? (
                              <h6 className="text-muted f-w-400">
                                {formProfile?.city || ''}
                              </h6>
                            ) : (
                              <input
                                type="text"
                                className="form-control"
                                name="city"
                                value={formProfile.city}
                                onChange={handleChangeProfile}
                              />
                            )}
                          </div>
                        </div>
                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Introduction
                        </h6>
                        {!isEditMode ? (
                          <div>{formProfile?.introduction || ''}</div>
                        ) : (
                          <textarea
                            className="form-control"
                            name="introduction"
                            value={formProfile.introduction}
                            onChange={handleChangeProfile}
                          />
                        )}
                        {isEditMode && (
                          <div className="mt-4">
                            <button
                              type="submit"
                              className="btn btn-primary col-sm-3"
                            >
                              Update profile
                            </button>
                            <button
                              type="button"
                              className="btn btn-dark ml-3 col-sm-2"
                              onClick={() => setIsEditMode(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {userInfoStorage?.username === username && (
              <div className="col-md-3 friendRequest">
                <h5 className="mt-3 mb-4 text-center">List friend request</h5>
                <div className="friendWrapper">
                  <div className="friend mb-3">
                    <div>
                      <img
                        src={defaultUser}
                        className="img-radius"
                        alt="User-Profile"
                        width={45}
                      />
                      <span className="ml-3 text-light">Name</span>
                    </div>
                    <div className="text-right">
                      <span>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary ml-3"
                        >
                          Accept
                        </button>
                      </span>
                      <span>
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary ml-3"
                        >
                          Cancel
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="friend mb-3">
                    <div>
                      <img
                        src={defaultUser}
                        className="img-radius"
                        alt="User-Profile"
                        width={45}
                      />
                      <span className="ml-3 text-light">Name</span>
                    </div>
                    <div className="text-right">
                      <span>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary ml-3"
                        >
                          Accept
                        </button>
                      </span>
                      <span>
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary ml-3"
                        >
                          Cancel
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="friend mb-3">
                    <div>
                      <img
                        src={defaultUser}
                        className="img-radius"
                        alt="User-Profile"
                        width={45}
                      />
                      <span className="ml-3 text-light">Name</span>
                    </div>
                    <div className="text-right">
                      <span>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary ml-3"
                        >
                          Accept
                        </button>
                      </span>
                      <span>
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary ml-3"
                        >
                          Cancel
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="friend mb-3">
                    <div>
                      <img
                        src={defaultUser}
                        className="img-radius"
                        alt="User-Profile"
                        width={45}
                      />
                      <span className="ml-3 text-light">Name</span>
                    </div>
                    <div className="text-right">
                      <span>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary ml-3"
                        >
                          Accept
                        </button>
                      </span>
                      <span>
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary ml-3"
                        >
                          Cancel
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
