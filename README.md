# node高级篇代码
> 记录自己学习node高级的过程

<br/>

## 01-async-event
node中数据驱动的体验，`EventEmitter`.

<br/>

## 02-single-thread
node v8执行的主线程为单线程，体验单线程在cpu堵塞情况下的场景，合理使用libuv库进行异步并发操作！

<br/>

## 03-ts-node-http-server
node + ts + express 快速建立http服务

<br/>

## 04-node-global
node全局对象/属性

<br/>

## 05-process
node process对象/属性

<br/>

## 06-path
path模块

<br/>

## 🚀07-buffer
buffer对象

<br/>

## 08-buffer
fs模块

<br/>

## 09-md2html
md 转 html利用path、fs模块并实现监听写入另一个文件（demo）

<br/>

## 10-open-file
fs.open()、fs.write()...方法细节和用途

<br/>

## 11-copy-file
大文件拷贝例子，利用fs、buffer等实现，对于大文件可以用流操作会更好，后面会学习...

<br/>


# 《深入浅出Node.js》笔记、精彩部分
## 第一章 node简介
- 1.2.2 为什么叫Node
  > 原文：Node发展为一个强制不共享任何资源的单线程、单进程系统，包含十分适宜网络的库，为构建大型分布式应用程序提供基础设施，其目标也是成为一个构建快速、可伸缩的网络应用平台。它自身非常简单，通过通信协议来组织许多Node，非常容易通过扩展来达成构建大型网络应用的目的。每一个Node进程都构成这个网络应用中的一个节点，这是它名字所含意义的真谛。

  此乃Node.js真谛，在前十年创造出来就被赋予的使命，"分布式架构"、"落地微服务"！
  
- 第一章讲了node的历史、node被赋予的使命、node的强势点、node适用于什么样的应用场景、node异步编程的特性、以及V8单线程和node的child_process简介...

## 第二章 模块机制
- 2.1.1 Node与浏览器以及W3C组织、CommonJS组织、ECMAScript之间的关系
![](./packages/nodejs%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BA%E7%AC%94%E8%AE%B0/images/Node%E4%B8%8E%E6%B5%8F%E8%A7%88%E5%99%A8%E4%BB%A5%E5%8F%8AW3C%E7%BB%84%E7%BB%87%E3%80%81CommonJS%E7%BB%84%E7%BB%87%E3%80%81ECMAScript%E4%B9%8B%E9%97%B4%E7%9A%84%E5%85%B3%E7%B3%BB.png)
> 2022-05-19，目前EcmaScript提出的ESModule规范被Nodejs采纳，ES规范肯定要更加标准！TypeScript在用ESModule，Node v1x以`.mjs`为文件后缀执行ESModule，普通js或`.cjs`执行CommonJs规范，但是不能混用！或`package.json`文件修改`module`属性,更多详细查看node官方文档！

<br>

## 2.2🥕CommonJS模块加载机制

+ node中引入模块经历3个步骤：
  1. 路径分析
  2. 文件定位
  3. 编译执行



+ 路径分析：`模块标识符`在Node中主要分为以下几类
  + 核心模块，如`http`、`fs`、`path`等...
  + `"."`或`".."`开始的相对路径文件模块
  + `"/"`开始的绝对路径文件模块
  + 非路径形式的`node_modules内的文件模块`，如自定义的connect模块。



+ 文件定位：

  + 扩展名：可以忽略不写，cjs会按.js、.json、.node的次序补足扩展名

    > require()过程需要调用fs模块同步阻塞式地判断文件是否存在。
    > <u>**注意**</u>：最好写完整的扩展名，可提升效率

  + 目录分析和包：
    如果没查到文件但查到目录，Node在当前目录下；
    查找到`package.json`解析出"main"字段，如果缺少扩展名，会再次进入扩展名分析步骤；
    未查到`package.json`依次查找index.js、index.json、index.node
    未找到，递归上层node_modules包，都为查到，报错！



+ 编译执行：

  - js文件：通过fs模块同步读取文件后编译执行

  - node文件：这是用C/C++编写的扩展文件，通过dlopen()方法加载最后编译生成的文件。

  - json文件：通过fs模块同步读取文件后，用JSON.parse()解析返回结果。

  - 其余扩展名：它们都被当做.js文件载入。

    > <u>**注意**</u>：每一个编译成功的模块都会将其文件路径作为索引缓存在Module._cache对象上，以提高二 次引入的性能。



