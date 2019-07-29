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
  }
};