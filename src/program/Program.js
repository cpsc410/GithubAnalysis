"use strict";
exports.__esModule = true;
var ProgramOutput_1 = require("./ProgramOutput");
var ProgramOutput_2 = require("./ProgramOutput");
var Tokenizer_1 = require("../parser/Tokenizer");
var SymbolTable_1 = require("../parser/SymbolTable");
var MainNode_1 = require("../parser/MainNode");
var Program = /** @class */ (function () {
    function Program(source, flag) {
        this.source = source;
        this.flags = flag;
    }
    Program.prototype.parse = function () {
        try {
            var ctx = new Tokenizer_1["default"](this.source);
            var node = new MainNode_1["default"]();
            this.symbolTable = new SymbolTable_1["default"]();
            this.topContributors = new Map();
            node.parse(ctx, this.symbolTable, this.topContributors, this.flags);
            this.ast = node.root();
            // this.symbolTable = new SymbolTable();
            // let visitor = new AstVisitor(this.ast);
            // visitor.addListener(this.symbolTable);
            // visitor.traverse();
            return new ProgramOutput_1["default"](ProgramOutput_2.ProgramOutputStatus.SUCCESS, this.ast, this.symbolTable, []);
        }
        catch (err) {
            return new ProgramOutput_1["default"](ProgramOutput_2.ProgramOutputStatus.ERROR, this.ast, this.symbolTable, []);
        }
    };
    Program.prototype.compile = function () {
        try {
            var parseOutput = this.parse();
            if (parseOutput.status == ProgramOutput_2.ProgramOutputStatus.ERROR) {
                parseOutput.errors.forEach(function (e) {
                    console.log(e.message);
                });
                return parseOutput;
            }
            this.ast.compile(this.symbolTable, this.flags);
            var output = new ProgramOutput_1["default"](ProgramOutput_2.ProgramOutputStatus.SUCCESS, this.ast, this.symbolTable, []);
            return output;
        }
        catch (err) {
            return new ProgramOutput_1["default"](ProgramOutput_2.ProgramOutputStatus.ERROR, this.ast, this.symbolTable, [err]);
        }
    };
    return Program;
}());
exports.Program = Program;
