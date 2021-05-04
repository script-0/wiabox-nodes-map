var dotenv = require('dotenv')
dotenv.config();

const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const multer = require('multer');
var upload = multer();
var path = require('path')

// Configure express
const app = express()

var cors = require('cors')
app.use(cors())

// Initalize body parser to parse JSON objects for oldest express version <= 4.16
/*
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

*/
//For express > 4.16
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Initialize routes
var platformRoutes = require("./routes/platform.js")
var nodeRoutes = require("./routes/node.js")
var communityRoutes = require("./routes/community.js")
var mapRoutes = require("./routes/map.js")
platformRoutes(app)
nodeRoutes(app)
communityRoutes(app)
mapRoutes(app)

//Configure EJS HTML rendering
app.set("view engine", "ejs")

//Configure static and folders
app.use("/assets",express.static(path.join(__dirname, "../public/")))
app.set('views', path.join(__dirname, '/views/'));

console.log("--dirname = " + __dirname)

// Configure the root route
app.get('/', (req, res) => {
  res.send('Please look at <a href="https://github.com/script-0/wiabox-nodes-map" target="_blank">'+
                                'https://github.com/script-0/wiabox-nodes-map'+
                            '</a> '+
            'for documentation')
});

  // Launch express server on port 3001
app.listen(process.env.PORT_LISTEN);

console.log('API server started on: ' + process.env.PORT_LISTEN);