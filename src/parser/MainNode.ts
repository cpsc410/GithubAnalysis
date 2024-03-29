import {ParserError} from "../errors/ParserError";
import Tokens from "./Tokens";
import Tokenizer from "./Tokenizer";
import FileNode from "./FileNode";
import AuthorNode from "./AuthorNode";
import SymbolTable from "./SymbolTable";
import {Node} from "./Node";
import * as fs from "fs";
import TopContributors from "./TopContributors";
import {Flags} from "../program/Flags";

export default class MainNode extends Node {

    constructor() {
        super();
    }

    public parse(context: Tokenizer, symbolTable: SymbolTable, topContributors: Map<string, number>, flags: Flags) {
        let nodes: Array<Node> = [];

        while (context.hasNext()) {
            let nextToken = context.top();
            switch (nextToken) {
                case Tokens.ALL:
                    let fileNode = new FileNode();
                    fileNode.parse(context, symbolTable, topContributors, flags);
                    nodes.push(fileNode);
                    break;
                case Tokens.AUTHOR:
                    let authorNode = new AuthorNode();
                    authorNode.parse(context, symbolTable, topContributors, flags);
                    nodes.push(authorNode);
                    break;
                case Tokens.NUMBER:
                    let topContributorsNode = new TopContributors();
                    topContributorsNode.parse(context, symbolTable, topContributors, flags);
                    nodes.push(topContributorsNode);
                    break;
                default:
                    throw new ParserError("Unrecognizable token: ${nextToken}");
            }
        }
        console.log(symbolTable);
    }

    public compile(symbolTable: SymbolTable, flags: Flags) {
        type jsonType = {
            fileName: string;
            contributors: string;
            topContributors: Array<string>;
        }

        let numFileCont : number = parseInt(flags.getFlagFileCont());
        console.log("Number of top contributors specified: " + numFileCont);
        let jsonList  = [];
        symbolTable.table.forEach((value: Map<string, number>, key: string) => {
            // console.log(key, value);
            let contributorsMap = value;
            let json : jsonType = {
                fileName : key,
                contributors : JSON.stringify(Array.from(value.entries())),
                topContributors : []
            };

            // Sorts key, value pairs based on the values in descending order
            const sortDesFn = (a: [string, number], b: [string, number]) => {
                return b[1] - a[1];
            };

            // Outputs the sorted key, value pairs
            let sortedContributors = Array.from(contributorsMap.entries()).sort(sortDesFn);


            // Adds the names of the sorted authors in topContributors list
            let cnt = 0;
            sortedContributors.forEach((value:[string, number]) => {
                if (cnt < numFileCont) {
                    json.topContributors.push(value[0]);
                    cnt++;
                }
            });

            // console.log(json);
            jsonList.push(json);
        });

        console.log(jsonList);

        fs.writeFile ("../resources/output/javaOut.json", JSON.stringify(jsonList), function(err) {
                if (err) throw err;
                console.log('\nThe list of all json objects has been saved in resources/output folder!');
            }
        );

        return jsonList;

    }

    public root(): Node {
        return this;
    }


}