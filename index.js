const express = require("express");
const {users}= require("./data/users.json");


const app = express();

const PORT = 8081;

app.use(express.json());


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
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
      data: user,
    });
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});
app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;

  const user = users.find((each) => each.id === id);

  if (user) {
      return res.status(404).json({
          success: false,
          message: "User With The ID Exists",
      });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,});

    return res.status(201).json({
        success: true,
        message: "User Added Successfully",
        data: users,
    });
  });

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data} = req.body;
  const user = users.find((each) => each.id === id);

  if (!user) {
      return res.status(404).json({
          success: false,
          message: "User With The ID don't exists",
      });
  }
  const updatedUsers = users.map((each) => {
      if (each.id === id) {
          return { ...each,
             ...data };
      }
      return each;
  });
  users.splice(0, users.length, ...updatedUsers);
  return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: updatedUsers,
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