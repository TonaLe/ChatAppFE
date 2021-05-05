import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
const LeftSideBar = memo(({ userInfo, userList, onGetUserToChat }) => {
  console.log("LeftSideBar rendered", userList);
  const onChose = (username, photoUrl) => {
    onGetUserToChat(username, photoUrl);
  };
  return (
    <div id="sidepanel">
      <div id="profile">
        <div className="wrap">
          <Link to={`#`}>
            <img
              id="profile-img"
              src={
                userInfo !== null
                  ? userInfo.photoUrl
                  : "http://emilcarlsson.se/assets/mikeross.png"
              }
              className="online"
              alt=""
            />
          </Link>

          <p>{userInfo !== null ? userInfo.username : "...loading"}</p>
          <i
            className="fa fa-chevron-down expand-button"
            aria-hidden="true"
          ></i>
          <div id="status-options">
            <ul>
              <li id="status-online" className="active">
                <span className="status-circle"></span> <p>Online</p>
              </li>
              <li id="status-away">
                <span className="status-circle"></span> <p>Away</p>
              </li>
              <li id="status-busy">
                <span className="status-circle"></span> <p>Busy</p>
              </li>
              <li id="status-offline">
                <span className="status-circle"></span> <p>Offline</p>
              </li>
            </ul>
          </div>
          <div id="expanded">
            <label htmlFor="twitter">
              <i className="fa fa-facebook fa-fw" aria-hidden="true"></i>
            </label>
            <input name="twitter" type="text" defaultValue="mikeross" />
            <label htmlFor="twitter">
              <i className="fa fa-twitter fa-fw" aria-hidden="true"></i>
            </label>
            <input name="twitter" type="text" defaultValue="ross81" />
            <label htmlFor="twitter">
              <i className="fa fa-instagram fa-fw" aria-hidden="true"></i>
            </label>
            <input name="twitter" type="text" defaultValue="mike.ross" />
          </div>
        </div>
      </div>
      <div id="search">
        <label>
          <i className="fas fa-search" aria-hidden="true"></i>
        </label>
        <input
          type="text"
          style={{ width: "100%" }}
          placeholder="Search contacts..."
        />
      </div>
      <div id="contacts">
        <ul style={{ marginTop: "1rem" }}>
          {userList.map((user) => (
            <li className="contact" key={user.id}>
              <div className="wrap">
                <span className="contact-status online"></span>
                <img
                  src={user.senderPhotoUrl}
                  alt=""
                  onClick={() =>
                    onChose(user.senderUsername, user.senderPhotoUrl)
                  }
                />
                <div className="meta">
                  <p className="name">{user.senderUsername}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div id="bottom-bar">
        <button id="addcontact">
          <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>{" "}
          <span>Add contact</span>
        </button>
        <button id="settings">
          <i className="fa fa-cog fa-fw" aria-hidden="true"></i>{" "}
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
});
export default LeftSideBar;
