const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./config/webpack.config');

const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost',
  historyApiFallback: true
}

webpackDevServer.addDevServerEntrypoints(config, options);

const compiler = webpack(config);

const server = new webpackDevServer(compiler, options);

server.listen(8000, 'localhost', () => {
  console.log('8000');
})