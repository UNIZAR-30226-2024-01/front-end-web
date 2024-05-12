module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
        modules: 'auto', // Enable automatic module detection
      },
    ],
    '@babel/preset-react',
  ],
  plugins: ['inline-react-svg'],
};

