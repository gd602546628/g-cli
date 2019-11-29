const cwd = process.cwd()
const path = require('path')
module.exports = {
    getAppConfig() {
        return require(path.resolve(cwd, 'app.config.js'))
    }
}