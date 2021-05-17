import React, { useEffect, useState } from "react";

const ContactList = ({ userList, isSearch, onChose }) => {
  return (
    <div id="contacts" hidden={isSearch}>
      <ul
        style={{
          marginTop: "1rem",
          minHeight: "100%",
          listStyleType: "none",
          padding: 0,
        }}
      >
        {userList.map((user) => (
          <li className="contact" key={user.id}>
            <div className="wrap">
              <span className="contact-status online"></span>
              <img
                src={
                  user?.type === "Inbox"
                    ? user.senderPhotoUrl
                    : user.recipientPhotoUrl
                }
                alt=""
                onClick={() => {
                  user?.type === "Inbox"
                    ? onChose(user.senderUsername, user.senderPhotoUrl)
                    : onChose(user.recipientUsername, user.recipientPhotoUrl);
                }}
              />
              <div className="meta">
                <p className="name">
                  {user?.type === "Inbox"
                    ? user.senderUsername
                    : user.recipientUsername}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ContactList;
