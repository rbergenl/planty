module.exports = {
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']	}    
        ]
    },
	devServer: {
		host: process.env.IP,
		public: process.env.C9_HOSTNAME,
		contentBase: 'public',
		historyApiFallback: true
	}
};