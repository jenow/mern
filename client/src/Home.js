import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Link, useHistory } from 'react-router-dom';

const axios = require("axios");

function Home() {
  const [count, setCount] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const socket = socketIOClient("http://localhost:3000");
    socket.on("notify", (data) => {
      console.log(data);
    });
  }, []);

  function _incrementCount() {
    setCount(count + 1);
    axios
      .get("/posts")
      .then((res) => {
        console.log(res);
        history.push('/polls/new');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="App">
      <p>You clicked {count} times</p>
      <button onClick={_incrementCount}>Click me</button>
      <Link to="/polls/new">New Poll</Link>
    </div>
  );
}

export default Home;