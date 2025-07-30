import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "\\.[jt]sx?$": "ts-jest",
    },
    testRegex: "(.*\\.(test|spec))\\.(ts|tsx|js)$",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.js',
    }
};

export default config;