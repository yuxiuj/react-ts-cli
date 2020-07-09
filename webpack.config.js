'use strict';
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const env = process.env.NODE_ENV;

const publicPath = {
	dev: '',
	production: '< 生产环境资源地址前缀 >',
};

module.exports = {
	entry: {
		index: path.resolve(__dirname, './src/index.tsx'),
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[hash:8].js',
		// chunkFilename: '[name].[hash:8].js',
		publicPath: publicPath[env],
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			name: 'vendor',
		},
	},
	devServer: {
		port: 3333,
		disableHostCheck: true,
		compress: true,
		hot: true,
		historyApiFallback: true,
		open: true,
		proxy: {
			'/api/v1': {
				target: '',
				changeOrigin: true,
				secure: false,
			},
		},
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.css', '.less'],
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@config': path.resolve(__dirname, 'src/config'),
			'@services': path.resolve(__dirname, 'src/services'),
			'@store': path.resolve(__dirname, 'src/store'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'~': path.resolve(__dirname, 'node_modules/'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: ['babel-loader', 'ts-loader', 'eslint-loader'],
			},
			{
				test: /\.html$/,
				loader: ['html-loader'],
			},
			{
				test: /\.less$/,
				include: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					'postcss-loader',
					'less-loader',
				],
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							modules: true,
						},
					},
					'postcss-loader',
					'less-loader',
				],
			},
			{
				test: /\.css$/,
				include: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					'postcss-loader',
				],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true,
						},
					},
					'postcss-loader',
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: 'file-loader',
			},
		],
	},
	devtool: 'cheap-source-map',
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBedoreBuildPatterns: ['dist'],
		}),
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
};
