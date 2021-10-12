module.exports = {
  devServer: {
    disableHostCheck: true
  },
  "transpileDependencies": [
    "vuetify"
  ],
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Wajihome',
    }
  }
}
