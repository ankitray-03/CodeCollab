import React, { useCallback, useEffect, useState } from "react";

import io from "socket.io-client";
import Sidebar from "./Sidebar";
import OutputComponent from "./OutputComponent";
import EditorWindowOnly from "./EditorWindowOnly";
import { Play } from "lucide-react";
import { javascript } from "@codemirror/lang-javascript";

const socket = io(import.meta.env.VITE_API_URL);

const languageOptions = [
  { id: 63, name: "javascript" },
  { id: 71, name: "python" },
  { id: 62, name: "java" },
  { id: 52, name: "cpp" },
];

function Editor({ roomId, setJoined }) {
  const [language, setLanguage] = useState({ id: 63, name: "javascript" });
  const [code, setCode] = useState("//write your code");
  const [activeUsers, setActiveUsers] = useState(["You"]);
  const [output, setOutput] = useState("");
  const [runningCode, setRunningCode] = useState(false);

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("user-added-to-room", (user) => {
      setActiveUsers((prev) => (prev = [...prev, user]));
    });

    socket.on("user-leave-to-room", (user) => {
      setActiveUsers(
        (prev) => (prev = prev.filter((singlePrev) => singlePrev !== user))
      );
    });

    socket.on("outputSync", (output) => {
      setOutput(output);
      setRunningCode(false);
    });

    socket.on("codeSync", (newcode) => {
      setCode(newcode);
    });
  }, [roomId]);

  // code running and execution
  const runCode = () => {
    setRunningCode(true);
    socket.emit("runCode", { roomId, code, languageId: language.id });
  };

  const handleCodeChange = useCallback((value, viewUpdate) => {
    setCode(value);
    socket.emit("codeChange", { roomId: roomId, newCode: value });
  }, []);

  const handleLeave = () => {
    socket.emit("leave-room", roomId);
    setJoined(false);
  };

  const handleLanguageChange = (e) => {
    const selectedLang = languageOptions.find(
      (lang) => lang.id === Number(e.target.value)
    );
    setLanguage(selectedLang);
  };

  return (
    <div>
      <div className="flex">
        {/* <h2>Joining ID : - {socket.id}</h2>
      <Input type="text" htmlFor="join-id" label="Enter your joinng ID" /> */}
        <div>
          <Play onClick={runCode} className="cursor-pointer" />
          <select
            onChange={handleLanguageChange}
            className="bg-amber-500 border rounded-xl mb-1 text-xl p-1 font-bold mt-5"
          >
            {languageOptions.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
          <EditorWindowOnly
            language={language.name}
            code={code}
            handleCodeChange={handleCodeChange}
          />
        </div>
        <Sidebar
          roomId={roomId}
          activeUsers={activeUsers}
          handleLeave={handleLeave}
        />
      </div>

      {/* output */}
      <OutputComponent output={output} runningCode={runningCode} />
    </div>
  );
}

export default Editor;
