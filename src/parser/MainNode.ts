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
            fileName: string;
            contributors: Map<string,number>;
            topContributors: Array<string>;
        }

        let jsonList  = [];
        symbolTable.table.forEach((value: Map<string, number>, key: string) => {
            // console.log(key, value);

            let json : jsonType = {
                fileName : key,
                contributors : value,
                topContributors : []
            };

            // Sorts key, value pairs based on the values in descending order
            const sortDesFn = (a: [string, number], b: [string, number]) => {
                return b[1] - a[1];
            };

            // Outputs the sorted key, value pairs
            let sortedContributors = Array.from(json.contributors.entries()).sort(sortDesFn);

            // Adds the names of the sorted authors in topContributors list
            sortedContributors.forEach((value:[string, number]) => {
                json.topContributors.push(value[0]);

            });

            // console.log(json);
            jsonList.push(json);
        });

        console.log(jsonList);
        return jsonList;

    }

    public root(): Node {
        return this;
    }

}