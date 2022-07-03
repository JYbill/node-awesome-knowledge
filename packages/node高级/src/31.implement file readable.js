/**
 * @file: 31.implement file readable.js
 * @author: xiaoqinvar
 * @desc：文件可读流的简单实现
 * @date: 2022-07-03 12:07:12
 */
const { open } = require('fs/promises');
const EventEmitter = require('events');
const assert = require('assert');

class FileReadableStream extends EventEmitter {
  path = '';
  // 64Kb
  highWaterMark = 64 * 1024;
  mode = 'r';
  start = 0;
  end;
  handler = null;
  readOffset = 0;

  constructor(path, opt) {
    super();
    this.path = path;
    this.highWaterMark = opt.highWaterMark || this.highWaterMark;
    this.mode = opt.mode || this.mode;
    this.readOffset = this.start = opt.start || this.start;
    this.end = opt.end || this.end;

    // init methods
    this._open();
  }

  /**
   * open file, return fd number
   */
  async _open() {
    try {
      const fileHandler = await open(this.path, this.mode);
      const fd = fileHandler.fd;
      this.handler = fileHandler;
      this.emit('open', fd);
      this._read();
    } catch (error) {
      this.emit('error', error);
    }
  }

  /**
   * read file by path, and emit 'data' event.
   */
  async _read() {
    try {
      // 计算获取的长度：每次获取水平线长度，最后一次获取readOffset - end
      const computedLength = this.end
        ? Math.min(this.highWaterMark, this.end - this.readOffset)
        : this.highWaterMark;
      const buffer = Buffer.alloc(this.highWaterMark);
      const { bytesRead: bytesLength, buffer: bytes } = await this.handler.read(
        buffer,
        0,
        computedLength,
        this.readOffset
      );
      // 递归读取
      if (bytesLength <= 0) {
        this._destroy();
        return;
      }

      // 记录偏移量
      this.readOffset += bytesLength;
      // 触发data事件
      this.emit('data', bytes.slice(0, bytesLength));
      this._read();
    } catch (error) {
      this.emit('error', error);
    }
  }

  /**
   * destroy file handler
   */
  async _destroy() {
    this.handler.close();
    this.emit('close');
  }
}

const rs = new FileReadableStream('../assets/write.txt', {
  highWaterMark: 3,
  end: 24,
});

rs.on('open', (fd) => {
  console.log('file was opened, fd is ', fd);
});
rs.on('error', (error) => {
  console.log('file readable stream has error');
  console.error(error);
});
rs.on('close', () => {
  console.log('file stream was closed');
});

rs.on('data', (chunk) => {
  console.log('data event.');
  console.log(chunk);
  console.log(chunk.toString());
});
