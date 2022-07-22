import { UserService } from './../../src/service/user.service';
import { Framework, Application } from '@midwayjs/koa';
import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import * as assert from 'assert';

describe('test/controller/error.controller.test.ts', () => {
  let app: Application;
  let userService: UserService;

  beforeAll(async () => {
    try {
      app = await createApp<Framework>();
      userService = await app
        .getApplicationContext()
        .getAsync<UserService>(UserService);
    } catch (err) {
      console.error('test beforeAll error', err);
      throw err;
    }
  });

  afterAll(async () => {
    // close app
    await close(app);
  });

  it('should GET /e/life', async () => {
    // make request
    const result = await createHttpRequest(app)
      .get('/e/life')
      .set('x-timeout', '5000');

    // use expect by jest
    expect(result.status).toBe(200);
    assert.deepStrictEqual(result.status, 200);
  });

  it('should user.service.ts', async () => {
    expect(userService.count).toBe(0);
  });
});
