const files = require.context('./', false, /\.js$/)

const configs = {}
files.keys().filter(fileKey => {
  if (fileKey !== './index.js') {
    const key = fileKey.slice(2, -3)
    const module = files(fileKey).default
    Object.keys(module.state).forEach(k => {
      module.getters[k] = state => state[k]
    })
    configs[key] = module
  }
})

export default configs
