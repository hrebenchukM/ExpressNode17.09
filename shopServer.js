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


app.get('/', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname,'/data/index.html')); 
});





app.get('/add', function(request, response) {
    console.log(request.url);
    response.sendFile(path.join(__dirname, '/data/add.html')); 
});

app.post('/add', par, function(request, response) {
    let name = request.body.name;
    let description = request.body.description;
    let price = request.body.price;
    let phone = request.body.phone;
    let product = {
        name,
        description,
        price,
        phone
    };

    fs.readFile('products.txt', 'utf8', (err, data) => {
        if(err){
            console.log(err);
            response.send('<h1>404</h1>');
            return;
        }
        let products = data.split('\n'); 
        let index = products.length; 
    
        fs.appendFile('products.txt', JSON.stringify({ ...product, index }) + '\n', function(err) {
            if(err){
                console.log(err);
                response.send('<h1>404</h1>');
                return;
            }
            response.send('<h1>Product added!</h1>');
        });
    });
    
});









app.get('/edit/:index', function(request, response) {
    var index = request.params.index;
    fs.readFile(path.join(__dirname, '/data/edit.html'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            response.send('<h1>404</h1>');
            return;
        }
        response.send( data.replace('{{index}}', index));
    });
});

app.post('/edit/:index', par, function(request, response) {
    const index = request.params.index;
    let name = request.body.name;
    let description = request.body.description;
    let price = request.body.price;
    let phone = request.body.phone;
    let product = {
        name,
        description,
        price,
        phone
    };

    fs.readFile('products.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            response.send('<h1>404</h1>');
            return;
        }
        let products;
        if (data) {
            products = data.split('\n');
        } else {
            products = [];
        }
        if (index >= 0 && index < products.length) {
            products[index] = JSON.stringify({ ...product, index });
            let newData = products.join('\n');
            fs.writeFile('products.txt', newData + '\n', function(err) {
                if (err) {
                    console.log(err);
                    response.send('<h1>404</h1>');
                    return;
                }
                response.send('<h1>Product updated!</h1>');
            });
        } else {
            response.send('<h1>NO product</h1>');
        }
    });
});


app.get('/all', function(request, response) {
    fs.readFile('products.txt', 'utf8', (err, data) => {
        if(err){
            console.log(err);
            response.send('<h1>404</h1>');
            return;
        }
        response.send(data);
    });
});


app.get('/*', function(request, response) {
    response.send('<h1>404</h1>');
});

app.listen(8080, function() {
    console.log('server start on port 8080');
});
