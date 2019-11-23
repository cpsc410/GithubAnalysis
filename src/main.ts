#!/usr/bin/env node
import SymbolTable from "./parser/SymbolTable";
import MainNode from "./parser/MainNode";
import {Program} from "./program/Program";
const meow = require('meow');

const cli = meow(`
	Usage
	  $ ./main <input>

	Options
	  --languageSpec, -l  Choose language to view
	  --commitCont, -c Choose the number of top committers
	  --netEffect, -n Choose from: "added", "deleted" or "sum"
	  --fileCont, -f Choose the number of top contributors per file

`, {
    flags: {
        languageSpec: {
            type: 'string',
            alias: 'l'
        },
        commitCont: {
            type: 'string',
            default: '10',
            alias: 'c'
        },
        netEffect: {
            type: 'string',
            default: 'added',
            alias: 'n'
        },
        fileCont: {
            type: 'string',
            default: '10',
            alias: 'f'
        }
    }
});

let programInstance = new Program("valid/statsEverything.txt", cli.flags);
programInstance.parse();
programInstance.compile();
console.log(cli.flags);