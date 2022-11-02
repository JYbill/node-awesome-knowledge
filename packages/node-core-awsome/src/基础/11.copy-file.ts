/**
 * @file: 11.copy-file.ts
 * @author: xiaoqinvar
 * @desc：通过buffer fs.open实现二进制文件的复制
 * @date: 2022-05-15 23:03:29
 */
import fs, { FileHandle } from 'node:fs/promises';
import { resolve } from 'path';

async function copyBigFile() {
  // 按1M读取
  const buf = Buffer.alloc(1024 * 1024);
  let readIndex = 0;
  let readEnd = readIndex;

  // 打开目标文件、打开源目标文件
  const openRet: FileHandle = await fs.open(resolve('../assets/source.png'), 'r').catch(e => e);
  const writeRet: FileHandle = await fs.open(resolve('../assets/target.png'), 'a+').catch(e => e);
  readByte();
  return;

  // 读取函数
  async function readByte() {
    const { buffer, bytesRead } = await openRet.read({
      buffer: buf,
      offset: 0,
      length: buf.length,
      position: readIndex,
    }).catch(e => e);
    console.log('读取字节', bytesRead / 1024 / 1024, 'M');
    console.log("读取的buffer", buffer);
    if (bytesRead <= 0) {
      return;
    }
    readEnd = bytesRead;
    writeByte();
  }

  // 写入
  async function writeByte() {
    const { buffer, bytesWritten } = await writeRet.write(buf, 0, readEnd, readIndex).catch(e => e);
    console.log('写入字节', bytesWritten / 1024 / 1024, 'M');
    console.log("写入的buffer", buffer);
    readIndex += bytesWritten;
    readByte();
  }
}
copyBigFile();