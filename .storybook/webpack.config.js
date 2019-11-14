const path = require('path')
module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader', {
          loader: 'postcss-loader',
          options: {
            /*
              Enable Source Maps
             */
            sourceMap: true,
            /*
              Set postcss.config.js config path && ctx
             */
            config: {
              path: './.storybook/',
            },
          }
        }],
        include: path.resolve(__dirname, '../')
      }
    ]
  },
  resolve: {
    alias: {
      '~': path.dirname(path.resolve(__dirname)),
      '@': path.dirname(path.resolve(__dirname))
    }
  }
}
