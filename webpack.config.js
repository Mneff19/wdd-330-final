const path = require('path');

module.exports = {
    entry: {
        'main': './src/index.js',
        'profile': './src/profile.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    }
};