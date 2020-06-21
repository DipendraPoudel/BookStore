require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');


const app = express();

app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV ==='development') {
  app.use(morgan('dev'));
}
// connection to database
mongoose
.connect(process.env.ATLAS_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log('DB connection successful!'))
.catch((err) => {
  console.log('Mongoose error', err);
})

app.use('/api', userRoutes);

app.listen(3001);
console.log('API listening on localhost:3001');