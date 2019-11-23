import {Node} from "./Node";
import Tokenizer from "../parser/Tokenizer";
import {ParserError} from '../errors/ParserError';
import Tokens from "./Tokens";
import Author from "../ast/Author";
import MainNode from "./MainNode";
import SymbolTable from "./SymbolTable";
import {Flags} from "../program/Flags";

export default class AuthorNode extends Node {

    expression: string[] = [Tokens.AUTHOR, Tokens.IDENTIFIER];

    author: Author;

    constructor() {
        super();
        this.author = new Author();
    }

    public parse(context: Tokenizer, symbolTable: SymbolTable, topContributors: Map<string, number>, flags: Flags) {
        let currentLine = context.getLine();

        //Check the beginning of the expression
        this.expressionCheck(context);

        //Count keeps track of which token is being processed added, delete, or file name
        let count: number = 0;
        //Added is the amount of lines added to that file, count == 0
        let added: number  = 0;
        //Deleted is the amount of lines deleted to that file, count == 1
        let deleted: number = 0;

        while(!context.top().match(Tokens.TOTAL)){
            let token = context.pop();
            if (count == 0){
                added += parseInt(token);
            } else if (count == 1){
                deleted += parseInt(token);
            } else {
                if (token.match(Tokens.IDENTIFIER)) {
                    if(!symbolTable.has(token)){
                        if(context.top().match("=>")){
                            context.pop();
                            context.pop();
                        }
                        count = 0;
                        added = 0;
                        deleted = 0;
                        continue;
                    }
                    let map = symbolTable.get(token);

                    if (map.has(this.author.name)){
                        let curr = map.get(this.author.name);
                        curr += added;
                        map.set(this.author.name, curr);
                    } else{
                        if(topContributors.has(this.author.name)){
                            map.set(this.author.name, added);
                        }
                    }
                }
            }

            if (count == 2){
                count = 0;
                added = 0;
                deleted = 0;
            } else {
                count++;
            }
        }

        //This gets rid of Total # # in the txt, subject to change depending on analysis
        context.pop();
        if(!context.top().match(Tokens.AUTHOR)){
            context.pop();
            context.pop();
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

            if (exp == Tokens.IDENTIFIER && token.match(Tokens.IDENTIFIER)) {
                this.author.name = token;
            }
        }
    }

    public compile() {
        // let writer = OutputWriter.getWriter();
        // writer.write(this.edge.toDigraph());
    }

}