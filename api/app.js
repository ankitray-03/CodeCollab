import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import axios from "axios";
import path from "path";
const __dirname = path.resolve();

const app = express();

// dev
// app.use(cors({}));

// socket configurations
const server = http.createServer(app);

// developement
// const io = new Server(server, {
//   cors: {
//     origin: process.env.CLIENT_URL,
//     methods: ["GET", "POST"],
//   },
// });

// production
const io = new Server(server);

// store room-specific code
const rooms = {};

// socket code
io.on("connection", (socket) => {
  console.log("User connected : ", socket.id);

  // joining a room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-added-to-room", socket.id);
    socket.emit("codeSync", rooms[roomId] || "");
  });

  socket.on("codeChange", ({ roomId, newCode }) => {
    rooms[roomId] = newCode;
    socket.to(roomId).emit("codeSync", newCode);
  });

  // on running the code to get output
  socket.on("runCode", async ({ roomId, code, languageId }) => {
    try {
      const res = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: languageId,
        },
        {
          headers: {
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          },
        }
      );

      io.to(roomId).emit("outputSync", res.data.stdout || res.data.stderr);
    } catch (error) {
      io.to(roomId).emit("outputSync", "Error executing code");
    }
  });

  //  leaving a room
  socket.on("leave-room", (roomId) => {
    socket.to(roomId).emit("user-leave-to-room", socket.id);
    socket.leave(roomId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected : ", socket.id);
  });
});

// routes
app.get("/test", (req, res) => {
  res.send("Server is running pproperly");
});

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// server listening
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
