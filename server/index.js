const express = require("express");
const app = express();
const cors = require("cors");
const questionRoutes = require("./routes/questionRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/questions", questionRoutes);
app.use("/upload", uploadRoutes);

const PORT = 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
