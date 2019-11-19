import {Node} from "./Node";
import Tokenizer from "./Tokenizer";
import {ParserError} from '../errors/ParserError';
import Tokens from "./Tokens";
import FileName from "../ast/FileName";
import SymbolTable from "./SymbolTable";
import MainNode from "./MainNode";

export default class FileNode extends Node {

    expression: string[] = [Tokens.ALL, Tokens.THE, Tokens.CODE, Tokens.FILES, Tokens.IDENTIFIER];

    file: FileName;

    constructor() {
        super();
        this.file = new FileName();
    }

    public parse(context: Tokenizer, symbolTable: SymbolTable) {
        // let token = context.pop();
        let currentLine = context.getLine();

        //Check the beginning of the expression
        this.expresionCheck(context, symbolTable);

        //Adds all the file names and creates an empty map for the value
        while(!context.top().match(Tokens.AUTHOR)){
            let token = context.pop();
            if (token.match(Tokens.IDENTIFIER)) {
                let innerMap: Map<string, number> = new Map();
                let key  = token.substring(2);
                symbolTable.set(key, innerMap);
            }
        }

    }


    private expresionCheck(context: Tokenizer, symbolTable: SymbolTable) {
        for (let exp of this.expression) {
            let token = context.pop();

            if (token === null) {
                throw new ParserError("Invalid token at line ${currentLine}. Parser was expecting: [${exp}] and received: [${token}] instead");
            }
            if (!token.match(exp)) {
                throw new ParserError("Invalid token at line ${currentLine}. Parser was expecting: [${exp}] and received: [${token}] instead");
            }

            if (exp == Tokens.IDENTIFIER && token.match(Tokens.IDENTIFIER)) {
                let innerMap: Map<string, number> = new Map();
                token.substr(2);
                symbolTable.set(token, innerMap);
            }
            // token = context.pop();
        }
    }

    public compile() {
//         let writer = OutputWriter.getWriter();
//         writer.write(this.edge.toDigraph());
    }
}