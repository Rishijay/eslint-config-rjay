let exceptionFileName = ""
const modifierType = {
  functionType: `FunctionDeclaration`,
  variableType: `VariableDeclarator`,
  methodType: `MethodDefinition`,
  classProperty: `ClassProperty`,
  propertyDefinition: `PropertyDefinition`,
  classMethodType: `ClassMethod`,
  // expressionType: `CallExpression`,
}
const fs = require("fs")

module.exports = {
  schema: [
    {
      type: "object",
      properties: {
        exceptionFile: {
          type: "string",
        },
      },
      additionalProperties: false,
    },
  ],
  create(context) {
    const options = Object.assign({}, context.options[context.options.length - 1])
    exceptionFileName = options.exceptionFile || null
    return {
      Identifier(node) {
        if (!node || !node.parent || !node.parent.type) {
          return
        }
        let nameList = []
        //check if an exceptionlist file exists and if the filename is valid
        if (exceptionFileName && exceptionFileName.length > 0) {
          try {
            nameList = fs.readFileSync(exceptionFileName, "utf8").split("\r\n")
          } catch (e) {}
        }
        let flag = false
        // const variableName = context.getSourceCode().getText(node);
        const variableName = node.name
        const fileName = context.getFilename().split("\\")[context.getFilename().split("\\").length - 1].split(".")
        //check if the variablename exists in the exceptionlist file
        if (nameList.length > 0) {
          nameList.forEach(function compare(i, set) {
            if (variableName.toString() === i.toString()) {
              flag = true
            }
          })
        }
        //checks only if the variablename is not in the exceptionlist file
        if (!flag) {
          //checks if the variablename is associated with a method or a function
          if (
            node.parent.type.toString() === modifierType.functionType ||
            node.parent.type.toString() === modifierType.methodType
            //|| node.parent.type.toString() === modifierType.expressionType
          ) {
            //checks if the filename and the variablename match and if the file extension is .jsx -> component
            if (fileName[0].toLowerCase() === variableName.toLowerCase() && fileName[1].toLowerCase() === "jsx") {
              //checks if the componentname is in pascal case
              if (!/^[A-Z][a-z0-9]*(?:[A-Z][a-z0-9]+)*[A-Z]?$/.test(variableName)) {
                context.report({
                  node,
                  message: `'{{name}}' is not in pascal case.`,
                  data: { name: node.name },
                })
              }
            }
            //checks if the functionname is in camel case
            else if (!/^[a-z][a-z0-9]*(?:[A-Z][a-z0-9]+)*[A-Z]?$/s.test(variableName)) {
              if (
                (node.parent.type.toString() === modifierType.methodType &&
                  node.parent.parent.parent.id.name !== node.name) ||
                node.parent.type.toString() !== modifierType.methodType
              ) {
                context.report({
                  node,
                  message: `'{{name}}' is not in camel case.`,
                  data: { name: node.name },
                })
              }
            }
          }
          //checks if the variablename is associated with a variable or a property
          else if (
            node.parent.type.toString() === modifierType.variableType ||
            node.parent.type.toString() === modifierType.propertyDefinition
          ) {
            //checks if the filename and the variablename match and if the file extension is .jsx -> component
            if (fileName[0].toLowerCase() === variableName.toLowerCase() && fileName[1].toLowerCase() === "jsx") {
              //checks if the componentname is in pascal case
              if (!/^[A-Z][a-z0-9]*(?:[A-Z][a-z0-9]+)*[A-Z]?$/.test(variableName)) {
                context.report({
                  node,
                  message: `'{{name}}' is not in pascal case.`,
                  data: { name: node.name },
                })
              }
            }
            //checks if the variablename is in camel case
            else if (!/^[a-z][a-z0-9]*(?:[A-Z][a-z0-9]+)*[A-Z]?$/.test(variableName)) {
              context.report({
                node,
                message: `Variable name '{{name}}' is not in camel case.`,
                data: { name: node.name },
              })
            }
          }
        }
      },
    }
  },
}