+ node模块分两类：

  + 🥕**核心模块**：node源码编译成了二进制文件执行文件，启动时会被直接加载进内存！所以这部分模块引入时没有`文件定位`、`编译执行`两个操作！并且在`路径分析`中优先判断！所以加载速度最快

    > <u>**注意**</u>：核心模块加载优先级仅次于缓存加载

  + 文件模块：用户编写；运行时动态加载，会经过完整的引入模块的三个步骤，速度慢于核心模块

    > 1. 路径形式的文件模块：`"."、".."、"/"`开头的路径会解析成真实路径作为索引，加载慢于核心模块加载
    >
    > 2. 自定义模块：查找`node_modules`文件数组，以当前目录的node_modules开始往父级node_modules递归向上查找。加载速度最慢！
    >    <u>**注意**</u>：层级越深查找越慢！这就是为什么加载速度最慢的原因！
    >
    >    ```js
    >    console.log(module.paths);
    >    // 结果
    >    [
    >      '/Users/xiaoqinvar/Desktop/practice/node高级/packages/node_modules',
    >      '/Users/xiaoqinvar/Desktop/practice/node高级/node_modules',
    >      '/Users/xiaoqinvar/Desktop/practice/node_modules',
    >      '/Users/xiaoqinvar/Desktop/node_modules',
    >      '/Users/xiaoqinvar/node_modules',
    >      '/Users/node_modules',
    >      '/node_modules'
    >    ]
    >    ```



+ 🥕**优先从缓存加载**

  > 1. 与浏览器缓存机制类似，Node对引入过的模块都会进行缓存，以减少二次引入时的开销。不同的地方在于，浏览器仅仅缓存文件，而**Node会缓存的是编译和执行之后的对象**。
  >
  > 
  >
  > 2. 不论是`核心模块`还是`文件模块`，require()方法对相同模块的二次加载都一律采用缓存优先的方式，这是**第一优先级**的。不同之处在于核心模块的缓存检查优先文件模块的缓存检查



+ 编译过程：
  Node对获取的JavaScript文件内容进行了头尾包装。

  ```js
  (function (exports, require, module, __filename, __dirname) {
   // 我们的代码部分
   var math = require('math');
   exports.area = function (radius) {
   return Math.PI * radius * radius;
   };
   // 我们的代码部分结束
  }); 
  ```

  > 包装之后的代码会通过`vm原生模块`的runInThisContext()方法执行（类似eval，只是具有明确上下文，不污染全局），返回一个具体的function对象。最后，将当前模块对象的exports属性、require()方法、module（模块对象自身），以及在文件定位中得到的完整文件路径和文件目录作为参数传递给这个function()执行。

  ```js
  // 2.2.3.export.cjs
  const user = {
    name: 'xiaoqinvar'
  }
  
  // module.exports = user; // { name: 'xiaoqinvar' }
  // exports = user; // {}
  exports.user = user; // // { name: 'xiaoqinvar' }
  
  // 2.2.3.import.cjs
  const fileExport = require('./2.2.3.export.cjs');
  console.log(fileExport);
  ```

  > 用exports证明确实包装过，exports直接赋值相当于将形参的指针指向了user对象，而不在是module.exports，而导出的是module.exports，此时module.export为空，自然接受的是个空对象！


+ C/C++模块编译

  > 无需编译过程，只有加载和执行过程，执行方面高于Js

  

+ JSON文件编译

  > 此方式最简单，Node利用fs模块同步读取JSON文件的内容之 后，调用JSON.parse()方法得到对象，然后将它赋给模块对象的exports，以供外部调用，第一次加载会缓存！
  > <u>注意</u>：如果你要加载json文件直接require()，而不是fs读取，require()会缓存

### 核心模块加载过程

+ C/C++核心模块运行

> C/C++编写，**性能上优于脚本语言**；它们是被编译的二进制文件。**一旦Node开始执行，它们被直接加载进内存中**，无须再次做标识符定位、文件定位、编译等过程，直接就可执行



+ javascript转存c/c++过程

  启动时：Node采用了V8附带的js2c.py工具，将所有内置的JavaScript代码（src/node.js和lib/*.js）生成node_natives.h头文件，此过程**js代码以字符串的形式存储在node命名空间中**，是不可直接执行的。

  启动Node进程时：JavaScript代码直接加载进内存中。所以核心模块加载比文件模块从磁盘中一处一处查找要快很多。



+ 挂载javascript核心模块

  > 源文件通过process.binding('natives')取出，编译成功的核心模块缓存到NativeModule._cache对象上，文件模块则缓存到Module.\_cache对象上



### 加载过程图解
![node加载模块过程](./packages/nodejs%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BA%E7%AC%94%E8%AE%B0/images/node%E5%8A%A0%E8%BD%BD%E6%A8%A1%E5%9D%97%E8%BF%87%E7%A8%8B.png)

### 加载顺序图解
![加载顺序图解](./packages/nodejs%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BA%E7%AC%94%E8%AE%B0/images/node%E6%A0%B8%E5%BF%83%E6%A8%A1%E5%9D%97%E3%80%81%E6%96%87%E4%BB%B6%E6%A8%A1%E5%9D%97%E5%8A%A0%E8%BD%BD%E9%A1%BA%E5%BA%8F.png)
