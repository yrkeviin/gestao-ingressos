require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ingressoRoutes = require("./src/routes/ingressoRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", ingressoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server on na geral http://localhost:${PORT}`);
});
