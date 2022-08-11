const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode= process.env.NODE_ENV !== 'production';


module.exports = {
  //indicamos donde esta nuestro archivo prinicipal del frontend 
  entry: "./frontend/app.js",
  //indicamos donde va a colocar el codigo convertido
  output:{
    path: path.join(__dirname, 'backend/public'),
    filename: 'js/bundle.js'
  },
  //para que lea los archivos css. 
  module: {
    rules: [
      {
      test: /\.css$/,
      use: [
        //si estoy en desarrollo carga los estilos dentro del js, si estoy en produccion carga los estilos en su propio archivos de css. 
        devMode ? 'style-loader' : miniCssExtractPlugin.loader,
        'css-loader',
      ]
      }
    ]
  },

  plugins :[
    new HtmlWebpackPlugin ({
      template: './frontend/index.html',
      minify: {
        collapseWhitespaces: true, //quita los espacios en blanco del html
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,

      }
    }),

    new miniCssExtractPlugin({
      filename: 'css/bundle.css',
    })
  ],

  devtool: 'source-map',
}