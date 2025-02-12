import { useState } from "react";
import Editor from "./components/Editor";
import Input from "./components/Input";
import CreateJoinRoom from "./components/CreateJoinRoom";
import { Braces } from "lucide-react";

function App() {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");

  // console.log("roomId : ", roomId);
  // console.log("isjoined : ", joined);

  return (
    <div className="  h-[100vh]">
      <h2 className="text-5xl font-bold text-center mt-4 ml-[10%]">
        CodeCollab
        <span className="inline-block">
          <Braces size={80} className="text-[#FFB200]" />
        </span>
      </h2>

      <div className="ml-4">
        {joined ? (
          <Editor roomId={roomId} setJoined={setJoined} />
        ) : (
          <CreateJoinRoom setJoined={setJoined} setRoomId={setRoomId} />
        )}
      </div>
      <div className="font-sm text-slate-600 ml-[43%] mt-[5%]">
        <p>Developed by @ankitray0308@gmail.com</p>
        <p className="ml-[10%]">© All rights reserved</p>
      </div>
    </div>
  );
}

export default App;
