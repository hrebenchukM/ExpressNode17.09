var express = require('express');
// Модуль fs предназначен для работы с файлами. методы содержащиеся в модуле имеют синхронную и асинхронную формы

var fs = require('fs');
var utils = require('util');


var path = require('path'); 
// создаем приложение, которое будет принимать запросы, обрабатывать их, и отправлять ответы
var app = express();
// обработчик, который будет срабатывать на get запросы, для маршрута '/'
var bodyparser = require('body-parser');

const par=bodyparser.urlencoded({extended:false,});//не наследуется


app.post('/register', par,function(request, response){//пар чтоб по идентификаторам достать введнное значение
    console.log('post');
    console.log(request.url);
    let login=request.body.login;
    let email=request.body.email;
    let password=request.body.password;
    let passwordConfirm=request.body.passwordConfirm;
    user = {
        login,
        email,
        password,
        passwordConfirm
    }
    // console.log(str);
    // response.send('<h1>'+str+'</h1>');
    console.log('File writing...');
    fs.writeFile('register.txt', JSON.stringify(user) + '\n', function(err) {
    if(err){
        console.log(err);
        return;
    }
    console.log('File was wrote!');
 });
 response.send('<h1>'+'OK'+'</h1>');
 })


 
app.post('/authoriz', par,function(request, response){//пар чтоб по идентификаторам достать введнное значение
    console.log('post');
    console.log(request.url);
    let login=request.body.login;
    let email=request.body.email;
    let password=request.body.password;
    user = {
        login,
        email,
        password
    }


    if(fs.existsSync(__dirname))
        {
            fs.readFile('register.txt', {encoding : 'utf-8'}, function(err, data){
                if(err){
                    console.log(err);
                    response.send('<h1>404</h1>');
                    return;
                }
                const users = [];

                data.split('\n').forEach(line => {
                    if (line) {
                            users.push(JSON.parse(line));
                       
                    }
                });
    

                let curUser;

                for (let i = 0; i < users.length; i++) {
                if (users[i].login === login && users[i].email === email && users[i].password === password) {
                curUser = users[i];
                break;
                }
              }

              if (curUser) {
                console.log('User authorized');
                console.log('File writing...');
                fs.writeFile('autoriz.txt', utils.format('%s', curUser), function(err){
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log('File was wrote!');
                 });
                 response.send('<h1>'+'OK'+'</h1>');
              }
              else{
                console.log('User NOT authorized');
                response.send('<h1>'+'Registr first!'+'</h1>');
              }
            });
           
        }
        else
        {
            console.log("No file");
        }

     
         
         })





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









