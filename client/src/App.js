import './App.css';
import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
const axios = require('axios');

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:3000');
    socket.on('notify', data => {
      console.log(data);
    });
  }, []);

  function _incrementCount() {
    setCount(count + 1);
    axios.get('/posts').then(res => {
      console.log(res);
    }).catch(err => {
      console.err(err);
    });
  }

  return (
    <div className="App">
      <p>You clicked {count} times</p>
      <button onClick={_incrementCount}>
        Click me
      </button>
    </div>
  );
}

export default App;
