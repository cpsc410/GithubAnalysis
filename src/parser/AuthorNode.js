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
var Author_1 = require("../ast/Author");
var AuthorNode = /** @class */ (function (_super) {
    __extends(AuthorNode, _super);
    function AuthorNode() {
        var _this = _super.call(this) || this;
        _this.expression = [Tokens_1["default"].AUTHOR, Tokens_1["default"].IDENTIFIER];
        _this.author = new Author_1["default"]();
        return _this;
    }
    AuthorNode.prototype.parse = function (context, symbolTable, topContributors, flags) {
        var currentLine = context.getLine();
        //Check the beginning of the expression
        this.expressionCheck(context);
        var netEffect = flags.getFlagNetEffect();
        //Count keeps track of which token is being processed added, delete, or file name
        var count = 0;
        //Added is the amount of lines added to that file, count == 0
        var added = 0;
        //Deleted is the amount of lines deleted to that file, count == 1
        var deleted = 0;
        while (!context.top().match(Tokens_1["default"].TOTAL)) {
            var token = context.pop();
            if (count == 0) {
                added += parseInt(token);
            }
            else if (count == 1) {
                deleted += parseInt(token);
            }
            else {
                if (token.match(Tokens_1["default"].IDENTIFIER)) {
                    if (!symbolTable.has(token)) {
                        if (context.top().match("=>")) {
                            context.pop();
                            context.pop();
                        }
                        count = 0;
                        added = 0;
                        deleted = 0;
                        continue;
                    }
                    var map = symbolTable.get(token);
                    //Configuration option handling
                    var operator = void 0;
                    if (netEffect.match("added")) {
                        operator = added;
                    }
                    else if (netEffect.match("deleted")) {
                        operator = deleted;
                    }
                    else if (netEffect.match("sum")) {
                        operator = added + deleted;
                    }
                    if (map.has(this.author.name)) {
                        var curr = map.get(this.author.name);
                        curr += operator;
                        map.set(this.author.name, curr);
                    }
                    else {
                        if (topContributors.has(this.author.name)) {
                            map.set(this.author.name, operator);
                        }
                    }
                }
            }
            if (count == 2) {
                count = 0;
                added = 0;
                deleted = 0;
            }
            else {
                count++;
            }
        }
        //This gets rid of Total # # in the txt, subject to change depending on analysis
        context.pop();
        if (!context.top().match(Tokens_1["default"].AUTHOR)) {
            context.pop();
            context.pop();
        }
    };
    AuthorNode.prototype.expressionCheck = function (context) {
        for (var _i = 0, _a = this.expression; _i < _a.length; _i++) {
            var exp = _a[_i];
            var token = context.pop();
            if (token === null) {
                throw new ParserError_1.ParserError("Invalid token at line ${currentLine}. Parser was expecting: [${exp}] and received: [${token}] instead");
            }
            if (!token.match(exp)) {
                throw new ParserError_1.ParserError("Invalid token at line ${currentLine}. Parser was expecting: [${exp}] and received: [${token}] instead");
            }
            if (exp == Tokens_1["default"].IDENTIFIER && token.match(Tokens_1["default"].IDENTIFIER)) {
                this.author.name = token;
            }
        }
    };
    AuthorNode.prototype.compile = function () {
        // let writer = OutputWriter.getWriter();
        // writer.write(this.edge.toDigraph());
    };
    return AuthorNode;
}(Node_1.Node));
exports["default"] = AuthorNode;
