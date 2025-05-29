import app from "./app.js"; // Import the configured Express app
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
