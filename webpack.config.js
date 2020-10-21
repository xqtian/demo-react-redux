const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
// const nodeExternals = require('webpack-node-externals');

function resolve (dir) {
    return path.join(__dirname, dir)
  }
  
 module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/,
            loader:['style-loader', 'css-loader']
        }, {
            test: /\.scss$/,
            loader: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.less$/,
            loader: ['style-loader', 'css-loader', 'less-loader']
        },{
            test: /\.(png|svg|jpg|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'img/[name].[hash:7].[ext]'
            }
        },{ 
            test:/\.(woff|svg|eot|ttf)\??.*$/,
            loader: ['file-loader']
        },{
            //js文件才使用babel
            test: /\.(js|jsx)$/,
            loader:'babel-loader?cacheDirectory=true',
            //只在src文件夹下查找
            include:[resolve('src')],
            //不会去查找路径
            exclude:/node_modules/
        }]
    },
    devServer: {
        contentBase: './build',
        port: 8081,
        inline: true,
        hot: true,
        // proxy: {
        //     'http://api.cangdu.org': {
        //         target: 'http://localhost:8081',
        //         changeOrigin: true,
        //         secure: false
        //     }
        // },
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.less'],
        alias: {
          '@': `${__dirname}/src/`,
          'static': `${__dirname}/src/static/`,
          'utils': `${__dirname}/src/utils/`,
          'config': `${__dirname}/src/config/`,
          'pages': `${__dirname}/src/pages/`,
          'services': `${__dirname}/src/services/`,
          'components': `${__dirname}/src/components/`,
          'models': `${__dirname}/src/models/`
        }
    },
    // externals: [nodeExternals()],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            template: 'src/index.html'
        }),
        // new ExtractTextPlugin({filename: 'src/assets/iconfonts/iconfont.css'}) // 配置字体图标 webpack已经做了 不需要了
    ]
}