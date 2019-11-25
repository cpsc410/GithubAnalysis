"use strict";
exports.__esModule = true;
var Node = /** @class */ (function () {
    // abstract configurations(languageSpec: string, commitContribution: string, enumNetEffect: string, fileContribution: string): string;
    function Node() {
        this.children = [];
    }
    Node.prototype.getChildren = function () {
        return this.children;
    };
    Node.prototype.setTargetPath = function (path) {
        this.target = path;
    };
    return Node;
}());
exports.Node = Node;
