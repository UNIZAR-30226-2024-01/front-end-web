// Definir la configuración de Jest
module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'mjs'], // Agregamos la extensión mjs
  testMatch: ['**/__tests__/**/*.test.jsx', '**/?(*.)+(spec|test).jsx'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transform JS and JSX files
    '^.+\\.mjs$': 'babel-jest', // Transform MJS files with Babel
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.css$'],
  setupFilesAfterEnv: ['./jest.setup.js'], // Add this line
};

  