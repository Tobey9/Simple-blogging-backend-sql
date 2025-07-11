require("dotenv").config();
const express = require("express");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(express.json());
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
