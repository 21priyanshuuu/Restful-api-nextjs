import mongoose, { mongo } from "mongoose";
const URI = process.env.URI;

export default function Connect() {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting");
    return;
  }
  try {
    mongoose.connect(URI, {
      dbName: "nextja-rest",
      bufferCommands: true,
    });
    console.log("Connected");
  } catch (error) {
    console.log("Error", error);
    throw new Error("Error", error);
  }
}
