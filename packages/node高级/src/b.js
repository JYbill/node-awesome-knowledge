const json = myRequire('./15.test');
console.log(json);
console.log(myFileName);
console.log(myDirName);
console.log(myExports === this);
myExports.name = 'xiaoqinvar';
myExports.obj = {
  age: 23
}