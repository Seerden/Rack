const path = require("path");
const miniCss = require("mini-css-extract-plugin");
const html = require("html-webpack-plugin");
require("dotenv").config({ path: "./.env" });
const webpack = require("webpack");

module.exports = {
	optimization: {
		splitChunks: {
			chunks: "async",
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					reuseExistingChunk: true,
				},
			},
		},
	},
	devtool: "cheap-module-source-map",
	entry: {
		index: path.resolve(__dirname, "src/index.tsx"),
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: "",
	},
	watchOptions: {
		poll: 1000,
	},
	devServer: {
		port: 3000,
		host: "0.0.0.0",
		historyApiFallback: true,
		proxy: {
			"/api": {
				target: "http://localhost:5000",
				pathRewrite: {
					"^/api": "",
				},
				changeOrigin: true,
			},
		},
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "ts-loader",
					options: {
						transpileOnly: true,
					},
				},
			},
			{
				test: /\.scss$/,
				use: [miniCss.loader, "css-loader", "sass-loader"],
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".js", ".js", ".ts"],
		modules: ["src", "node_modules"],
		alias: {
			components: path.resolve(__dirname, "src", "components/"),
			hooks: path.resolve(__dirname, "src", "hooks/"),
			helpers: path.resolve(__dirname, "src", "helpers/"),
			state: path.resolve(__dirname, "src", "state/"),
			types: path.resolve(__dirname, "src", "types/"),
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": JSON.stringify(process.env),
		}),
		new miniCss(),
		new html({
			template: "./src/index.build.html",
			filename: "index.build.html",
		}),
	],
};
