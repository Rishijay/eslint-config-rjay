module.exports = {
  create(context) {
    return {
      FunctionDeclaration(node) {
        const commentsList = context.getSourceCode().getCommentsBefore(node);
        const commentLine = context.getSourceCode().getCommentsBefore(node)[0]
          ? context.getSourceCode().getCommentsBefore(node)[0].loc.start.line
          : -1;
        const functionLine = node.loc.start.line;
        if (commentLine === functionLine && commentsList.length !== 0) {
          context.report({
            node,
            message: `Comments must be above the function '{{name}}'`,
            data: { name: node.id.name },
          });
        } else if (commentLine === -1 && commentsList.length === 0) {
          context.report({
            node,
            message: `Comments missing above the function '{{name}}'`,
            data: { name: node.id.name },
          });
        }
      },
    };
  },
};
