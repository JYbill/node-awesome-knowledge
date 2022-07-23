const { Bootstrap } = require('@midwayjs/bootstrap');
Bootstrap.configure({
  globalConfig: {
    default: {
      keys: 'abcde',
    },
  },
}).run();
