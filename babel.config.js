module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './source',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
