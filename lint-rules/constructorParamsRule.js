"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = 'constructor parameters formatting does not match convention';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var Walker = /** @class */ (function (_super) {
    __extends(Walker, _super);
    function Walker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Walker.prototype.visitConstructorDeclaration = function (node) {
        if (node.parameters.length) {
            var text = node.getText();
            var endIndex = text.indexOf(') {');
            text = text.slice(0, endIndex + 1).replace(/\r/g, '');
            var parts = text.split('\n');
            if (!this.isMultiLineDefinition(parts)) {
                this.addFailureAtNode(node, Rule.FAILURE_STRING);
            }
        }
        _super.prototype.visitConstructorDeclaration.call(this, node);
    };
    Walker.prototype.isMultiLineDefinition = function (parts) {
        var lastIndex = parts.length - 1;
        if (parts[0] !== 'constructor(' || parts[lastIndex] !== '    )') {
            return false;
        }
        for (var i = 1; i < lastIndex; i++) {
            if (!parts[i].match(/^\s{8}/)) {
                return false;
            }
        }
        return true;
    };
    return Walker;
}(Lint.RuleWalker));
