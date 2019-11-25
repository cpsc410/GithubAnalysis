"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Node_1 = require("./Node");
var ParserError_1 = require("../errors/ParserError");
var Tokens_1 = require("./Tokens");
var FileName_1 = require("../ast/FileName");
var FileNode = /** @class */ (function (_super) {
    __extends(FileNode, _super);
    function FileNode() {
        var _this = _super.call(this) || this;
        _this.expression = [Tokens_1["default"].ALL, Tokens_1["default"].THE, Tokens_1["default"].CODE, Tokens_1["default"].FILES];
        _this.file = new FileName_1["default"]();
        return _this;
    }
    FileNode.prototype.parse = function (context, symbolTable, topContributors, flags) {
        // let token = context.pop();
        var currentLine = context.getLine();
        //Check the beginning of the expression
        this.expressionCheck(context, symbolTable);
        var languageSpec = flags.getFlagLanguageSpec();
        //Adds all the file names and creates an empty map for the value
        while (!context.top().match(Tokens_1["default"].AUTHOR)) {
            var token = context.pop();
            if (token.match(Tokens_1["default"].IDENTIFIER)) {
                var innerMap = new Map();
                // let key  = token.substring(2);
                if (languageSpec.match("all")) {
                    symbolTable.set(token, innerMap);
                }
                else {
                    if (token.endsWith(languageSpec)) {
                        symbolTable.set(token, innerMap);
                    }
                }
            }
        }
    };
    FileNode.prototype.expressionCheck = function (context, symbolTable) {
        for (var _i = 0, _a = this.expression; _i < _a.length; _i++) {
            var exp = _a[_i];
            var token = context.pop();
            if (token === null) {
                throw new ParserError_1.ParserError("Invalid token at line ${currentLine}. Parser was expecting: [${exp}] and received: [${token}] instead");
            }
            if (!token.match(exp)) {
                throw new ParserError_1.ParserError("Invalid token at line ${currentLine}. Parser was expecting: [${exp}] and received: [${token}] instead");
            }
            // if (exp == Tokens.IDENTIFIER && token.match(Tokens.IDENTIFIER)) {
            //     let innerMap: Map<string, number> = new Map();
            //     token.substr(2);
            //     symbolTable.set(token, innerMap);
            // }
            // token = context.pop();
        }
    };
    FileNode.prototype.compile = function () { };
    return FileNode;
}(Node_1.Node));
exports["default"] = FileNode;
