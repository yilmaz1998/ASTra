import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";

const traverse = traverseModule.default;

const rules = [
  {
    name: "unused_variable",
    run(path, ctx) {
      if (path.node.id?.type !== "Identifier") return;

      const name = path.node.id.name;
      const binding = path.scope.getBinding(name);

      if (binding && !binding.referenced) {
        ctx.issues.push({
          type: "unused_variable",
          message: `'${name}' is declared but never used`,
          line: path.node.loc?.start.line || null
        });
      }
    }
  },

  {
    name: "console_usage",
    run(path, ctx) {
      const callee = path.node.callee;

      if (
        callee?.type === "MemberExpression" &&
        callee.object?.name === "console"
      ) {
        ctx.issues.push({
          type: "console_usage",
          message: `Avoid console.${callee.property.name} in production`,
          line: path.node.loc?.start.line || null
        });
      }
    }
  },

  {
    name: "long_function",
    run(path, ctx) {
      const source = path.getSource();
      const lines = source.split("\n").length;

      if (lines > 20) {
        ctx.issues.push({
          type: "long_function",
          message: "Function is too long (>20 lines)",
          line: path.node.loc?.start.line || null,
          length: lines
        });
      }
    }
  }
];

export function analyzeCode(code) {
  let ast;

  try {
    ast = parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
      errorRecovery: true
    });
  } catch (err) {
    return {
      success: false,
      error: err.message,
      issues: []
    };
  }

  const ctx = {
    issues: []
  };

  traverse(ast, {
    VariableDeclarator(path) {
      rules[0].run(path, ctx);
    },

    CallExpression(path) {
      rules[1].run(path, ctx);
    },

    Function(path) {
      rules[2].run(path, ctx);
    }
  });

  return {
    success: true,
    issues: ctx.issues,
    summary: {
      total: ctx.issues.length
    }
  };
}