import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import { PORT } from "./config/config.js";
import setupRoutes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import registerSocketHandlers from "./socketHandler.js";
import keepAliveService from "./utils/keepAlive.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://wolfstream.netlify.app",
];

const io = new SocketIOServer(server, {
  cors: {
    // Configure CORS for Socket.IO if your frontend is on a different origin
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE", "UPDATE"],
  },
});

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "*",
  })
);

app.set("socketio", io);
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

setupRoutes(app);

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

app.use((req, res) => {
  res.status(404).send("Error 404: Route not found");
});

app.use(errorHandler);

io.on("connection", (socket) => {
  registerSocketHandlers(socket, io);
});

server.listen(PORT, () => {
  const serverUrl = process.env.SERVER_URL || `http://localhost:${PORT}`;
  console.log(`Server is running in http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  keepAliveService.start(`${serverUrl}/ping`);
});
