#!/usr/bin/env node
'use strict';
const program = require('commander');
const chalk = require('chalk');
const Inquirer = require('inquirer');
const Git = require("nodegit");
const log = require('../lib/log');
const util = require('../lib/util');
const path = require('path');
const fs = require('fs');

// 版本
program
    .name('x-cli')
    .usage('<commnad [options]>')
    .version(`x-cli ${require('../package').version}`)
    .option('-i, --init', '初始化项目依赖配置');
 
// 命令
program
    .command('init')
    .description('crate a new project')
    .action(() => {
        // 选择模板
        new Inquirer.prompt([
            {
                name: "type",
                type: "list",
                message: "Check the features needed for your project:",
                choices: [
                    {
                        name: "Vue",
                        value: 1
                    },
                    {
                        name: "React",
                        value: 2
                    },
                ],
            },
        ]).then((data) => {
            console.log(data);
            util.loading('模板拉取中···', ()=>{
                const downUrl = 'https://git.zhubajie.la/dongweixing/cvms-demo-x.git'; 
                log.info('--------------------------');
                log.info('> 开始拉取模板');
                Git.Clone(downUrl, "./template")
                    .then(function(repo) {
                        log.success('模板拉取完毕');
                        log.info('');
                    })
                    .catch(function(err) { log.error(err); });
            })

        });

    });
 
// 触发 --help 后打印一些信息
program.on('--help', () => {
    log.info('');
    log.info(`Run ${chalk.cyan("x-cli <command> --help")} for detailed usage of given command`);
    log.info('');
});
 
 
// 开始解析参数
program.parse(process.argv);