const express = require("express");
const app = express();
const cors = require("cors");
const questionRoutes = require("./routes/questionRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoute = require("./routes/subscribeRoutes");
const suggestionRoute = require("./routes/suggestionRoutes");
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/questions", questionRoutes);
app.use("/upload", uploadRoutes);
app.use("/subscribe", subscribeRoute);
app.use("/suggestion", suggestionRoute);

const PORT = 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
