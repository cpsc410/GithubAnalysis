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
var ParserError_1 = require("../errors/ParserError");
var Tokens_1 = require("./Tokens");
var FileNode_1 = require("./FileNode");
var AuthorNode_1 = require("./AuthorNode");
var Node_1 = require("./Node");
var fs = require("fs");
var TopContributors_1 = require("./TopContributors");
var MainNode = /** @class */ (function (_super) {
    __extends(MainNode, _super);
    function MainNode() {
        return _super.call(this) || this;
    }
    MainNode.prototype.parse = function (context, symbolTable, topContributors, flags) {
        var nodes = [];
        while (context.hasNext()) {
            var nextToken = context.top();
            switch (nextToken) {
                case Tokens_1["default"].ALL:
                    var fileNode = new FileNode_1["default"]();
                    fileNode.parse(context, symbolTable, topContributors, flags);
                    nodes.push(fileNode);
                    break;
                case Tokens_1["default"].AUTHOR:
                    var authorNode = new AuthorNode_1["default"]();
                    authorNode.parse(context, symbolTable, topContributors, flags);
                    nodes.push(authorNode);
                    break;
                case Tokens_1["default"].NUMBER:
                    var topContributorsNode = new TopContributors_1["default"]();
                    topContributorsNode.parse(context, symbolTable, topContributors, flags);
                    nodes.push(topContributorsNode);
                    break;
                default:
                    throw new ParserError_1.ParserError("Unrecognizable token: ${nextToken}");
            }
        }
        console.log(symbolTable);
    };
    MainNode.prototype.compile = function (symbolTable, flags) {
        var numFileCont = parseInt(flags.getFlagFileCont());
        console.log("Number of top contributors specified: " + numFileCont);
        var jsonList = [];
        symbolTable.table.forEach(function (value, key) {
            // console.log(key, value);
            var contributorsMap = value;
            var json = {
                fileName: key,
                contributors: JSON.stringify(Array.from(value.entries())),
                topContributors: []
            };
            // Sorts key, value pairs based on the values in descending order
            var sortDesFn = function (a, b) {
                return b[1] - a[1];
            };
            // Outputs the sorted key, value pairs
            var sortedContributors = Array.from(contributorsMap.entries()).sort(sortDesFn);
            // Adds the names of the sorted authors in topContributors list
            var cnt = 0;
            sortedContributors.forEach(function (value) {
                if (cnt < numFileCont) {
                    json.topContributors.push(value[0]);
                    cnt++;
                }
            });
            // console.log(json);
            jsonList.push(json);
        });
        console.log(jsonList);
        fs.writeFile("../resources/output/javaOut.json", JSON.stringify(jsonList), function (err) {
            if (err)
                throw err;
            console.log('\nThe list of all json objects has been saved in resources/output folder!');
        });
        return jsonList;
    };
    MainNode.prototype.root = function () {
        return this;
    };
    return MainNode;
}(Node_1.Node));
exports["default"] = MainNode;
