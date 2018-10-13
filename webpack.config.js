const path = require('path');

module.exports = {
    mode: 'development',

    entry: './src/index.ts',
    output: {
        filename: 'ddd.js',
				path: path.resolve(__dirname, 'dist'),
				libraryTarget: 'umd',
        library: {
            root: ["DDD"],
            amd: "ddd-amd",
            commonjs: "ddd-common"
        },
        umdNamedDefine: true,
		},
		resolve: {
			extensions: [
					'.ts'
			]
	  },
    devtool: 'source-map',
    module: {
        rules: [{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					exclude: /node_modules/,
				},
				// {
					// test: /\.fx$/,
					// use: [{
					// 		loader: path.resolve(__dirname, '../Tools/WebpackShaderLoader/index.js')
					// }
				// ]
			// }
		]
    },
		devServer: {
			contentBase: path.join(__dirname, "test"),
			compress: false,
			open: true,
			port: 9090
	  },
		watchOptions: {
			ignored: [path.resolve(__dirname, './dist/**/*.*'), 'node_modules']
	}
};