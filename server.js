var Hapi = require('hapi');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '192.168.1.108';

var server = new Hapi.Server();

server.connection({ address: server_ip_address,
    port: server_port });



server.start(function () {
    console.log('Server running at:', server.info.uri);
});

server.route({
    method: 'POST',
    path: '/api/getTest',
    handler: function (request, reply) {
        reply({
            userInput: request.payload.userInput
            , result: 'ok!'
        });
    }
});

server.route({
    method: 'POST',
    path: '/',
    handler: function (request, reply) {
        console.log(request.payload.author);
        reply({
                author: 'Audrey Hepburn'
                , text: 'Nothing is impossible, the word itself says \'I\'m possible\'!'
            }
        );
    }
});


server.route({
    method: 'POST',
    path: '/api/getMenu',
    handler: getMenu
});

function getMenu(request, reply){

    fs = require('fs')
    fs.readFile(request.payload.restaurantName, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);

        reply(JSON.parse(data))
    });



}