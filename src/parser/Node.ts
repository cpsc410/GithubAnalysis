import Tokenizer from "./Tokenizer";
import SymbolTable from "./SymbolTable";

export abstract class Node {

    protected target: string;

    protected children: Array<Node>;

    abstract compile(symbolTable: SymbolTable);

    abstract parse(context: Tokenizer, symbolTable: SymbolTable);


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