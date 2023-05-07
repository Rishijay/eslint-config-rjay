const modifierType = {
  functionType: `FunctionDeclaration`,
  methodType: `MethodDefinition`,
  exportDefaultType: `ExportDefaultDeclaration`,
  exportNamedType: `ExportNamedDeclaration`,
  arrowFunctionType: `ArrowFunctionExpression`,
  variableType: `VariableDeclarator`,
  classMethod: `ClassMethod`,
}
const types = [`FunctionDeclaration`, `MethodDefinition`, `ClassMethod`]
module.exports = {
  create(context) {
    return {
      Identifier(node) {
        //check if any parameters exist
        let params = []
        if (node.parent.params) {
          paramElements = node.parent.params
          for (i = 0; i < paramElements.length; i++) {
            params.push(paramElements[i].name)
          }
        }
        // check if node is function/method/classMethod/arrowfunction
        if (
          node.parent.type.toString() === modifierType.functionType ||
          node.parent.type.toString() === modifierType.methodType ||
          node.parent.type.toString() === modifierType.classMethod ||
          (node.parent.type.toString() === modifierType.variableType &&
            node.parent.init !== null &&
            node.parent.init.type.toString() === modifierType.arrowFunctionType)
        ) {
          if (!params.includes(node.name.toString())) {
            // Function or const is not associated with export -> extract comments before the function declaration
            if (
              (types.includes(node.parent.type) &&
                node.parent.parent.type !== modifierType.exportDefaultType &&
                node.parent.parent.type !== modifierType.exportNamedType) ||
              (node.parent.parent.type === modifierType.variableType &&
                node.parent.parent.parent.type !== modifierType.exportDefaultType &&
                node.parent.parent.parent.type !== modifierType.exportNamedType)
            ) {
              const commentsList =
                context.getSourceCode().getCommentsBefore(node.parent).length !== 0
                  ? context.getSourceCode().getCommentsBefore(node.parent)
                  : context.getSourceCode().getCommentsBefore(node.parent.parent).length !== 0
                  ? context.getSourceCode().getCommentsBefore(node.parent.parent)
                  : []
              const commentLine = context.getSourceCode().getCommentsBefore(node.parent)[0]
                ? context.getSourceCode().getCommentsBefore(node.parent)[0].loc.start.line
                : context.getSourceCode().getCommentsBefore(node.parent.parent)[0]
                ? context.getSourceCode().getCommentsBefore(node.parent.parent)[0].loc.start.line
                : -1
              const functionLine = node.parent.loc.start.line
              //if comments are in the same line as the function declaration
              if (commentLine === functionLine && commentsList.length !== 0) {
                context.report({
                  node,
                  message: `Comments must be above the '{{name}}'`,
                  data: { name: node.parent.id ? node.parent.id.name : node.parent.key ? node.parent.key.name : "" },
                })
              }
              //if comments are not present or if comments are empty
              else if (
                (commentLine === -1 && commentsList.length === 0) ||
                (commentLine !== -1 && commentsList[0].value.trim() === "")
              ) {
                context.report({
                  node,
                  message: `Comments missing above the '{{name}}'`,
                  data: { name: node.parent.id ? node.parent.id.name : node.parent.key ? node.parent.key.name : "" },
                })
              }
            }
            //function is associated to export -> extract comments before the export statement
            else {
              const commentsList =
                context.getSourceCode().getCommentsBefore(node.parent.parent).length !== 0
                  ? context.getSourceCode().getCommentsBefore(node.parent.parent)
                  : context.getSourceCode().getCommentsBefore(node.parent.parent.parent).length !== 0
                  ? context.getSourceCode().getCommentsBefore(node.parent.parent.parent)
                  : []
              const commentLine = context.getSourceCode().getCommentsBefore(node.parent.parent)[0]
                ? context.getSourceCode().getCommentsBefore(node.parent.parent)[0].loc.start.line
                : context.getSourceCode().getCommentsBefore(node.parent.parent.parent)[0]
                ? context.getSourceCode().getCommentsBefore(node.parent.parent.parent)[0].loc.start.line
                : -1
              const functionLine = node.parent.loc.start.line
              //if comments are in the same line as the function declaration
              if (commentLine === functionLine && commentsList.length !== 0) {
                context.report({
                  node,
                  message: `Comments must be above the '{{name}}'`,
                  data: { name: node.parent.id ? node.parent.id.name : node.parent.key ? node.parent.key.name : "" },
                })
              }
              //if comments are not present or if comments are empty
              else if (
                (commentLine === -1 && commentsList.length === 0) ||
                (commentLine !== -1 && commentsList[0].value.trim() === "")
              ) {
                context.report({
                  node,
                  message: `Comments missing above the '{{name}}'`,
                  data: { name: node.parent.id ? node.parent.id.name : node.parent.key ? node.parent.key.name : "" },
                })
              }
            }
          }
        }
      },
    }
  },
}
