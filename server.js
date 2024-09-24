var express = require('express');
var path = require('path'); 
// создаем приложение, которое будет принимать запросы, обрабатывать их, и отправлять ответы
var app = express();
// обработчик, который будет срабатывать на get запросы, для маршрута '/'
app.get('/', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname,'/data/index.html')); 
});

app.get('/news', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname,'/data/news.html')); 
});


app.get('/about', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname,'/data/about.html')); 
});


app.get('/authoriz', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname,'/data/authoriz.html')); 
});

app.get('/register', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname,'/data/register.html')); 
});


app.get('/*', function(request, response){
    console.log(request.url);
    response.send('<h1>404</h1>');
});


app.listen(8080, function(){
    console.log('server start on port 8080');
})