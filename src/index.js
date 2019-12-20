#!/usr/bin/env node

const commander = require('commander')
const program = new commander.Command();
const pkg = require('../package.json')
const create = require('./create/index')
const {start} = require('./cli/index')
program.version(pkg.version)
program
    .command('create <name> [type]')
    .description('创建一个新的项目')
    .action((name, type) => {
        create(name, type)
    })


program
    .command('start [rd]')
    .description('启动开发服务器')
    .action((rd) => {
        start(rd === 'rd')
    })

program.parse(process.argv)




