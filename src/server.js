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

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    // Configure CORS for Socket.IO if your frontend is on a different origin
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE"],
  },
});

const allowedOrigins = ["http://localhost:5173"];

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

app.use((req, res) => {
  res.status(404).send("Error 404: Route not found");
});

app.use(errorHandler);

io.on("connection", (socket) => {
  registerSocketHandlers(socket, io);
});

server.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
