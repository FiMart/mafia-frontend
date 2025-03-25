const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://mafia.northy888.com',
        changeOrigin: true,
        secure: false, 
        // Remove pathRewrite
      }
    }    
  },
  configureWebpack: {
    plugins: [
      new (require('webpack')).DefinePlugin({
        '__VUE_OPTIONS_API__': true,
        '__VUE_PROD_DEVTOOLS__': false,
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false
      })
    ]
  }
})

