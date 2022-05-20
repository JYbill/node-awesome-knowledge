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
