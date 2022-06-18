const event = require('events');
const Event = new event();

Event.on('call', () => {
  console.log('触发call');
});
console.log(1);
Event.emit('call');