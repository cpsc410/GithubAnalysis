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
var TopContributors = /** @class */ (function (_super) {
    __extends(TopContributors, _super);
    function TopContributors() {
        var _this = _super.call(this) || this;
        _this.expression = [Tokens_1["default"].NUMBER, Tokens_1["default"].OF, Tokens_1["default"].COMMITS, Tokens_1["default"].FOR, Tokens_1["default"].EACH, Tokens_1["default"].OTHERAUTHOR];
        return _this;
    }
    TopContributors.prototype.parse = function (context, symbolTable, topContributors, flags) {
        //Check the beginning of the expression
        this.expressionCheck(context);
        var maxContributors = parseInt(flags.getFlagCommitCont());
        //Stop at maxContributors
        var countContributors = 0;
        //Count keeps track of which token is being processed added, delete, or file name
        var countForParsing = 0;
        //Added is the amount of lines added to that file, count == 0
        var added = 0;
        while (!context.top().match(Tokens_1["default"].ALL)) {
            var token = context.pop();
            if (countForParsing == 0) {
                added += parseInt(token);
                countForParsing++;
            }
            else {
                if (token.match(Tokens_1["default"].IDENTIFIER) && countContributors != maxContributors) {
                    topContributors.set(token, added);
                    countContributors++;
                }
                while (!context.top().match("([0-9]+)") && !context.top().match(Tokens_1["default"].ALL)) {
                    context.pop();
                }
                countForParsing = 0;
                added = 0;
            }
        }
    };
    TopContributors.prototype.expressionCheck = function (context) {
        for (var _i = 0, _a = this.expression; _i < _a.length; _i++) {
            var exp = _a[_i];
            var token = context.pop();
            if (token === null) {
                throw new ParserError_1.ParserError("Invalid token at line ${currentLine}. Parser was expecting: [${exp}] and received: [${token}] instead");
            }
            if (!token.match(exp)) {
                throw new ParserError_1.ParserError("Invalid token at line ${currentLine}. Parser was expecting: [${exp}] and received: [${token}] instead");
            }
        }
    };
    TopContributors.prototype.compile = function (symbolTable) {
    };
    return TopContributors;
}(Node_1.Node));
exports["default"] = TopContributors;
