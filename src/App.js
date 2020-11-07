import React, { useEffect } from "react";
import "./App.css";
import Telegram from "./components/Telegram";
import { selectUser, logout, login } from "./features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./firebase";
import Login from "./components/Login";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return <div className="app">{user ? <Telegram /> : <Login />}</div>;
}

export default App;
