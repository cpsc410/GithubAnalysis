#!/usr/bin/env node
import {Program} from "./program/Program";
import {Flags} from "./program/Flags";
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
            default: 'all',
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

let flagsInstance = new Flags(cli.flags.languageSpec, cli.flags.commitCont, cli.flags.netEffect, cli.flags.fileCont);
let programInstance = new Program("valid/statsEverything.txt", flagsInstance);
programInstance.parse();
programInstance.compile();
// console.log(cli.flags);
// console.log(flagsInstance.getFlagLanguageSpec());
// console.log(flagsInstance.getFlagCommitCont());
// console.log(flagsInstance.getFlagNetEffect());
// console.log(flagsInstance.getFlagFileCont());

