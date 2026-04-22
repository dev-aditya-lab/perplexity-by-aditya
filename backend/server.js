import "dotenv/config";
import app from "./src/app.js";
import http from "http";
import connectDB from "./src/config/Database/database.js";
import { initSocketServer } from "./src/sockets/server.socket.js";

const httpServer = http.createServer(app);
initSocketServer(httpServer);


async function startServer() {
    await connectDB();
  try {
    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();