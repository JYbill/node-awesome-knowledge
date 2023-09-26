// plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DllReferencePlugin = require("webpack/lib/DllReferencePlugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")[
  "BundleAnalyzerPlugin"
];
const BasicPlugin = require("./plugins/BasicPlugin");

const path = require("path");

/**
 * Template strings 模板字符串
 * 参考地址：https://webpack.docschina.org/configuration/output/#template-strings
 *
 * - 编译层面进行替换
 * [fullhash]	compilation 完整的 hash 值
 * [hash]	同上，但已弃用
 *
 * - chunk 层面进行替换
 * [id]	此 chunk 的 ID
 * [name]	如果设置，则为此 chunk 的名称，否则使用 chunk 的 ID
 * [chunkhash]	此 chunk 的 hash 值，包含该 chunk 的所有元素
 * [contenthash]	此 chunk 的 hash 值，只包括该内容类型的元素（受 optimization.realContentHash 影响）
 *
 * - 模块层面替换
 * [id]	模块的 ID
 * [moduleid]	同上，但已弃用
 * [modulehash]	同上，但已弃用
 * [contenthash]	模块内容的Hash值，默认20位
 *
 * - 文件层面替换
 * [file]	filename 和路径，不含 query 或 fragment
 * [query]	带前缀 ? 的 query
 * [fragment]	带前缀 # 的 fragment
 * [base]	只有 filename（包含扩展名），不含 path
 * [filebase]	同上，但已弃用
 * [path]	只有 path，不含 filename
 * [name]	只有 filename，不含扩展名或 path
 * [ext]	带前缀 . 的扩展名（对 output.filename 不可用）
 *
 * - URL层面
 * [url]	URL
 */

