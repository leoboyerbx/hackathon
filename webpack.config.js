const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const dev = process.env.NODE_ENV === "dev"
const glob = require('glob')

let styleLoaders = [
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: process.env.NODE_ENV === 'development',
        },
    },
    'css-loader'
]

let config = {
    entry: {
        app: ['./src/assets/scss/app.scss', './src/assets/js/app.js']
    },
    resolve: {
        alias: {
            '@': path.resolve('./src/assets/js/'),
            'fonts': path.resolve('./src/assets/fonts/'),
            '@css': path.resolve('./src/assets/css/'),
            '@scss': path.resolve('./src/assets/scss/'),
            'img': path.resolve('./src/assets/img/')
        }
    },
    watch: dev,
    mode: dev ? 'development' : 'production',
    devtool: dev ? "cheap-module-eval-source-map" : "source-map",
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                use: styleLoaders
            },
            {
                test: /\.scss$/,
                use: [...styleLoaders, 'sass-loader']
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.* )?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(wav|mpe?g?[234]|webm|ogg|ogv)(\?.* )?$/,
                loader: 'file-loader',
                options: {
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(png|gif|jpg|svg|webp)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[hash:7].[ext]'
                        },
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: !dev,
                            plugins: [
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false
                                }),
                                require('imagemin-pngquant')({
                                    floyd: 0.5,
                                    speed: 2
                                })
                            ]
                        }
                    }
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.bundle.css"
        }),
        // new HTMLWebpackPlugin({template: "src/index.ejs"}),
        // // new HTMLWebpackPlugin({
        // //     filename: 'geii.html',
        // //     template: "src/geii.ejs"
        // // }),
        // // new HTMLWebpackPlugin({
        // //     filename: 'pro.html',
        // //     template: "src/pro.ejs"
        // // })
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000,
        host: '0.0.0.0',
        disableHostCheck: true
      }

};
const files = glob.sync(path.resolve(__dirname, 'src/*.html'))
files.forEach(file => {
    config.plugins.push(new HTMLWebpackPlugin({
        template: file,
        filename: path.basename(file)
    }))
})

module.exports = config
