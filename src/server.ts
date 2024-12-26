import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.db_url as string);
    console.log("MongoDB connected successfully!");

    // Start the server
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1); // Exit process with failure
  }
}

main();
