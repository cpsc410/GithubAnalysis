"use strict";
exports.__esModule = true;
var SymbolTable = /** @class */ (function () {
    function SymbolTable() {
        this.table = new Map();
    }
    SymbolTable.prototype.size = function () {
        return this.table.size;
    };
    SymbolTable.prototype.get = function (key) {
        return this.table.get(key);
    };
    SymbolTable.prototype.has = function (key) {
        return this.table.has(key);
    };
    SymbolTable.prototype.update = function (event, currentValue, lastValue) {
        // if (event === "node" && currentValue instanceof ShapeNode) {
        //     let shapeNode = currentValue;
        //     this.table.set(shapeNode.shape.name, currentValue);
        // }
    };
    SymbolTable.prototype.set = function (key, value) {
        this.table.set(key, value);
    };
    return SymbolTable;
}());
exports["default"] = SymbolTable;
