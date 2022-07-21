import { Context } from '@midwayjs/koa';
import { Controller, Get, Inject } from '@midwayjs/decorator';
import * as https from 'https';
import * as fs from 'fs';
import * as querystring from 'querystring';

@Controller('/proxy')
export class ProxyController {
  @Inject()
  ctx: Context;

  @Inject()
  baseDir;

  @Get()
  async index() {
    return new Promise(resolve => {
      const post_data = JSON.stringify({
        EventType: 'FileDeleted',
        FileUploadEvent: null,
        ProcedureStateChangeEvent: null,
        PullCompleteEvent: null,
        EditMediaCompleteEvent: null,
        ComposeMediaCompleteEvent: null,
        WechatPublishCompleteEvent: null,
        TranscodeCompleteEvent: null,
        ConcatCompleteEvent: null,
        ClipCompleteEvent: null,
      });
      const options = {
        host: 'www.rayplus.net',
        port: 443,
        method: 'POST',
        path: '/v1/cloud/test',
        key: fs.readFileSync(this.baseDir + '/ca/192.168.0.100+18-key.pem'),
        cert: fs.readFileSync(this.baseDir + '/ca/192.168.0.100+18.pem'),
        rejectUnauthorized: false,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(post_data),
          'user-agent': 'Go-http-client/1.1',
          'accept-encoding': 'gzip',
          connection: 'close',
        },
      };
      const req = https.request(options, function (res) {
        const bufferArray = [];
        res.on('data', function (data) {
          bufferArray.push(data);
        });
        res.on('end', () => {
          const allBuffers = bufferArray.concat();
          console.log(allBuffers.toString());
          try {
            resolve(JSON.parse(allBuffers.toString()));
          } catch (error) {
            resolve(allBuffers.toString());
          }
        });
      });

      req.write(post_data);
      req.end();
    });
  }
}
