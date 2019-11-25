#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var Program_1 = require("./program/Program");
var Flags_1 = require("./program/Flags");
var meow = require('meow');
var cli = meow("\n\tUsage\n\t  $ ./main <input>\n\n\tOptions\n\t  --languageSpec, -l  Choose language to view\n\t  --commitCont, -c Choose the number of top committers\n\t  --netEffect, -n Choose from: \"added\", \"deleted\" or \"sum\"\n\t  --fileCont, -f Choose the number of top contributors per file\n\n", {
    flags: {
        languageSpec: {
            type: 'string',
            "default": 'all',
            alias: 'l'
        },
        commitCont: {
            type: 'string',
            "default": '10',
            alias: 'c'
        },
        netEffect: {
            type: 'string',
            "default": 'added',
            alias: 'n'
        },
        fileCont: {
            type: 'string',
            "default": '10',
            alias: 'f'
        }
    }
});
var flagsInstance = new Flags_1.Flags(cli.flags.languageSpec, cli.flags.commitCont, cli.flags.netEffect, cli.flags.fileCont);
var programInstance = new Program_1.Program("valid/statsEverything.txt", flagsInstance);
programInstance.parse();
programInstance.compile();
// console.log(cli.flags);
// console.log(flagsInstance.getFlagLanguageSpec());
// console.log(flagsInstance.getFlagCommitCont());
// console.log(flagsInstance.getFlagNetEffect());
// console.log(flagsInstance.getFlagFileCont());
