## 1.分析

```js
yarn add --dev react-app-rewire-webpack-bundle-analyzer


```

https://www.cnblogs.com/zyl-Tara/p/10635033.html

配置代理服务器等一些文件



配置antdmobile

https://blog.csdn.net/weixin_39836173/article/details/86110011

方式,自定义+babelsrc





## 打印config



```js
config {
  mode: 'production',   
  bail: true,
  devtool: 'source-map',
  entry: [ 'D:\\AllProject\\我的项目\\bike\\webpackInit\\src\\index.js' ],
  output: {
    path: 'D:\\AllProject\\我的项目\\bike\\webpackInit\\build',
    pathinfo: false,
    filename: 'static/js/[name].[contenthash:8].js',
    futureEmitAssets: true,
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    publicPath: '/',
    devtoolModuleFilenameTemplate: [Function],
    jsonpFunction: 'webpackJsonpbike',
    globalObject: 'this'
  },
  optimization: {
    minimize: true,
    minimizer: [ [TerserPlugin], [OptimizeCssAssetsWebpackPlugin] ],
    splitChunks: { chunks: 'all', name: false },
    runtimeChunk: { name: [Function: name] }
  },
  resolve: {
    modules: [
      'node_modules',
      'D:\\AllProject\\我的项目\\bike\\webpackInit\\node_modules'
    ],
    extensions: [
      '.web.mjs', '.mjs',
      '.web.js',  '.js',
      '.json',    '.web.jsx',
      '.jsx'
    ],
    alias: { 'react-native': 'react-native-web' },
    plugins: [ [Object], [ModuleScopePlugin] ]
  },
  resolveLoader: { plugins: [ [Object] ] },
  module: {
    strictExportPresence: true,
    rules: [ [Object], [Object], [Object] ]
  },
  plugins: [
    HtmlWebpackPlugin {
      options: [Object],
      childCompilerHash: undefined,
      childCompilationOutputName: undefined,
      assetJson: undefined,
      hash: undefined,
      version: 4
    },
    InlineChunkHtmlPlugin {
      htmlWebpackPlugin: [Function],
      tests: [Array]
    },
    InterpolateHtmlPlugin {
      htmlWebpackPlugin: [Function],
      replacements: [Object]
    },
    ModuleNotFoundPlugin {
      appPath: 'D:\\AllProject\\我的项目\\bike\\webpackInit',
      yarnLockFile: undefined,
      useYarnCommand: [Function: bound useYarnCommand],
      getRelativePath: [Function: bound getRelativePath],
      prettierError: [Function: bound prettierError]
    },
    DefinePlugin { definitions: [Object] },
    MiniCssExtractPlugin { options: [Object] },
    ManifestPlugin { opts: [Object] },
    IgnorePlugin {
      options: [Object],
      checkIgnore: [Function: bound checkIgnore]
    },
    GenerateSW { config: [Object] }
  ],
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: false
}
env undefined
```











## 节点测试

```js

current: Button
isMounted: undefined
replaceState: undefined
props: {children: "获取验证码", loading: false, ghost: false, block: false, onClick: ƒ, …}
context: {csp: undefined, autoInsertSpaceInButton: undefined, locale: {…}, getPrefixCls: ƒ, renderEmpty: ƒ, …}
refs: {}
updater: {isMounted: ƒ, enqueueSetState: ƒ, enqueueReplaceState: ƒ, enqueueForceUpdate: ƒ}
saveButtonRef: ƒ (node)
handleClick: ƒ (e)
state: {loading: false, hasTwoCNChar: false}
_reactInternalFiber: FiberNode {tag: 1, key: null, stateNode: Button, elementType: ƒ, type: ƒ, …}
_reactInternalInstance: {_processChildContext: ƒ}
buttonNode: button.ant-btn
__proto__: Component
```

```js
isMounted: (...)
replaceState: (...)
props: {}
context: {}
refs: {}
updater: {isMounted: ƒ, enqueueSetState: ƒ, enqueueReplaceState: ƒ, enqueueForceUpdate: ƒ}
RoleformRef: {current: {…}}
_reactInternalFiber: FiberNode {tag: 1, key: null, stateNode: RoleForm, elementType: ƒ, type: ƒ, …}
_reactInternalInstance: {_processChildContext: ƒ}
state: null
```



