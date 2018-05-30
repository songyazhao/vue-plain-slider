/**
 * Created by songyazhao on 2018/05/30.
 */
const { resolve } = require('path')

module.exports = {
  // 添加一个模块别名
  configureWebpack: config => {
    config
      .resolve
      .alias['vue-plain-slider'] = resolve(__dirname, './src/components/Slider')
  }
}
