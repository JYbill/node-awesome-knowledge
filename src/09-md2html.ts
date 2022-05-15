/**
 * @file: 09-md2html.ts
 * @author: xiaoqinvar
 * @desc：md转html并监听和渲染demo
 * @date: 2022-05-15 20:59:06
 */
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const mdWatcher = fs.watch(path.resolve('assets/md.md'), (event, filename) => {
  const content = fs.readFileSync(path.resolve('assets/md.md')).toString();
  const htmlContent = marked.parse(content);
  fs.writeFileSync(path.resolve('assets/md.html'), htmlContent, { flag: 'w+' });
  mdWatcher.close();
  console.log('只监听一次，关闭监听...');
})