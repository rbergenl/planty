module.exports = {
    output: {
        path: require('path').join(__dirname, 'public')
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']	},
            { test: /\.css$/, exclude: /node_modules/, use: ['style-loader', 'css-loader'] }
        ]
    },
	devServer: {
		host: process.env.IP,
		public: process.env.C9_HOSTNAME,
		contentBase: 'public',
		historyApiFallback: true
	}
};