const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require('fs');
const app = express();
const PORT = 3000;
//app.use(express.urlencoded({ extended: false}));

app.use(express.json());

// Routes

// REST API
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/users", (req, res) => {
  const HTML = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul> 
    `;
  res.send(HTML);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const getId = Number(req.params.id);
    const body = req.body;
    const userIndex = users.findIndex((user) => user.id === getId);
    const gotUser = users[userIndex];
    const updatedUser = { ...gotUser, ...body};
    users[userIndex] = updatedUser;
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
      return res.json({ status: "Success", updatedUser});
    })
  })
  .delete((req, res) => {
    const getId = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === getId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
    }
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
      return res.json({ status: "Success delete"});
    })
  })

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({...body, id : users.length+1});
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
    return res.json({ status: "success" , id : users.length });
  })
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
