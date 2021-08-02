const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require('./app/routes/route');

const errorHandler = require("./app/middleware/errorHandling")

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

var corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors());


app.get('/', (req, res) => {
  res.send("Your API is Started");
});

app.use('/api', route);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Sever running on port "+PORT);
}
);
process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});