"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var ParserError_1 = require("../errors/ParserError");
var Tokenizer = /** @class */ (function () {
    function Tokenizer(fileName) {
        try {
            this.program = fs.readFileSync(path.join(__dirname, "../../resources", fileName)).toString('utf-8');
        }
        catch (err) {
            throw new ParserError_1.ParserError("Unable to load source: ${filename}");
        }
        this.tokenize();
    }
    Tokenizer.prototype.tokenize = function () {
        this.tokens = this.program.split('\n\n').join(' NEW_LINE ').match(/\S+/g) || [];
        this.currentTokenIdx = 0;
        this.line = 1;
        this.column = 0;
    };
    Tokenizer.prototype.top = function () {
        if (this.currentTokenIdx < this.tokens.length) {
            // ignore blank lines
            while ("NEW_LINE" === this.tokens[this.currentTokenIdx]) {
                this.currentTokenIdx += 1;
                this.line += 1;
                this.column = 0;
            }
            return this.tokens[this.currentTokenIdx];
        }
        return null;
    };
    Tokenizer.prototype.pop = function () {
        if (this.top() != null) {
            var token = this.tokens[this.currentTokenIdx];
            this.currentTokenIdx += 1;
            this.column += 1;
            return token;
        }
        return null;
    };
    Tokenizer.prototype.hasNext = function () {
        return this.top() !== null;
    };
    Tokenizer.prototype.getLine = function () {
        return this.line;
    };
    return Tokenizer;
}());
exports["default"] = Tokenizer;
