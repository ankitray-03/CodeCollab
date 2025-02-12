import React, { useState } from "react";
import { LogOut, MonitorDot } from "lucide-react";

const Sidebar = ({ roomId, activeUsers, handleLeave }) => {
  return (
    <div className="bg-[#A27B5C] m-2 w-[40%] my-[5%] border rounded-3xl">
      <h1 className="text-3xl mx-4 mt-2">Users Connected</h1>
      {/* all active users */}
      <div className="ml-4 mt-4">
        {activeUsers.map((user) => (
          <div key={user}>
            <span>
              <span className="inline-block text-green-400">
                <MonitorDot size={20} />
              </span>

              <span className="text-xl ml-3 text-amber-300">{user}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-[50%] mx-3">
        {/* to add a new member */}
        <div>
          <div>Add a member?</div>
          <input
            type="text"
            value={roomId}
            className="border-1 w-[80%] p-1 rounded-md"
          />
        </div>

        <button
          className="bg-red-500 hover:bg-red-800  p-2 border rounded-2xl mt-3 cursor-pointer flex"
          onClick={handleLeave}
        >
          Leave CodeSpace
          <LogOut className="ml-3" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
