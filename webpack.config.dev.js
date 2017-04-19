import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer'

export default {
  debug: true,
  devtool: 'inline-source-map',  //cheap-module-eval-source-map
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      
      
      { test: /\.jpe?g$|\.gif$|\.jpg$|\.png$|\.wav$|\.mp4$/, loader: 'file?name=[name].[ext]' },
      {test: /(\.css)$/, loaders: ['style', 'css']},
      
      { test: /\.html$/, loader: 'html' },
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {
        test: /\.(woff|woff2|ttf|svg|eot)/,
        loader: 'url?limit=100000',
      }
    ]
  },
  postcss: ()=> [autoprefixer]
};