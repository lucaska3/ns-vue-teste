module.exports = function (api) {
  api.cache(true)

  return {
    presets: [
      ['@babel/env', {
        targets: {
          esmodules: true
        }
      }]
    ],
    plugins: [
      ["@babel/proposal-decorators", {
        "legacy": true
      }],
      ["@babel/proposal-class-properties", {
        "loose": true
      }]
    ]
  }
}