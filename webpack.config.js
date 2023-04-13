const path = require("path");

module.exports = {
    entry: './frontend/main.js', // Your entry file
    output: {
      filename: 'bundle.js', // Output file name
      path: path.resolve(__dirname, 'frontend') // Output directory
    },
    module: {
      rules: [
        {
          test: /\.js$/, // Use babel-loader to transpile JavaScript files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
};