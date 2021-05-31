const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const app = express();

const router = require('./routers/index');
const {sequelize} = require('./models');

const cookieParser = require('cookie-parser');
const ctoken = require('./jwt');
const auth = require('./middleware/auth');

app.set('view engine','html');
nunjucks.configure('views',{
    express:app
});

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true
}));

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

sequelize.sync({force:false})
.then(()=>{
    console.log('DB 접속 완료');
})
.catch((err)=>{
    console.log(err);
})

app.use('/',router);

app.listen(3000,()=>{
    console.log('3000');
});