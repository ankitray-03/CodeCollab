import { useState } from "react";

const CreateJoinRoom = ({ setJoined, setRoomId }) => {
  const [id, setId] = useState("");

  const handleCreateNewRoom = () => {
    setRoomId((Math.random() + 1).toString(36).substring(2));
    setJoined(true);
  };

  const handleJoinRoom = () => {
    if (id === "") {
      alert("Please enter Codespace id !");
    } else {
      setRoomId(id);
      setJoined(true);
    }
  };

  return (
    <div className="mx-[40%] mt-[8%]">
      <div>
        <button
          className="bg-[#EB5B00] hover:bg-[#C14600] p-3 border-2 rounded-xl w-sm mt-3 cursor-pointer font-bold"
          onClick={handleCreateNewRoom}
        >
          Create a CodeSpace
        </button>
      </div>
      <p className="font-sm text-slate-100 mt-[30%]">Have CodeSpace ID ?</p>
      <div>
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter Valid Codespace ID..."
          className="border-1 rounded-md p-1 w-[120%]  "
        />
        <br />
        <button
          className="bg-amber-200 p-3 border-2 rounded-xl w-sm mt-3 hover:bg-[#FFB200] cursor-pointer font-bold"
          onClick={handleJoinRoom}
        >
          Join CodeSpace
        </button>
      </div>
    </div>
  );
};

export default CreateJoinRoom;
