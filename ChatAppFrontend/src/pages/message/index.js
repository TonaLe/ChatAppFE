import React, { useEffect, useState, useRef } from "react";
import HeaderBar from "../../components/headerBar";
import "./message.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ApiGet from "../../Utils/ApiGet";
import ApiPost from "../../Utils/ApiPost";
import LeftSideBar from "../../components/leftSideBar";
const Message = () => {
  console.log("homepage rendered");
  const information = localStorage.getItem("userInfo");
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  const [currMessages, setCurrMessages] = useState([]);
  const refInput = useRef();

  const onGetUserToChat = async (username, photoUrl) => {
    setCurrUser({ username, photoUrl });
    const userChatMessages = await ApiGet(`messages/thread/${username}`);
    setCurrMessages(userChatMessages);
    refInput.current.value = "";
  };
  const onSendMessage = async () => {
    if (refInput.current.value !== "") {
      const result = await ApiPost("messages", token, {
        recipientUsername: currUser.username,
        content: refInput.current.value,
      });
      onGetUserToChat(currUser.username, currUser.photoUrl);
      refInput.current.value = "";
    }
  };
  useEffect(() => {
    setUserInfo(JSON.parse(information));
  }, [information]);
  return (
    <div>
      <HeaderBar />
      <div id="frame">
        {userInfo ? (
          <LeftSideBar
            userInfo={userInfo}
            onGetUserToChat={onGetUserToChat}
          />
        ) : null}
        {currUser !== null ? (
          <div className="content">
            <div className="contact-profile">
              <img src={currUser.photoUrl} alt="" />
              <p>{currUser.username}</p>
              <div className="social-media">
                <i className="fa fa-facebook" aria-hidden="true"></i>
                <i className="fa fa-twitter" aria-hidden="true"></i>
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </div>
            </div>
            <div
              className="messages start-message"
              style={{ minWidth: "100%" }}
            >
              <ul>
                {currMessages.length > 0 ? (
                  currMessages.map((m, i) => (
                    <li
                      className={
                        m.recipientUsername !== currUser.username
                          ? "sent"
                          : "replies"
                      }
                      key={m.id}
                    >
                      <img src={m.senderPhotoUrl} alt="" />
                      <p>{m.content}</p>
                    </li>
                  ))
                ) : (
                  <div>...Loading</div>
                )}
              </ul>
            </div>
            <div className="message-input">
              <div className="wrap">
                <input
                  type="text"
                  ref={refInput}
                  placeholder="Write your message..."
                />
                <button className="submit" onClick={onSendMessage}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="start-message start-up">Pick a friend to chat</div>
        )}
      </div>
    </div>
  );
};

export default Message;
