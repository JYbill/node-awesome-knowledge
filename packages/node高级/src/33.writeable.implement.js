/**
 * @file: 33.writeable.implement.js
 * @author: xiaoqinvar
 * @desc：实现文件可写流
 * @date: 2022-07-11 19:15:24
 */
const fs = require('fs');
const { open } = require('fs/promises');
const EventEmitter = require('events');
const Queue = require('./32.linkedList');

class WriteableStream extends EventEmitter {
  path;
  hightWaterMark;
  mode;
  queue;
  fileHelper;
  // 已写的字节数
  hasWrittenLength = 0;
  // 还需要写入的字节数
  needWrittenLength = 0;
  // 需要触发drain事件
  needDrain = false;
  // 正在写入操作，等待串行
  isWriting = false;

  constructor(path, opt = {}) {
    super();
    this.path = path;
    this.hightWaterMark = opt.hightWaterMark || 16 * 1024;
    this.mode = opt.mode || 'w';
    this.queue = new Queue();
    this._open();
  }

  /**
   * 打开文件
   */
  async _open() {
    this.fileHelper = await open(this.path, this.mode);
    this.emit('open', this.fileHelper.fd);
  }

  /**
   * 写入缓存 or 文件
   * @param {*} chunk
   * @param {*} encoding
   */
  write(chunk, encoding, callback) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.needWrittenLength += chunk.length;
    const flag = this.hightWaterMark > this.needWrittenLength;

    this.queue.add({
      buffer: chunk,
      encoding,
      callback,
    });

    // 到达水平线，开始写入
    // console.log(flag, this.isWriting);
    if (!flag && !this.isWriting) {
      this.needDrain = true;
      this.isWriting = true;
      console.log('缓存占满开始写入文件');
      this._write();
    }
    return flag;
  }

  /**
   * 写入文件
   */
  async _write() {
    if (!this.fileHelper) {
      this.once('open', () => {
        this._write.call(this, arguments);
      });
      return;
    }

    try {
      // console.log(this.queue);
      const node = this.queue.removeLastNodeAndReturn();
      // console.log(node);
      // console.log(this.queue);
      if (!node || !node.content) {
        console.log('初始化', node);
        return;
      }

      console.log('has write length: ', this.hasWrittenLength);
      const writeRet = await this.fileHelper.write(
        node.content.buffer,
        0,
        node.content.buffer.length,
        this.hasWrittenLength
      );
      this.needWrittenLength -= writeRet.bytesWritten;
      this.hasWrittenLength += writeRet.bytesWritten;
      this.isWriting = false;

      if (this.needWrittenLength === 0 && this.needDrain) {
        this.emit('drain');
      }

      console.log(this.needWrittenLength);
      if (this.needWrittenLength >= 1) {
        this._write();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const ws = new WriteableStream('../assets/write.txt', {
  hightWaterMark: 1,
});
ws.on('open', (fd) => {
  // console.log('打开文件后', fd);
});
let flag = ws.write('1', 'utf-8', () => {
  console.log('write 1');
});
// console.log(flag);
flag = ws.write('23', 'utf-8', () => {
  console.log('write 2');
});

flag = ws.write('okk👌', 'utf-8', () => {
  console.log('write 2');
});

ws.on('drain', () => {
  console.log('缓存写完...');
});
// console.log(flag);
