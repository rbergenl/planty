module.exports = {
    output: {
        path: require('path').join(__dirname, 'public')
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']	},
            { test: /\.css$/, exclude: /node_modules/, use: ['style-loader', 'css-loader'] },
            { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] }
        ]
    },
    node: {
        fs: 'empty',
        tls: 'empty'
    },
	devServer: {
		host: process.env.IP,
		public: process.env.C9_HOSTNAME,
		contentBase: 'public',
		historyApiFallback: true
	}
};