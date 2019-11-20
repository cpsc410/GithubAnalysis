import {ParserError} from "../errors/ParserError";
import Tokens from "./Tokens";
import Tokenizer from "./Tokenizer";
import FileNode from "./FileNode";
import AuthorNode from "./AuthorNode";
import SymbolTable from "./SymbolTable";
import {Node} from "./Node";

export default class MainNode extends Node {


    constructor() {
        super();
    }

    public parse(context: Tokenizer, symbolTable: SymbolTable) {
        let nodes: Array<Node> = [];

        while (context.hasNext()) {
            let nextToken = context.top();
            switch (nextToken) {
                case Tokens.ALL:
                    let fileNode = new FileNode();
                    fileNode.parse(context, symbolTable);
                    nodes.push(fileNode);
                    break;
                case Tokens.AUTHOR:
                    let authorNode = new AuthorNode();
                    authorNode.parse(context, symbolTable);
                    nodes.push(authorNode);
                    break;
                default:
                    throw new ParserError("Unrecognizable token: ${nextToken}");
            }
        }
    }

    public compile(symbolTable: SymbolTable) {
        type jsonType = {
            name: string;
            contributors: Map<string,number>;
        }

        let jsonList : [jsonType];
        symbolTable.table.forEach((value: Map<string, number>, key: string) => {
            console.log(key, value);
            let json : jsonType = {
                "name" : key,
                "contributors" : value
            };
            console.log(json);
            // jsonList.push(json);

            // value.forEach((v: number, k: string) => {
            //     console.log(k, v);
            // });
        });
        // console.log(jsonList);
//
//      try {
//             let file = this.target;
//             let writer = OutputWriter.getInstance(file, 'utf-8');
//
//             writer.write("digraph G {\n");
//             this.children.forEach((node) => {
//                 node.compile()
//             });
//             writer.write("}");
//             writer.flush();
//         } catch (err) {
//             throw new CompileError(err.message);
//         }
//         return jsonList;
    }

    public root(): Node {
        return this;
    }

}