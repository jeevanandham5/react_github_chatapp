import io from "socket.io-client";
import "./App.css";
import { useState } from "react";
import Chat from "./components/Chat";
//https://deploy-vercel-flax-ten.vercel.app/
const socket = io("https://deploy-vercel-flax-ten.vercel.app/", {
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "https://jeevanandham5.github.io/",
  },
});

function App() {
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A chat</h3>
          <input
            type="text"
            placeholder="name.."
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder=" Room Id.."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
