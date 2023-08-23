const event = require('events');

const eventEmitter = new event();

eventEmitter.on('event', () => {
  console.log('ai yo.');
});

eventEmitter.on('event', () => {
  console.log('yo.');
});

eventEmitter.emit('event');