import IProgram from './IProgram';
import ProgramOutput from "./ProgramOutput";
import {ProgramOutputStatus} from "./ProgramOutput";
import Tokenizer from "../parser/Tokenizer";
import {Node} from "../parser/Node";
import SymbolTable from "../parser/SymbolTable";
import MainNode from "../parser/MainNode";

export class Program implements IProgram {

    source: string;
    ast: Node;
    symbolTable: SymbolTable;
    topContributors: Map<string, number>;
    flags: Object;

    constructor(source: string, flag: Object) {
        this.source = source;
        this.flags = flag;
    }

    public parse(): ProgramOutput {
        try {
            let ctx = new Tokenizer(this.source);
            let node = new MainNode();
            this.symbolTable = new SymbolTable();
            this.topContributors = new Map();
            node.parse(ctx, this.symbolTable, this.topContributors);
            this.ast = node.root();

            // this.symbolTable = new SymbolTable();

            // let visitor = new AstVisitor(this.ast);
            // visitor.addListener(this.symbolTable);
            // visitor.traverse();

            return new ProgramOutput(ProgramOutputStatus.SUCCESS, this.ast, this.symbolTable, []);
        } catch (err) {
            return new ProgramOutput(ProgramOutputStatus.ERROR, this.ast, this.symbolTable, []);
        }


    }

    public compile(): ProgramOutput {
        try {
            let parseOutput = this.parse();
            if (parseOutput.status == ProgramOutputStatus.ERROR) {
                parseOutput.errors.forEach((e) => {
                    console.log(e.message);
                });
                return parseOutput;
            }
            this.ast.compile(this.symbolTable);

            let output = new ProgramOutput(ProgramOutputStatus.SUCCESS, this.ast, this.symbolTable, []);

            return output;
        } catch (err) {
            return new ProgramOutput(ProgramOutputStatus.ERROR, this.ast, this.symbolTable, [err]);
        }
    }

}