/* eslint-disable prettier/prettier */
// 配置别名，3以上版本脚手架隐藏了配置
module.exports = {
  configureWebpack: {
    resolve: {
      // 别名配置
      alias: {
        //'@':'src',//内部已配置
        'assets': "@/assets",
      }
    }
  }
}
