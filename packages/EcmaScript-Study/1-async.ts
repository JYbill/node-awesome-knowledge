async function foo() {
  const res1 = new Promise((resolve) => setTimeout(() => resolve('1'), 1000));
  const res2 = new Promise((resolve, reject) => setTimeout(() => reject('2'), 1000));
  return Promise.all([res1, res2]);
}
/* foo().then((res) => {
  console.log('res', res);
}).catch((error) => {
  console.log(error);
}); */

async function foo2() {
  return await new Promise((resolve, reject) => {
    reject(new Error('❌'));
  })
  // .catch(e => e);
}
/* foo2().then((res) => {
  console.log(res);
}).catch((error) => {
  console.log(error)
}) */
(async () => {
  console.log(await foo2());
})()
