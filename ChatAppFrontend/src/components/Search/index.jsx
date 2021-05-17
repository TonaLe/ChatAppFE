import React, { memo, useEffect, useState } from "react";
import ApiGet from "../../Utils/ApiGet";
import "../../pages/message/message.css";
const Search = ({onChose}) => {
  const [users, setUsers] = useState([]);
  const onFetchAllUsers = async () => {
    let userList = await ApiGet("users");
    setUsers(userList);
  };
  useEffect(() => {
    onFetchAllUsers();
  }, []);
  return users.length > 0 ? (
    <div id="contacts">
      <ul
        style={{
          marginTop: "1rem",
          minHeight: "100%",
          listStyleType: "none",
          padding: 0,
        }}
      >
        {users.map((user) => (
          <li className="contact" key={user.id}>
            <div className="wrap">
              <span className="contact-status online"></span>
              <img
                src={user.photoUrl}
                alt=""
                onClick={() =>
                  onChose(user.username, user.photoUrl)
                }
              />
              <div className="meta">
                <p className="name">{user.username}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>...Loading</div>
  );
};
export default Search;

