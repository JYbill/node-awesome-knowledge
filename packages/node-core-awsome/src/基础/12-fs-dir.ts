/**
 * @file: 12-fs-dir.ts
 * @author: xiaoqinvar
 * @desc：目录操作
 * @date: 2022-05-21 17:05:44
 */
import fs from 'fs/promises';
import { sep } from 'path';

// access
/* fs.access('./a.mjs').then((value) => {
  console.log(value);
}); */

// stat
/* fs.stat('./b.js').then((value) => {
  console.log(value);
}) */

// mkdir
// fs.mkdir('a/b/c', { recursive: true });

// rm
/* fs.rm('a', { recursive: true }).then(() => {
  console.log('删除成功');
}) */

// readdir
/* fs.readdir('a').then((value) => {
  console.log(value);
}) */

// unlink
/* fs.unlink('a/b/c/c.txt').then(() => {
  console.log('删除成功');
}).catch((error) => {
  console.log('删除失败', error);
}) */

/**
 * mkdir方法简单实现
 */
/* async function createDir(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const pathArr = path.split(sep);
    pathArr.forEach((item, index) => {
      const pathStr = pathArr.slice(0, index + 1).join(sep);
      fs.access(pathStr).catch(() => {
        fs.mkdir(pathStr).then(() => {
          resolve(undefined);
        })
          .catch(err => reject(err));
      })
    })
  })
}
createDir('a/b/c').then(() => {
  console.log('创建成功');
}).catch((err) => {
  console.log('错误', err);
}) */

/**
 * rm方法简单实现
 */
async function rmPath(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const pathArr = path.split(sep);
    let flag = false;
    pathArr.forEach(async (item, index) => {
      const path = pathArr.slice(0, pathArr.length - index).join(sep);
      await fs.access(path).then(() => {
        fs.rmdir(path).then(() => {
          flag = index === pathArr.length;
        });
      }).catch(err => reject(err));
    });
  });
}
rmPath('a/b/c').then(() => {
  console.log('删除完成');
}).catch((err) => {
  console.log(err);
})
