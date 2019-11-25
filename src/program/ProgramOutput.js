"use strict";
exports.__esModule = true;
var ProgramOutputStatus;
(function (ProgramOutputStatus) {
    ProgramOutputStatus[ProgramOutputStatus["SUCCESS"] = 0] = "SUCCESS";
    ProgramOutputStatus[ProgramOutputStatus["ERROR"] = 1] = "ERROR";
})(ProgramOutputStatus = exports.ProgramOutputStatus || (exports.ProgramOutputStatus = {}));
var ProgramOutput = /** @class */ (function () {
    function ProgramOutput(status, ast, symbolTable, errors) {
        this.status = status;
        this.ast = ast;
        this.symbolTable = symbolTable;
        this.errors = errors;
    }
    return ProgramOutput;
}());
exports["default"] = ProgramOutput;
