"use strict";
exports.__esModule = true;
var Flags = /** @class */ (function () {
    function Flags(l, c, n, f) {
        this.languageSpec = l;
        this.commitCont = c;
        this.netEffect = n;
        this.fileCont = f;
    }
    Flags.prototype.getFlagLanguageSpec = function () {
        return this.languageSpec;
    };
    Flags.prototype.getFlagCommitCont = function () {
        return this.commitCont;
    };
    Flags.prototype.getFlagNetEffect = function () {
        return this.netEffect;
    };
    Flags.prototype.getFlagFileCont = function () {
        return this.fileCont;
    };
    return Flags;
}());
exports.Flags = Flags;
