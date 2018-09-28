import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = 'constructor parameters formatting does not match convention';

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
    }
}

class Walker extends Lint.RuleWalker {
    public visitConstructorDeclaration(node: ts.ConstructorDeclaration) {
        if (node.parameters.length) {
            let text = node.getText();
            const endIndex = text.indexOf(') {');
            text = text.slice(0, endIndex + 1).replace(/\r/g, '');
            const parts = text.split('\n');

            if (!this.isMultiLineDefinition(parts)) {
                this.addFailureAtNode(node, Rule.FAILURE_STRING);
            }
        }

        super.visitConstructorDeclaration(node);
    }

    private isMultiLineDefinition(parts: string[]): boolean {
        const lastIndex = parts.length - 1;

        if (parts[0] !== 'constructor(' || parts[lastIndex] !== '    )') {
            return false;
        }

        for (let i = 1; i < lastIndex; i++) {
            if (!parts[i].match(/^\s{8}/)) {
                return false;
            }
        }

        return true;
    }
}
