const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
const helmet = require('helmet');
const expressHbs = require('express-handlebars');
const app = express();
const http = require('http').Server(app);
const compression = require('compression');
const favicon = require('serve-favicon');
app.use(helmet());

app.use(favicon(path.join(__dirname, 'public/images/favicon', 'favicon.ico')));

app.engine('.hbs', expressHbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');
// app.use(compression());
app.use(express.static(__dirname+"/public"));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const publicRoutes = require('./controllers/main');

app.use(publicRoutes);

app.use(function (req, res, next) {
    res.redirect('/error');
});

app.use((err, req, res, next)=>{
    res.redirect('/error');
});

http.listen(/*config.port*/process.env.PORT || 3600, (err)=>{
    if(err) console.log(err);
    console.log("Server started");
});
