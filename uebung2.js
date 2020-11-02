const mqtt = require('mqtt');
const brokerurl = 'mqtt://broker.hivemq.com';

(async() => {
var subscriber = mqtt.connect(brokerurl, {clientId: 'subscriber', clean: false});
await new Promise(resolve => subscriber.on('connect', async() => {
    subscriber.subscribe('iotcourse/uebung2', {qos: 1}, (err) => {
        console.log('Subscriber subscribed!')
        if (err) {
            console.error(err);
        }
        subscriber.end();
        console.log('Subscriber ended!');
        resolve();
    });
}));

var publisher = mqtt.connect(brokerurl);
await new Promise(resolve => {
    publisher.on('connect', () => {
        publisher.publish('iotcourse/uebung2', 'TestNachricht1', {qos: 1, properties: {messageExpiryInterval: 20}});
        publisher.publish('iotcourse/uebung2', 'TestNachricht2', {qos: 1, properties: {messageExpiryInterval: 20}});
        console.log('Messages sent!');
        resolve();
    });
});

subscriber2 = mqtt.connect(brokerurl, {clientId: 'subscriber', clean: false});
subscriber2.on('message', (message) => {
    console.log(message.toString());
});
subscriber2.on('connect', () => {
    console.log('Subscriber connected!');
    subscriber.subscribe('iotcourse/uebung2', {qos: 1});
});


})();