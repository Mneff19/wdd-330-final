const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    entry: './src/profile.js',
    output: {
      filename: 'profile.js',
      path: path.resolve(__dirname, 'dist'),
    },
};