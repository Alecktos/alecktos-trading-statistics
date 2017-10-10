const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './client/index.html'
});

module.exports = {
	entry: ['whatwg-fetch', './client/index.js'], //the entry file where the bundler starts the process
	output: { //output where the bundled javascript should be saved
		path: path.resolve('dist'),
		filename: 'index.bundle.js',
		publicPath: '/' //This makes webpack work with dynamics paths browser router
	},
	/*devServer: {
		contentBase: './dist'
   },*/
	module: {
		loaders: [ //loaders are transformation that are applied to all files. Exlude stuff that are in node_modules
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
		]
	},
    plugins: [htmlWebpackPluginConfig]
};
