const mqtt = require('mqtt');

const publisher = mqtt.connect('mqtt://broker.hivemq.com');
const subscriber = mqtt.connect('mqtt://broker.hivemq.com');

publisher.on('connect', async() => {
    console.log("connected!");
    publisher.publish('iotcourse', 'Test!', { retain: true });
});

subscriber.on('connect', () => {
    subscriber.subscribe('iotcourse');
})

subscriber.on('message', (topic, message) => {
    console.log(message.toString())
});