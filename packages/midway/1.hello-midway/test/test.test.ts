import {
  createApp,
  close,
  mockContext,
  createHttpRequest,
} from '@midwayjs/mock';
describe('test/controller/error.controller.test.ts', () => {
  it('should GET /e/', async () => {
    const app = await createApp();
    mockContext(app, 'username', 'ok.');
    const result = await createHttpRequest(app).get('/e/life');
    console.log(result.text);
    await close(app);
  });
});