module.exports = function (env, argv) {
  // env: { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true }
  // argv: { env: { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true } }
  // console.log(env, argv);
  return {
    /**
     * 作用：webpack默认context为执行cli命令的目录；在使用相对路径时，以"context"参考根目录
     * context: string(绝对路径字符串)
     */
    context: path.resolve(__dirname),

    /**
     * 作用：入口
     * @description
     * - entry
     *  - dependOn: 当前入口所依赖的入口。它们必须在该入口被加载前被加载。（不能是循环引用，否则抛出错误）
     *  - filename: 指定要输出的文件名称
     *  - import: 启动时需加载的模块
     *  - library: 指定 library 选项，为当前 entry 构建一个 library
     *  - runtime: 运行时 chunk 的名字。如果设置了，就会创建一个新的运行时 chunk。(不能指向已存在的入口名称，否则抛出错误)在 webpack 5.43.0 之后可将其设为 false 以避免一个新的运行时 chunk。
     *  - publicPath: 当该入口的输出文件在浏览器中被引用时，为它们指定一个公共 URL 地址。参考：output.publicPath。
     * 作用：入口
     * - 例子：MPA（多页面应用）多个入口
     * ```
     *   entry: ['./src/file_1.js', './src/file_2.js']
     *   entry: {
     *     home: './home.js',
     *     about: './about.js',
     *     contact: './contact.js',
     *   },
     * ```
     * >⚠️ 当"entry"为数组且定义了"output.library"时，仅entry最后一个元素生效！
     *
     * - entry名称：entry为字符串或数组时，chunk 会被命名为`main`；如果是对象则每个chunk为对应的key值
     * - entry动态配置
     * ```
     * entry: () => {
     *   return new Promise((resolve)=>{
     *     resolve({ a:'./pages/a', b:'./pages/b', });
     *   });
     * };
     * ```
     */
    entry: ["./index.ts"],
    mode: "development",

    /**
     * 作用：默认值为 "browserslist" 如果未找到 `browserslist配置` 则回退到 "web" 默认值。告知webpack当前环境。
     * - 参考：[Target配置选项](https://webpack.docschina.org/configuration/target/#target)
     * - "node": node.js环境，可用require("chunk")
     * - "async-node": node.js，可用fs 和 vm 异步加载chunk
     * - "webworker": 构建成一个WebWorker
     * - "electron-main": 构建为 Electron 主线程
     * - "electron-renderer": 构建为 Electron 渲染线程
     */
    target: "web",

    /**
     * 作用：配置Webpack如何生成Source Map
     * 默认值：false
     */
    devtool: "source-map",

    /**
     * 作用：webpack将监听任何已解析文件的更改，并重新构建
     * > 💡 webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启。
     * watchOptions: 在 watch 为时才有意义，该参数具备更精准的watch
     * - aggregateTimeout: 默认20（单位ms），构建延迟时间，避免重构频率过高
     * - ignored: 默认监听 webpack 启动时递归查找到的所有依赖的改动。支持：正则、glob、绝对路径、相对路径
     * - poll: 默认 5007，轮训间隔(单位ms)
     * > 💡 如果修改文件后未触发更新，可以尝试用poll，这对虚拟机、Docker有一定的帮助
     */
    watch: false,
    watchOptions: {
      aggregateTimeout: 500,
    },

    /**
     * 告诉 webpack 哪些内容是外部环境提供的（如：后续将vue通过引入cdn静态资源加速）这些内容不需要打包。
     * 参考：[externals 外部扩展](https://webpack.docschina.org/configuration/externals/#externals)
     * - externalsType：默认值为"var"
     * > 💡 更多参考：[externalsType 外部扩展类型](https://webpack.docschina.org/configuration/externals/#externalstype)
     */
    // externalsType: "var",
    // externals: {
    // jquery: "jQuery", // 将`import $ from 'jquery';`替换为全局的jQuery变量，不包含在打包内容！
    // },

    /* **************************** Entry配置（开始） **************************** */
    /**
     * 作用：配置输出代码
     * @description
     * - output
     * - filename: 入口输出文件名（当entry.filename未指定时生效）
     * - chunkFilename: 指定在运行过程中生成的Chunk在输出时的文件名称（非入口名），如：使用CommonChunkPlugin、import("...") 动态加载等
     * - assetModuleFilename: 专门应用于asset-loader的输出文件名
     * - path：配置输出文件存放在本地的目录，必须是string类型的绝对路径
     *
     * - publicPath: 指定打包后静态资源的访问，默认""即使用相对路径（CDN必用）
     * 如：配置publicPath: "/dist/"，打包时将项目里的相对路径转为绝对路径，"/main.js" 转换为 "/dist/main.js" ，一般配合 WebpackHTMLPlugin 一起使用
     * > ⚠️ "devServe.publicPath" 是静态资源资源文件夹访问内容的路径
     * > ⚠️ "output.publicPath" 是构建内容的访问路径
     * ```
     * // 对于打包发不到cdn服务器应该配置为：//cdn.test.com/dist/，"//"表示省略了"http:" or "https:"，这样可以根据当前访问html的环境进行请求对应的资源。
     *
     * // 在 devServe 下，/static/index.html 才能访问到资源
     * devServe.publicPath = "/static/";
     *
     * // 在 devServe 下，/dist/main.js 才能访问到资源
     * // 构建后，将 ./images/node.png 转为 /dist/node.png
     * output.publicPath = "/dist/";
     * ```
     *
     * - crossOriginLoading：Webpack输出的部分代码块可能需要异步加载，如果涉及跨域请求则需要配置了，取值：false | "anonymous" 不带凭证的跨域 | "use-credentials" 带凭证的跨域
     *
     * - library: 根据入口配置导出库的名称，⚠️ entry为数组时，只有最后一个文件会被暴露，详细参考：[output.library详细官方文档](https://webpack.docschina.org/configuration/output/#outputlibrary)
     * - library.type: 暴露方式。var、commonjs、json...
     * - library.export: 指定哪一个方法/模块导出应该被暴露为一个库。默认为undefined，将会导出整个（命名空间）对象
     *
     * - pathinfo: 所包含模块信息相关的注释，development环境默认开启，production默认为false
     */
    output: {
      filename: "[name].js",
      chunkFilename: "[name].js",
      path: path.resolve(__dirname, "dist"),
      // publicPath: "/dist/",
      clean: true, // 清空输出文件夹
      // assetModuleFilename: "images/[name][ext]",
      // library: {
      //   name: "xqv",
      //   type: "window",
      //   export: "default",
      // },
      // pathinfo: true,
    },
    /* **************************** Entry配置（结束） **************************** */

    /* **************************** Resolve配置（开始） **************************** */
    /**
     * 作用：默认webpack会采用模块化标准里约定好的规则去寻找规则，但我们可以自定义修改一些规则
     * - alias: 配置路径别名，方便查找和移动文件，支持正则
     *
     * - mainFields：决定使用导出第三方库中的哪个字段。（受target值影响）
     * 默认值：['browser', 'module', 'main']
     * target为node时，['module', 'main']
     * 例子：当一个第三方库package.json中有一个"next:main"导出最新语法的main文件时，我们可以指定mainFields: ["next:main", "main"]优先使用最新版本的内容
     *
     * - extensions: 默认是['.js', '.json']。在导入语句没带文件后缀时，尝试过程中用到的后缀列表
     *
     * - modules：配置去哪些目录下寻找第三方模块，默认按照nodejs寻找规则
     *
     * - descriptionFiles: 默认["package.json"]，配置描述第三方模块的文件名称
     *
     * - enforceExtension：默认false，强制启用导入时携带后缀。开启后只允许import foo from "./foo.js"，不允许省略后缀
     *
     * - symlinks：默认true；对于软连接，将查找到真实的硬盘地址。对于软连接这会有用。
     */
    resolve: {
      alias: {
        vue$: "./node_modules/vue/core/vue.min.js", // 只有命中以vue结尾的导入语句
      },
      symlinks: true,
      extensions: [".ts", ".mts", ".js"],
      // modules: [path.resolve(__dirname, "../node_modules")],
    },

    /**
     * 作用：解析loader，参数内容、作用 与 resolve 的保持一致
     */
    resolveLoader: {},
    /* **************************** Resolve配置（结束） **************************** */

    /* **************************** Plugin配置（开始） **************************** */
    plugins: [
      // 抽取CSS为单独文件的插件
      new MiniCssExtractPlugin({
        filename: "[name].css", // 计算8位的哈希值
        chunkFilename: "[name].css", // 非入口文件引入的chunk名
        ignoreOrder: false,
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      /* new DllReferencePlugin({
        manifest: require("./dll/lodash-manifest.json"),
      }),*/
      new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
      /*new BundleAnalyzerPlugin({
        analyzerMode: "server",
      }),*/
      new BasicPlugin({
        name: "xqv",
      }),
    ],
    /* **************************** Plugin配置（结束） **************************** */

    /* **************************** Loader配置（开始） **************************** */
    /**
     * 作用：模块解析规则
     * - noParse: 防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中 不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。
     */
    module: {
      rules: [
        {
          // 用正则去匹配要用该 loader 转换的 CSS 文件
          test: /\.css$/,
          use: [
            // "style-loader",
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                url: true,
                sourceMap: true,
              },
            },
          ],
        },
        {
          // 静态资源处理
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          type: "asset/resource",
        },
        {
          // 整合 babel
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              // presets: ["@babel/preset-env"],
            },
          },
        },
        {
          // 整合 TS
          test: /\.m?ts$/,
          exclude: /node_modules/,
          use: [
            /*{
              loader: "thread-loader",
              options: {
                poolTimeout: 500, // 可以设置为无穷大，以watch模式下使用；当超过指定毫秒时，关闭子进程
              },
            },*/
            {
              loader: "ts-loader",
              options: {
                happyPackMode: true,
              },
            },
          ],
        },
      ],
    },
    /* **************************** Loader配置（结束） **************************** */

    /* **************************** DevServe配置（开始） **************************** */
    /**
     * 作用：仅在webpack-dev-server下才有作用
     * @type {object} devServer
     * @description
     * - hot：默认true，"only"当热模块更新错误时，作为回退刷新页面
     *
     * - historyApiFallback：默认false，应用采用`H5 History API`时，根据用户的输入匹配返回的html。模拟生产环境中单页面的rewrites功能
     * - historyApiFallback.rewrites：模拟多页面的rewrites
     *
     * - static：默认："public"，提供静态文件的选项
     * - static.directory: 默认"public"，静态文件夹可以通过"/"访问的资源
     * - static.publicPath: 默认"/"，静态资源public资源的baseURL前缀。如："/static/"，只有通过"/static/node.png"才能访问当node.png图片（⚠️ 仅限静态资源，构建内容查看 "output.publicPath"）
     *
     * - headers: 可以在 HTTP 响应中注入一些 HTTP 响应头
     * - host: 默认127.0.0.1，DevServer 服务监听的地址
     * - port: 默认 8080，端口
     * - allowedHosts: 默认为 auto 。允许访问开发服务器的服务白名单列表。".host.com" 将会允许 "www.host.com"、"host.com"...等，通过允许的域名和其子域名访问；
     * auto则允许：localhost、host、client.webSocketURL.hostname 访问
     * all则表示允许所有且跳过host检查，不检查 host 的应用程序容易受到 DNS 重绑定攻击
     * - https: 默认 false 。启用HTTPS协议，webpack内置测试证书
     * - compress: 默认 false。 是否启用gzip压缩
     *
     * - client webSocket客户端相关配置
     * - client.logging: 日志级别
     *
     * - open：
     */
    devServer: {
      historyApiFallback: {
        rewrites: [
          { from: /^\/user/, to: "/user.html" }, // 匹配到"/user"时返回user.html
          { from: /./, to: "/index.html" }, // "*" 所有输入都返回index.html
        ],
      },
      static: {
        // publicPath: "/dist/",
      },
    },
    /* **************************** DevServe配置（结束） **************************** */

    /* **************************** Performance配置（开始） **************************** */
    /**
     * 作用：配置如何展示性能提示。如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
     * @type {object} performance
     * @description
     * - hints：默认为"warning"，开启/关闭提示；warning时，超过250kb的资源会抛出警告
     * - maxAssetSize：默认250000（单位byte）；最大文件大小，超过抛出提示
     * - maxEntrypointSize：默认250000（单位byte）；入口起点的最大体积，超过抛出提示
     * - assetFilter：过滤提示文件的函数；
     * ```
     * // 默认
     * function () {
     *   return !/\.map$/.test(assetFilename);
     * }
     * ```
     */
    performance: {
      // hints: "warning",
    },
    /* **************************** Performance配置（结束） **************************** */

    /* **************************** Stats配置（开始） **************************** */
    /**
     * 作用：控制台输出构建信息
     * - assets: 默认true，是否展示资源信息
     * - colors: 默认true，是否输出不同颜色
     * - errors: 默认true，是否输出错误
     * - errorDetails: 默认"auto"(当只有2个或更少的错误时，它将显示错误详情)，是否添加错误的详情
     * - hash: 默认true, 是否添加关于编译哈希值的信息
     *
     * - preset: 默认false，展示构建信息，更多预设值参考：[Stats Presets](https://webpack.docschina.org/configuration/stats/#stats-presets)，其中detailed能显示Tree-Shaking信息
     *
     * - optimizationBailout: 模块化失效的原因
     */
    stats: {
      // preset: "detailed",
      // optimizationBailout: true,
    },
    /* **************************** Stats配置（结束） **************************** */

    /* **************************** Cache配置（开始） **************************** */
    /**
     * 作用：缓存生成的 webpack 模块和 chunk，来改善构建速度。development下为"memory", production下为false
     */
    // cache: {},
    /* **************************** Cache配置（结束） **************************** */

    /* **************************** Optimization配置（开始） **************************** */
    /**
     * 作用：优化
     * - moduleIds: 选择模块id时需要使用哪种算法。"named" 显示更新的文件名，"natural" 显示更新的id，"deterministic" 显示更新的hash模块名
     *
     * - minimize: 告知webpack使用TerserPlugin压缩bundle
     * - minimizer: 提供一个或多个定制过压缩插件实例(如：CssMinimizerWebpackPlugin、TerserWebpackPlugin)
     *
     * - providedExports: 默认true，告知webpack将模块提供"export"导出，便于Tree-Shaking。
     * - usedExports: 默认false，production为true。只起到标记未使用代码功能，真实操作依赖Terse压缩插件的能力。true(对本地代码开启Tree-Shaking，不影响第三方库代码)、"global"(Tree-Shaking作用到运行时第三方库代码)
     *
     * - sideEffects: 生产环境默认"flag"，让webpack分析第三方包的[副作用代码](https://github.com/webpack/webpack/blob/main/examples/side-effects/README.md)。"flag"：不对源码和第三方库进行副作用分析，但允许使用"flag"。false: 对所有第三方库进行分析副作用函数标记。（如果显示设置该属性，生产环境会默认读取第三方包package.json的"sideEffects"属性进行副作用分析）true: 不进行副作用分析
     *
     * - concatenateModules: 默认false，production为true。根据模块图数据结构查找，哪些公共重读代码可以安全地被合并到单一模块中。
     *
     * - splitChunks: 内置的SplitChunksPlugin插件，用于自动拆分chunks
     * - cacheGroups: 自定义分割规则
     * - cacheGroups.{customName}.test: 匹配的路径
     * - cacheGroups.{customName}.chunks: 分割类型
     * - cacheGroups.{customName}.reuseExistingChunk: 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块。
     */
    optimization: {
      providedExports: true,
      usedExports: true,
      moduleIds: "deterministic",
      minimize: false,
      minimizer: [new TerserPlugin(), "..."],
      sideEffects: false,
      splitChunks: {
        cacheGroups: {
          chunks: "all",
          base: {
            filename: "lodash.bundle.js",
            test: /lodash/,
            reuseExistingChunk: true,
          },
        },
      },
    },
    /* **************************** Optimization配置（结束） **************************** */
  };
};
