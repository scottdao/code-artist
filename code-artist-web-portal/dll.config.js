const webpack = require('webpack');

const vendor =  [
    'react',
    'react-dom',
    'react-router',
    'antd'
    // ...其它库
];
module.exports = {
    output: {
        path: 'build',
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ]
}