require('./models/User')
require('./models/Track')
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')
const mongoURL = "mongodb+srv://admin:321Pass@cluster0-4qcuz.mongodb.net/test?retryWrites=true&w=majority";

const app = express();

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});
mongoose.connection.on("error", err => {
  console.log("Error connecting to mongo instance: ", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});