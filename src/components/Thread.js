import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import "./Thread.css";
import {
  TimerOutlined,
  SendRounded,
  MicNoneOutlined,
} from "@material-ui/icons";
import db from "../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectThreadId, selectThreadName } from "../features/threadSlice";
import Message from "./Message";

const Thread = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const threadName = useSelector(selectThreadName);
  const threadId = useSelector(selectThreadId);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (threadId) {
      db.collection("threads")
        .doc(threadId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [threadId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("threads").doc(threadId).collection("messages").add({
      timestamp: firebase.firestore().FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });

    setInput("");
  };
  console.log(input);
  return (
    <div className="thread">
      <div className="thread__header">
        <div className="thread__headerContents">
          <Avatar />
          <div className="thread__headerContentsInfo">
            <h4>ThreadName</h4>
            <h5>LastSeen</h5>
          </div>
        </div>
        <IconButton>
          <MoreHoriz className="thread__headerDetails" />
        </IconButton>
      </div>
      <div className="thread__messages">
        {messages.map(({ id, data }) => (
          <Message key={id} data={data} />
        ))}
      </div>
      <div className="thread__input">
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a message ...."
          />
          <IconButton>
            <TimerOutlined />
          </IconButton>
          <IconButton onClick={sendMessage}>
            <SendRounded />
          </IconButton>
          <IconButton>
            <MicNoneOutlined />
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default Thread;
