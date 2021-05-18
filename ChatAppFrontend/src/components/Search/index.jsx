import React, {memo, useEffect, useState} from 'react';
import ApiGet from '../../Utils/ApiGet';
import '../../pages/message/message.css';
import defaultUser from '../../assets/images/profile/defaultUser.png';

const Search = ({onChose}) => {
  const [users, setUsers] = useState([]);
  const onFetchAllUsers = async () => {
    let userList = await ApiGet('users');
    setUsers(userList);
  };
  useEffect(() => {
    onFetchAllUsers();
  }, []);
  return users.length > 0 ? (
    <div id="contacts">
      <ul
        style={{
          marginTop: '1rem',
          minHeight: '100%',
          listStyleType: 'none',
          padding: 0,
        }}
      >
        {users.map((user) => {
          console.log("🚀 ~ file: index.jsx ~ line 26 ~ {users.map ~ user", user?.photoUrl)
          return (
            !(user.username).includes('admin') && (
              <li
                className="contact"
                key={user.id}
                onClick={() => onChose(user.username, user.photoUrl)}
              >
                <div className="wrap">
                  <img src={user.photoUrl || defaultUser} alt="" />
                  <div className="meta">
                    <p className="name">{user.username}</p>
                  </div>
                </div>
              </li>
            )
          );
        })}
      </ul>
    </div>
  ) : (
    <div>...Loading</div>
  );
};
export default Search;
