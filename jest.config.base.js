module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.tsx$': 'ts-jest',
    '^.+\\.js$': 'ts-jest',
    '^.+\\.jsx$': 'ts-jest',
    '^.+\\.(svg|styl|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['(tests/.*.mock).(jsx?|tsx?)$'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!spacetime|normalize-url)',
    '/cypress/',
    '/node_modules/(?!spacetime|normalize-url)',
    '../../../node_modules/(?!spacetime|normalize-url)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/public/', '/cypress/'],
  verbose: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
};
