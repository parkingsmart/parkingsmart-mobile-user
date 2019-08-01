const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

module.exports = {
  publicPath: './',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true
      },
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'prod') {
      config.optimization.minimize(true);
      config.optimization.splitChunks({
        chunks: 'all'
      });
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'prod') {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
      );
    }
  }
};