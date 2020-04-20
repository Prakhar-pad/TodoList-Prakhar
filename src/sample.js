const express=require("express");
const session=require("express-session");
const bodyParser=require('body-parser');
var cookieParser = require("cookie-parser");

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

const users=[
 {id: 1, name: 'Ram', email: 'Ram@gmail.com', password: 'secret'},
 {id: 2, name: 'Krsna', email: 'Krsna@gmail.com', password: 'secret'},
 {id: 3, name: 'Hanuman', email: 'hanuman@gmail.com', password: 'secret'}
]

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

const redirectLogin=(req, res, next)=>{
  if(!req.session.userId){
    res.redirect('/login');
  }
  else{
    next();
  }
}
const redirectHome=(req, res, next)=>{
  if(req.session.userId){
    res.redirect('/home');
  }
  else{
    next();
  }
}

app.get('/', (req,res)=>{
 
  const {userId}=req.session;

  res.send(`
    <h1>Welcome</h1>
    ${userId ? `
    <a href='/home'>Home</a>
    <form method="post" action='/logout'>
      <button>Logout</button>
    </form>
    ` : `
    <a href='/login'>Login</a>
    <a href='/register'>Register</a>
`}
     `)
});

app.get('/home', redirectLogin,(req, res)=>{

  const user=users.find(user=> user.id===req.session.userId)
  res.send(`
     <h1>Home</h1>
     <a href='/'>Main</a>
     <ul> 
     
       <li>Name:${user.name} </li>
       <li>Email:${user.email} </li>
     </ul>
  `)
}); 

app.get('/login', redirectHome,(req, res)=>{
  res.send(`
  <h1>Login</h1>
  <form method='post' action='/login'>
  <input type='email' name='email' placeholder='Email' required />
  <input type type='password' name='password' placeholder='Password' required />
  <input type='submit'/>
  </form>
  <a href='/register'>Register</a>
  `);
}); 
app.get('/register',redirectHome, (req, res)=>{
  res.send(`
    <h1>Register</h1>

    <form method='post' action='/register'>
    <input name='name' placeholder='name' required />
    <input type='email' name='email' placeholder='Email' required />
    <input type type='password' name='password' placeholder='Password' required />
    <input type='submit'/>
    </form>
    <a href='/login'>Login</a>
    `);
}); 
app.post('/login',(req, res)=>{
  const { email, password}= req.body;

  if(email && password){ 
    const user=users.find(
      user=> user.email===email && user.password=== password
     )
     if(user){
       req.session.userId=user.id;
       return res.redirect('/home');
     }
  }
  res.redirect('/register');
});
app.post('/register',(req, res)=>{
  const { name, email, password}= req.body;
  
  if(name && email && password){
  const exists= users.some(
       user=> user.email ===email
  );
  if(!exists){
    const user={
      id: users.length +1,
      name,
      email,
      password
    }
    users.push(user);
    req.session.userId=user.id;
    return res.redirect('/home');
  }
  }
  res.redirect('/register');
});

app.post('/logout', redirectLogin, (req, res)=>{
 
  req.session.destroy(err=>{
    if(err){
      return res.redirect('/home');
    }
    res.clearCookie(SESS_NAME);
    res.redirect('/login');
  })

});

app.listen(PORT,()=>{
  console.log('App is listening on port: ' , 3000);
});