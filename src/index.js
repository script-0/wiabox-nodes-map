var dotenv = require('dotenv')
dotenv.config();

const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const multer = require('multer');
var upload = multer();

// Configure express
const app = express()

var cors = require('cors')
app.use(cors())

// Configure the root route
app.get('/', (req, res) => {
  
});

// Initalize body parser to parse JSON objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Initialize authentication system
// var auth = require('./auth/auth.js')
// auth(app)

// Initialize routes
var platformRoutes = require("./routes/platform.js")
var nodeRoutes = require("./routes/node.js")
var communityRoutes = require("./routes/community.js")
platformRoutes(app)
nodeRoutes(app)
communityRoutes(app)

// Launch express server on port 3000
app.listen(process.env.PORT_LISTEN);

console.log('API server started on: ' + process.env.PORT_LISTEN);