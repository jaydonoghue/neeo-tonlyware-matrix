'use strict';

const neeoapi = require('neeo-sdk');
const controller = require('./controller');

console.log('Tonlyware HDBaseT 4x4 Matrix driver');
console.log('---------------------------------------------');

/*
 * Adapter - an Adapter to connect inputs + outputs from HDBaseT matrix
 */

// first we set the device info, used to identify it on the Brain
const matrix = neeoapi.buildDevice('Tonlyware HDBaseT 4x4 Matrix')
    .setManufacturer('Tonlyware')
    .addAdditionalSearchToken('HDBaseT')
    .addAdditionalSearchToken('Matrix')
    .setType("ACCESSOIRE")
    //.setType('Matrix')

    // Capabilities of the device
    .addButton({ name: 'output1-1', label: 'Input 1 to Output 1' })
    .addButton({ name: 'output1-2', label: 'Input 2 to Output 1' })
    .addButton({ name: 'output1-3', label: 'Input 3 to Output 1' })
    .addButton({ name: 'output1-4', label: 'Input 4 to Output 1' })

    .addButton({ name: 'output2-1', label: 'Input 1 to Output 2' })
    .addButton({ name: 'output2-2', label: 'Input 2 to Output 2' })
    .addButton({ name: 'output2-3', label: 'Input 3 to Output 2' })
    .addButton({ name: 'output2-4', label: 'Input 4 to Output 2' })

    .addButton({ name: 'output3-1', label: 'Input 1 to Output 3' })
    .addButton({ name: 'output3-2', label: 'Input 2 to Output 3' })
    .addButton({ name: 'output3-3', label: 'Input 3 to Output 3' })
    .addButton({ name: 'output3-4', label: 'Input 4 to Output 3' })

    .addButton({ name: 'output4-1', label: 'Input 1 to Output 4' })
    .addButton({ name: 'output4-2', label: 'Input 2 to Output 4' })
    .addButton({ name: 'output4-3', label: 'Input 3 to Output 4' })
    .addButton({ name: 'output4-4', label: 'Input 4 to Output 4' })

    .addButtonHander(controller.onButtonPressed);

function startSdkExample(brain) {
    console.log('- Start server');
    neeoapi.startServer({
        brain,
        port: 6336,
        name: 'tonlyware-matrix',
        devices: [matrix]
    })
        .then(() => {
            console.log('# READY! use the NEEO app to search for "Tonlyware".');
        })
        .catch((error) => {
            //if there was any error, print message out to console
            console.error('ERROR!', error.message);
            process.exit(1);
        });
}

const brainIp = process.env.BRAINIP;
if (brainIp) {
    console.log('- use NEEO Brain IP from env variable', brainIp);
    startSdkExample(brainIp);
} else {
    console.log('- discover one NEEO Brain...');
    neeoapi.discoverOneBrain()
        .then((brain) => {
            console.log('- Brain discovered:', brain.name);
            startSdkExample(brain);
        });
}
