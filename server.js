require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require(".");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server on na http://localhost:${PORT} bb!`);
});
