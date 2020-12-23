'use strict';
const chalk = require('chalk');
const logTypeList = [
    {
        'type': 'info',
        'color': 'gray'
    },
    {
        'type': 'error',
        'color': 'red'
    },
    {
        'type': 'success',
        'color': 'green',
        'icon': '✔'
    },
    {
        'type': 'trace',
        'color': 'dim'
    },
    {
        'type': 'debug',
        'color': 'bgBlack'
    },
    {
        'type': 'warn',
        'color': 'yellow',
        'icon': '!'
    },
    {
        'type': 'fatal',
        'color': 'bgRed',
        'icon': '✗'
    }
];

logTypeList.forEach(function(logType) {
    exports[logType.type] = function() {
        let args = Array.prototype.slice.call(arguments, 0);
        if(logType.icon) args = [logType.icon].concat(args);
        global.console.log(chalk[logType.color].apply(global.console, args));
    };
});