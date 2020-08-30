const express = require('express');
const app = express();
const path = require('path');
const qs =require('querystring');
const bodyParser = require('body-Parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const  session = require('express-session');
const FileStore = require('session-file-store')(session);

app.set('views','./views')
app.set('view engine' , 'ejs')
//Imports Routes
const homeRouter = require('./routes/home');
const adminRouter = require('./routes/admin');

app.use(cookieParser())




var sess = {
  store : new FileStore({}),
  secret: 'skfhdasoefj@#werw!sd@21Wdsad!@#$@$#%',
  resave:false,
  saveUninitialized:true,
  cookie: {
    maxAge: 1000 * 5
  }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

/* let myloggersystem = (req,res,next) =>{
    console.log('LOG');
    next();

} */

//app.use(methodOverride('_method'))
//app.use(myloggersystem)
//app.use((req,res)=> res.end('hello roocket'))
/* app.use((req,res,next)=>{
     let body = '';
     req.on('data' , data =>{
         body += data;
     })
     req.on('end' , () =>{
        req.body = qs.parse(body);
         next();
     })
 
}); */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))
  app.use(express.static('public'))
  app.use('/',homeRouter);
  app.use('/admin',adminRouter);

app.use((req,res)=>{
    res.sendFile(path.join(__dirname,'/views/404.html'))
})

app.listen(3000 , () =>console.log('server is running ...'))