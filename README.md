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
大文件拷贝例子，利用fs、buffer等实现

<br/>


# 《深入浅出Node.js》笔记、精彩部分
## 第一章
- 1.2.2 为什么叫Node
  > 原文：Node发展为一个强制不共享任何资源的单线程、单进程系统，包含十分适宜网络的库，为构建大型分布式应用程序提供基础设施，其目标也是成为一个构建快速、可伸缩的网络应用平台。它自身非常简单，通过通信协议来组织许多Node，非常容易通过扩展来达成构建大型网络应用的目的。每一个Node进程都构成这个网络应用中的一个节点，这是它名字所含意义的真谛。

  此乃Node.js真谛，在前十年创造出来就被赋予的使命，"分布式架构"、"落地微服务"！
  