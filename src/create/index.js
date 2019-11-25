const fs = require('fs')
const fse = require('fs-extra')
const {consoleErr, deleteFolder} = require('../utils/index')
const shell = require('shelljs')
const CWD = process.cwd()
const path = require('path')
const tempName = '.g-cli-temp'
const gitUrl = 'https://github.com/gd602546628/gCavans'
const gitPath = `${tempName}/gCavans`

function create(name, type) {
    if (fs.existsSync(name)) {
        consoleErr('错误：' + name + '文件夹已存在')
        process.exit()
    }
    gitCloneToTemp(() => {
        createProject(name, type)
    }) // 代码clone到缓存文件夹
}

function gitCloneToTemp(callback) { //从git上拉取代码放入temp文件夹中
    if (fs.existsSync(tempName)) {
        fse.removeSync(tempName)
    }
    fs.mkdirSync(tempName)
    shell.cd('./' + tempName)
    shell.exec(
        `git clone ${gitUrl}`
        , (error, stdout, stderr) => {
            if (error) {
                consoleErr('clone代码失败')
                shell.exit(1)
                process.exit()
            }
            shell.cd('../') // 后续要删除临时目录，这里将cd退出，避免文件夹锁定
            callback && callback()
        })
}

function createProject(name, type) {
    const dirPath = `${gitPath}/${type}` // 将要拷贝的项目路径
    const srcPath = path.resolve(CWD, dirPath)
    const targetPath = path.resolve(CWD, name)
    if (!fs.existsSync(srcPath)) { //创建的项目类型不存在
        consoleErr('错误，暂无该类型项目，请检查')
        process.exit()
    }
    fs.mkdirSync(targetPath)
    fse.moveSync(srcPath, targetPath, {overwrite: true})
    fse.removeSync(path.resolve(CWD, tempName))
}

module.exports = create
