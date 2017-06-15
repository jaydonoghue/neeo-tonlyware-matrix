'use strict';

var net = require('net');

// Set your IP here
var MATRIX_IP = '10.11.12.11';

/* Matrix Controller */

module.exports.onButtonPressed = function onButtonPressed(name) {
    console.log(`[CONTROLLER] ${name} button pressed`);


    var client = new net.Socket();
    client.connect(23, MATRIX_IP, function () {
        console.log('Connected');
        // Change "output1-3" to output=1, input=3
        var tmp = name.replace(/output/, '');
        var output = tmp.substring(0, tmp.indexOf('-'));
        var input = tmp.replace(output + "-", "");

        var stringToSend = "\r\nOUT " + output + " FR " + input + "\r\n";
        client.write(stringToSend);
        console.log('Sent Message %s', stringToSend);
        client.destroy();
    });


};


