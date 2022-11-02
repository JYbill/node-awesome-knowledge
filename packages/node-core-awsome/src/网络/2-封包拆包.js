class TCPTransformUtil {
  // 头部信息长度4字节
  headerLen;
  // 序列号
  serialNum;
  // 序列号长度
  serialLen;
  constructor(headerLen = 4, serialNum = 1, serialLen = 2) {
    this.headerLen = headerLen;
    this.serialNum = serialNum;
    this.serialLen = serialLen;
  }

  /**
   * 编码buffer文件
   * @param {*} data buf
   * @param {*} serialNum 序列号
   * @returns
   */
  encode(data, serialNum) {
    // 默认序列号
    if (!serialNum) {
      serialNum = this.serialNum;
    }

    const headerBuf = Buffer.alloc(this.headerLen);
    headerBuf.writeInt16BE(serialNum); // 序列号信息
    headerBuf.writeInt16BE(data.length, this.serialLen); // data长度信息

    // 返回编码的buffer
    const resBuf = Buffer.concat([headerBuf, data]);
    this.serialNum++;
    return resBuf;
  }

  /**
   * 根据encode函数封装后的buffer进行解码
   * @param {*} buf
   * @returns Buffer
   */
  decode(buf) {
    const headerBuf = buf.slice(0, this.headerLen);
    const serialNum = headerBuf.readInt16BE();
    const dataLen = headerBuf.readInt16BE(this.serialLen);
    const dataBuf = buf.slice(this.headerLen, this.headerLen + dataLen);

    return {
      serial: serialNum,
      payloadLen: dataLen,
      payload: dataBuf.toString(),
    };
  }

  /**
   * 获取buffer长度，未编码的返回长度0
   * @param {*} buf
   * @returns
   */
  getBufferLen(buf) {
    // 没有数据、封装过程中
    if (!buf || buf.length <= this.headerLen) {
      return 0;
    }
    return buf.length;
  }
}

module.exports = TCPTransformUtil;

/* const transform = new TCPTransformUtil();
const msg = Buffer.from("你好");
console.log("msg buffer", msg);
const encodeBuf = transform.encode(msg);
console.log("encode buffer", encodeBuf);
const decodeData = transform.decode(encodeBuf);
console.log("decode data", decodeData);
const getBufLen = transform.getBufferLen(encodeBuf);
console.log("getBufLen", getBufLen);
 */
