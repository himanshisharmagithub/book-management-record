const express = require("express");
const {users}= require("./data/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());

// npm i nodemon --save-dev
// const data = ["rohan", "dev"];
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running succesfully",
  });
});

app.get("/users", (req, res) => {
  res.status(200).json({
    succuess: true,
    data: users,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route doesn't exist",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});