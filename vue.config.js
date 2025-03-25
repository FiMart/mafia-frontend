const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
<<<<<<< HEAD
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

=======
  transpileDependencies: true
})
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
