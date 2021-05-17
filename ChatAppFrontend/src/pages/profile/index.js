import React, {useEffect, useState} from 'react';
import HeaderBar from '../../components/headerBar';
import './profile.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { isEmpty } from 'lodash';
import defaultUser from '../../assets/images/profile/defaultUser.png'
import { useParams } from 'react-router';

const Profile = () => {

  const [userInfo, setUserInfo] = useState({});
  const {username} = useParams()

  const userInfoStorage = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'))
  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/users/${username || ''}`)
    .then((res) => {
      if (!isEmpty(res?.data)) {
        setUserInfo(res?.data)
        console.log("🚀 ~ file: index.js ~ line 16 ~ .then ~ res", res)
      }
    })
    .catch((error) => console.log(error));
  }, [])


  return (
    <>
      <HeaderBar />
      <div class="page-content page-container wrapper" id="page-content">
        <div class="padding">
          <div class="row container d-flex justify-content-center">
            <div class="col-xl-6 col-md-12">
              <div class="card user-card-full">
                <div class="row m-l-0 m-r-0">
                  <div class="col-sm-4 bg-c-lite-green user-profile">
                    <div class="card-block text-center text-white">
                      <div class="m-b-25">
                        {' '}
                        <img
                          src={userInfo?.photoUrl || defaultUser}
                          class="img-radius"
                          alt="User-Profile-Image"
                          width={100}
                        />{' '}
                      </div>
                      <h6 class="f-w-600">{userInfo?.knownAs || ''}</h6>
                      <p>{userInfo?.username || ''}</p>{' '}
                      <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <div class="card-block">
                      <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                        Information
                      </h6>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Date of Birth</p>
                          <h6 class="text-muted f-w-400">{new Date(userInfo?.dateOfBirth)?.toLocaleDateString() || ''}</h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Gender</p>
                          <h6 class="text-muted f-w-400">{userInfo?.gender}</h6>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">City</p>
                          <h6 class="text-muted f-w-400">{userInfo?.city || ''}</h6>
                        </div>
                      </div>
                      <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        Introduction
                      </h6>
                      <div class="row">
                        <div>
                          {userInfo?.introduction || ''}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
