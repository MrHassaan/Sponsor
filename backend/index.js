require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require("express-session");
const store = require('./middlewares/session-store');
const multer = require('multer');
const path = require('path');

const app = express();
const server = require("./socket/socket")(app); // Assuming your socket setup exports app

const cors = require("cors");

app.use(cors({
    origin: 'https://your-frontend-domain.vercel.app', // Replace with your actual frontend domain
    credentials: true // Allow cookies for authenticated requests (if applicable)
}));

app.use(bodyParser.json());

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

// Your route handlers here
app.use(authrouter);
app.use(eventrouter);
app.use(proposalrouter);
app.use(adminrouter);
app.use(chatrouter);
app.use(paymentrouter);

// Multer configuration for file uploads (optional)
const upload = multer({ dest: 'uploads/' }); // Adjust destination directory as needed

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  server.listen(process.env.PORT, () => {
    console.log('Connected to Mongo & Listening on port', process.env.PORT);
  });
})
.catch((error) => {
  console.log(error);
});
