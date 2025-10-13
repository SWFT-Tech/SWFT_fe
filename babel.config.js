// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    // NativeWind must be a PRESET here (not a plugin)
    presets: ["babel-preset-expo", "nativewind/babel"],

    // Reanimated plugin must be LAST
    plugins: ["react-native-reanimated/plugin"],
  };
};
