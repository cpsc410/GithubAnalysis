"use strict";
exports.__esModule = true;
var Tokens = /** @class */ (function () {
    function Tokens() {
    }
    Tokens.ALL = "All";
    Tokens.THE = "the";
    Tokens.CODE = "code";
    Tokens.FILES = "files:";
    // public static SEMI = ":";
    Tokens.IDENTIFIER = "([_A-Za-z]+([A-Za-z0-9]*))+";
    Tokens.NUMBER = "Number";
    Tokens.OF = "of";
    Tokens.COMMITS = "commits";
    Tokens.FOR = "for";
    Tokens.EACH = "each";
    Tokens.OTHERAUTHOR = "author:";
    Tokens.AUTHOR = "Author:";
    Tokens.TOTAL = "Total:";
    Tokens.LIST = "list";
    return Tokens;
}());
exports["default"] = Tokens;
