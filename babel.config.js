module.exports = function (api) {
  api.cache(true);
  const presets = ['babel-preset-expo'];

  const plugins = [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        blacklist: null, // DEPRECATED. Use blocklist or allowlist
        whitelist: null, // DEPRECATED. Use blocklist or allowlist
        safe: false,
        allowUndefined: true,
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
