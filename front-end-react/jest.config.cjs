  // Definir la configuración de Jest
module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'mjs'], // Agregamos la extensión mjs
  testMatch: ['**/__tests__/**/*.test.jsx', '**/?(*.)+(spec|test).jsx'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest', // Agregamos la transformación para archivos mjs
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.css$"
  ]
};

  