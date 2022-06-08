/**
 * @file: 15.self-require.cjs
 * @author: xiaoqinvar
 * @desc：require方法实现
 * @date: 2022-06-06 21:49:52
 */
const path = require('path');
const fs = require('fs');

/**
 * 模块类
 */
class MyModule {
  static exports = {};

  static extensionResolve = {
    ".js"(path) {
      console.log(path);
    },
    '.cjs'(path) {
      MyModule.extensionResolve[".js"](path);
    },
    ".json"(path) {
      const content = fs.readFileSync(path);
      console.log(content);
    }
  }

  /**
   * 根据参数返回绝对路径，只考虑相对路径，可以省略扩展名，但不匹配.node结尾的文件
   * @param {*} pathFlag 
   */
  static resolvePath(pathFlag) {
    if (!pathFlag.startsWith('./')) {
      console.log('请输入相对路径标识符');
      return;
    }
    const absolutePath = path.resolve(__dirname, pathFlag);
    const extension = path.extname(absolutePath);

    // 排除ESM(理想条件，package.json type="commonjs")
    if (extension === '.mjs') {
      throw new Error('无法引入mjs');
    }

    // 带扩展名后缀直接返回
    switch (extension) {
      case '':
        break;
      case '.js':
      case '.cjs':
      case '.json':
        // 无该文件
        if (!fs.existsSync(absolutePath)) {
          throw new Error('不存在该文件');
        }
        return absolutePath;
    }

    // 省略文件扩展名
    // 绝对路径带扩展名
    let realPath;
    if (!absolutePath.match(/\.json|cjs|js$/)) {
      Object.keys(MyModule.extensionResolve).some((item) => {
        const testFile = absolutePath + item;
        const result = fs.existsSync(testFile);
        if (result) {
          realPath = testFile;
        }
        return result;
      });
    }

    if (!realPath) {
      throw new Error('文件不存在');
    }
    return realPath;
  }
}

function myRequire(fileFlag) {
  // 判断路径，转换成绝对路径
  const absolutePath = MyModule.resolvePath(fileFlag);
  console.log(absolutePath);

  // 缓存优先

  // 没有缓存，创建空的加载目标对象

  // 缓存空对象

  // 编译执行
}
const res = myRequire('./b');