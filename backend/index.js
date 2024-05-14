require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const app = express();
const authrouter = require("./routes/auth-router")
const eventrouter = require("./routes/event-router")
const proposalrouter = require("./routes/proposal-router")
const adminrouter = require("./routes/admin-router")
const chatrouter = require("./routes/chat-router")
const paymentrouter = require("./routes/payment-router");

const {app,server} = require("./socket/socket");

const cors = require("cors");
const session = require("express-session");
const store = require('./middlewares/session-store');
const multer = require('multer');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/public/images', express.static(__dirname + '/public/images'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
    session({
      secret: 'sponsorconnect',
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
        secure: false, // Set it to true in production with HTTPS
        httpOnly: true,
      },
    })
  );

app.use(authrouter)
app.use(eventrouter)
app.use(proposalrouter)
app.use(adminrouter)
app.use(chatrouter)
app.use(paymentrouter);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    server.listen(process.env.PORT,()=>{
        console.log('Connect to Mongo & Listening on port',process.env.PORT);
    });
})
.catch((error)=>{console.log(error);})
