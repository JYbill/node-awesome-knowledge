const { AsyncLocalStorage } = require('async_hooks');
const asyncLocalStorage = new AsyncLocalStorage();

/**
 * 全都正常，未出现丢失问题
 */
asyncLocalStorage.run({ requestId: '12345' }, () => {
  console.log('Inside asyncLocalStorage context:', asyncLocalStorage.getStore()); // { requestId: '12345' }
  setTimeout(() => {
    setTimeout(() => {
      console.log("d", asyncLocalStorage.getStore())
    }, 200)
  }, 200)
  new Promise((resolve, reject) => {
    setTimeout(() => {
      setTimeout(() => {
        console.log("promise", asyncLocalStorage.getStore())
        resolve(1);
      }, 200)
    }, 200)
  }).then(() => {
    setTimeout(() => {
      console.log("test", asyncLocalStorage.getStore())
    }, 500)
  }).then(() => {
    console.log("test2.0", asyncLocalStorage.getStore())
    setTimeout(() => {
      process.nextTick(() => {
        console.log("test2.1", asyncLocalStorage.getStore())
      })
    }, 500)
  })
});
console.log("out", asyncLocalStorage.getStore())
