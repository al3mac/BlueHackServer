var Hapi = require('hapi');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var server = new Hapi.Server();

server.connection({ address: server_ip_address,
    port: server_port });



server.start(function () {
    console.log('Server running at:', server.info.uri);
});

server.route({
    method: 'GET',
    path: '/api/hello',
    handler: function (request, reply) {
        reply('Hello, world!');
    }

});