const path = require("path");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};
module.exports = {
  pluginOptions: {
    mock: { entry: "./mock/index.js", debug: true },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@v-render", resolve("packages"));
  },
};
