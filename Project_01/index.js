const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const { timeStamp } = require("console");
const app = express();
const PORT = 3000;

// connection to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // URL-encoded form data parsing

// Routes

// REST API
app.get("/api/users", async(req, res) => {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
});

app.get("/users", async  (req, res) => {
  const allDBUsers = await User.find({});
  const HTML = `
    <ul>
        ${allDBUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul> 
    `;
  res.send(HTML);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404)
    return res.json(user);
  })
  .patch(async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ status: "Error", message: "User not found" });
      }
  
      return res.json({ status: "Success", updatedUser });
    } catch (error) {
      return res.status(500).json({ status: "Error", message: error.message });
    }
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ status: "All fields are required" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log("result", result);
  return res.status(201).json({ msg: "success" });
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
