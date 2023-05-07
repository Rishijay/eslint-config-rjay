module.exports = {
  create(context) {
    return {
      Program(node) {
        const fileName = context.getFilename().split("\\")[context.getFilename().split("\\").length - 1].split(".")

        //if file extension is .js then camel case
        if (fileName[1] === "js") {
          if (!/^[a-z][a-z0-9]*(?:[A-Z][a-z0-9]+)*[A-Z]?$/.test(fileName[0])) {
            context.report({
              node,
              message: "Filename `{{name}}` not in camel case",
              data: { name: fileName[0] },
            })
          }
        }
        //if file extension is .jsx then pascal case
        else if (fileName[1] === "jsx") {
          if (!/^[A-Z][a-z0-9]*(?:[A-Z][a-z0-9]+)*[A-Z]?$/.test(fileName[0])) {
            context.report({
              node,
              message: "Filename `{{name}}` not in pascal case",
              data: { name: fileName[0] },
            })
          }
        }
      },
    }
  },
}
