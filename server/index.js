require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const questionRoutes = require("./routes/questionRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoute = require("./routes/subscribeRoutes");
const suggestionRoute = require("./routes/suggestionRoutes");
const adminRoute = require("./routes/admin");
const trackVisitRoute = require("./routes/trackVisit");
const adminVisitorsRoute = require("./routes/adminVisitor");
const progressRoutes = require("./routes/progressRoutes");

app.use(cors());
app.use(express.json());

app.use("/questions", questionRoutes);
app.use("/upload", uploadRoutes);
app.use("/subscribe", subscribeRoute);
app.use("/suggestion", suggestionRoute);
app.use("/admin", adminRoute);
app.use("/visit", trackVisitRoute);
app.use("/admin/visitors", adminVisitorsRoute);

app.use("/progress", progressRoutes);
const PORT = 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
