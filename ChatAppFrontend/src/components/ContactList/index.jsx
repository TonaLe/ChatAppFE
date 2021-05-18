import React from 'react';
import './ContactList.css';

const ContactList = ({userList, isSearch, onChose}) => {
  return (
    <div id="contacts" hidden={isSearch}>
      <ul
        style={{
          marginTop: '1rem',
          minHeight: '100%',
          listStyleType: 'none',
          padding: 0,
        }}
      >
        {userList.map((user) => (
          <li
            className="contact"
            key={user.id}
            onClick={() => {
              user?.type === 'Inbox'
                ? onChose(user.senderUsername, user.senderPhotoUrl)
                : onChose(user.recipientUsername, user.recipientPhotoUrl);
            }}
          >
            <div className="wrap">
              <img
                src={
                  user?.type === 'Inbox'
                    ? user.senderPhotoUrl
                    : user.recipientPhotoUrl
                }
                alt=""
              />
              <div className="meta pt-0 d-flex flex-column">
                <div className="name">
                  {user?.type === 'Inbox'
                    ? user.senderUsername
                    : user.recipientUsername}
                </div>
                <div className="message-text">
                  message content dsfsdf sdfsdfs fsdfsd fsdfs dfsd sdfsdfsd sdfsd fsd fsd
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ContactList;
