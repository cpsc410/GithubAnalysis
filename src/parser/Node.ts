import Tokenizer from "./Tokenizer";
import SymbolTable from "./SymbolTable";
import {Flags} from "../program/Flags";

export abstract class Node {

    protected target: string;

    protected children: Array<Node>;

    abstract compile(symbolTable: SymbolTable, flags: Flags);

    abstract parse(context: Tokenizer, symbolTable: SymbolTable, topContributors: Map<string, number>, flags: Flags);

    // abstract configurations(languageSpec: string, commitContribution: string, enumNetEffect: string, fileContribution: string): string;

    constructor() {
        this.children = [];
    }

    public getChildren(): Array<Node> {
        return this.children;
    }

    setTargetPath(path: string) {
        this.target = path;
    }
}