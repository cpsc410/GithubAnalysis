import {Node} from "./Node";
import Tokenizer from "../parser/Tokenizer";
import {ParserError} from '../errors/ParserError';
import Tokens from "./Tokens";
import MainNode from "./MainNode";
import SymbolTable from "./SymbolTable";
import Author from "../ast/Author";
import {Flags} from "../program/Flags";

export default class TopContributors extends Node {

    expression: string[] = [Tokens.NUMBER, Tokens.OF, Tokens.COMMITS, Tokens.FOR, Tokens.EACH, Tokens.OTHERAUTHOR];

    constructor() {
        super();
    }

    public parse(context: Tokenizer, symbolTable: SymbolTable, topContributors: Map<string, number>, flags: Flags) {
        //Check the beginning of the expression
        this.expressionCheck(context);


        let maxContributors = parseInt(flags.getFlagCommitCont());
        //Stop at maxContributors
        let countContributors = 0;
        //Count keeps track of which token is being processed added, delete, or file name
        let countForParsing: number = 0;
        //Added is the amount of lines added to that file, count == 0
        let added: number  = 0;

        while(!context.top().match(Tokens.ALL)){
            let token = context.pop();
            if (countForParsing == 0){
                added += parseInt(token);
                countForParsing++;
            } else {
                if (token.match(Tokens.IDENTIFIER) && countContributors != maxContributors) {
                    topContributors.set(token, added);
                    countContributors++;
                    }
                while (!context.top().match("([0-9]+)") && !context.top().match(Tokens.ALL)){
                    context.pop();
                }
                countForParsing = 0;
                added = 0;
                }
            }
        }



    private expressionCheck(context: Tokenizer) {
        for (let exp of this.expression) {
            let token = context.pop();
            if (token === null) {
                throw new ParserError("Invalid token at line ${currentLine}. Parser was expecting: [${exp}] and received: [${token}] instead");
            }
            if (!token.match(exp)) {
                throw new ParserError("Invalid token at line ${currentLine}. Parser was expecting: [${exp}] and received: [${token}] instead");
            }
        }
    }

    compile(symbolTable: SymbolTable) {
    }

}