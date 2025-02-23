import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton, Avatar } from "@material-ui/core";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import SidebarThread from "./SidebarThread";
import db, { auth } from "../firebase";
import {
  PhoneOutlined,
  QuestionAnswerOutlined,
  Settings,
} from "@material-ui/icons";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [threads, setThread] = useState([]);

  useEffect(() => {
    db.collection("threads").onSnapshot((snapshot) =>
      setThread(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const addThread = () => {
    const threadName = prompt("Enter a thread name");
    if (threadName) {
      db.collection("threads").add({
        threadName: threadName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__search">
          <SearchIcon className="sidebar__searchIcon" />
          <input placeholder="Search" className="sidebar__input"></input>
        </div>
        <IconButton variant="outlined" id="sidebar__button">
          <BorderColorOutlinedIcon onClick={addThread} />
        </IconButton>
      </div>
      <div className="sidebar__threads">
        {threads.map(({ id, data: { threadName } }) => (
          <SidebarThread key={id} id={id} threadName={threadName} />
        ))}
      </div>
      <div className="sidebar__bottom">
        <Avatar
          className="sidebar__bottom__avatar"
          onClick={() => auth.signOut()}
        />
        <IconButton>
          <PhoneOutlined />
        </IconButton>
        <IconButton>
          <QuestionAnswerOutlined />
        </IconButton>
        <IconButton>
          <Settings />
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
