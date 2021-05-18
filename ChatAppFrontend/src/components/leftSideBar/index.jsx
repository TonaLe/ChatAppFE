import React, { memo, useState, useCallback, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Search from "../Search";
import { Nav } from "react-bootstrap";
import ContactList from "../ContactList";
import ApiGet from "../../Utils/ApiGet";

const LeftSideBar = memo(({ userInfo, onGetUserToChat }) => {
  console.log("LeftSideBar rendered");
  const history = useHistory()
  const [isSearch, setIsSearch] = useState(false);
  const [userList, setUserList] = useState([]);
  const onChangeIsSearch = useCallback(() => {
    setIsSearch(!isSearch);
  }, [isSearch]);
  const onChose = (username, photoUrl) => {
    onGetUserToChat(username, photoUrl);
    setIsSearch(false);
  };
  const handleSelect = (e) => {
    e === "Outbox" ? onFetchOutBoxUsers() : onFetchAllUsers();
  };
  const onFetchAllUsers = async () => {
    let users = await ApiGet(
      `messages?Username=${userInfo?.username}&Container=Inbox`
    );
    var UserInBoxs = users.map((u) => {
      return { ...u, type: "Inbox" };
    });
    setUserList([
      ...new Map(UserInBoxs.map((item) => [item["senderId"], item])).values(),
    ]);
  };

  const onFetchOutBoxUsers = async () => {
    let users = await ApiGet(
      `messages?Username=${userInfo?.username}&Container=Outbox`
    );
    var UserOutBoxs = users.map((u) => {
      return { ...u, type: "Outbox" };
    });
    setUserList([
      ...new Map(
        UserOutBoxs.map((item) => [item["recipientId"], item])
      ).values(),
    ]);
  };
  useEffect(() => {
    onFetchAllUsers();
  }, [userInfo]);

  const moveToProfile = () => {
    userInfo?.username && history.push(`/profile/${userInfo?.username}`)
  }

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
              onClick={moveToProfile}
            />
          </Link>

          <p>{userInfo !== null ? userInfo.username : "...loading"}</p>
        </div>
      </div>
      <div id="search" onClick={onChangeIsSearch}>
        <label>
          <i
            className={`fas fa-${isSearch ? "times" : "search"}`}
            aria-hidden="true"
            onClick={isSearch ? () => setIsSearch(false) : null}
          ></i>
        </label>
        <input
          type="text"
          style={{ width: "100%" }}
          placeholder="Search contacts..."
        />
      </div>
      {isSearch ? <Search onChose={onChose} /> : null}
      <Nav
        variant="pills"
        onSelect={handleSelect}
        defaultActiveKey="Inbox"
        justify
        className='my-2'
      >
        <Nav.Item className='mr-3'>
          <Nav.Link eventKey="Inbox" onClick={() => setIsSearch(false)}>Inbox</Nav.Link>
        </Nav.Item>
        <Nav.Item className='mr-3'>
          <Nav.Link eventKey="Outbox" onClick={() => setIsSearch(false)}>Outbox</Nav.Link>
        </Nav.Item>
      </Nav>
      {/* Contacts */}
      <ContactList userList={userList} isSearch={isSearch} onChose={onChose} />
      {/* <div id="bottom-bar">
        <button id="addcontact">
          <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>{" "}
          <span>Add contact</span>
        </button>
        <button id="settings">
          <i className="fa fa-cog fa-fw" aria-hidden="true"></i>{" "}
          <span>Settings</span>
        </button>
      </div> */}
    </div>
  );
});
export default LeftSideBar;
