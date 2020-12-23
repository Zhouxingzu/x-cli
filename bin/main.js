#!/usr/bin/env node
'use strict';
const program = require('commander');
const log = require('../lib/log');
const path = require('path');
const fs = require('fs');

// 版本
program
    .version(require('../package').version)
    .usage('<commnad [options]>')
    .option('-i, --init', '初始化项目依赖配置');
 
// 命令
program
    .command('init')
    .description('crate a new project')
    .action(() => {
        // 输入的 name
        log.info('-----------准备初始化-----------');
        let to = path.resolve('./');
        let filePath = to + '/test/a.txt';
        fs.open(filePath, 'a', (err, fd)=>{
            if(!err) {
                log.info('打开文件');
                fs.writeFile(fd, '现在时间是：' + Date.now(), (err)=>{
                    if(!err) {
                        log.success('写入成功');
                    }else{
                        throw err;
                    }
                });
                //关闭文件
                fs.close(fd, (err)=>{
                    if(!err) {
                        log.success('文件保存成功');
                    }else{
                        throw err;
                    }
                });
            } else {
                log.error(err);
            }
        });
    });
 
// 触发 --help 后打印一些信息
program.on('--help', () => {
    log.info();
    log.info('zhouxingzu');
});
 
 
// 开始解析参数
program.parse(process.argv);