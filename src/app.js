const express=require("express");
const session=require("express-session");
const bodyParser=require('body-parser');
var cookieParser = require("cookie-parser");
const cors = require('cors');
const logger = require('morgan'); 
const compression = require('compression');
const TWO_HOURS =1000*60*60*2; 

const{
  PORT=3000,
  SESS_LIFETIME=TWO_HOURS,
  SESS_NAME='sid',
  SESS_SECRET='ssh/quiet',
}=process.env

const app=express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(session({
  name: SESS_NAME,
  secret:SESS_SECRET,
  resave:false,
  saveUninitialized:false,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite:true,
  }
}));

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', __dirname + '/client/views/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(logger('dev'));
//app.use(express.static(path.join(__dirname,'client/images/')));

const routes=require("./backend/routes/MainRoutes");

app.use("/",routes);

app.listen(4000, ()=>{
    console.log("Application listening on port: ", 4000);
});
module.exports=app;