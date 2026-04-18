import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";


async function startServer() {
    await connectDB();
  try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();