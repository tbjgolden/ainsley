import path from 'path'
import fs from 'fs'
import { createMacro } from 'babel-plugin-macros'
import JSON5 from 'json5'
import { doSync } from './doSync'
import { Ainsley } from '..'

const minifyAinsley = doSync(async (inputAinsley, dirName) => {
  const {
    flatten,
    minify
    // eslint-disable-next-line @typescript-eslint/no-var-requires
  } = require(dirName as string)

  const flatAinsley = await flatten(inputAinsley as Ainsley)
  return minify(flatAinsley)
})

export default createMacro(({ references, state, babel }) => {
  references.default.forEach((referencePath) => {
    if (referencePath.parentPath.type === 'CallExpression') {
      try {
        if (state.file !== undefined && state.file !== null) {
          const dirPath = path.dirname(state.file.opts.filename as string)

          if (dirPath) {
            let args = referencePath.parentPath.get('arguments')
            if (!Array.isArray(args)) args = [args]

            if (args.length > 0) {
              const ainsley = fs.readFileSync(
                path.resolve(dirPath, args[0].evaluate().value),
                'utf8'
              )

              const ast = babel.parseSync(
                `const ainsley = ${JSON.stringify(
                  minifyAinsley(
                    JSON5.parse(ainsley),
                    path.join(__dirname, '../..')
                  )
                )}`
              )

              if (ast !== null && ast.type === 'File') {
                const firstStatement = ast.program.body[0]
                if (firstStatement !== undefined) {
                  if (firstStatement.type === 'VariableDeclaration') {
                    const firstDeclaration = firstStatement.declarations[0]

                    if (firstDeclaration.init !== null) {
                      referencePath.parentPath.replaceWith(
                        firstDeclaration.init
                      )
                      return
                    }
                  }
                }
              }
            }
          }
        }
      } catch (err) {
        throw err
        //
      }
      throw new Error(`Error with ainsley/macro call`)
    }
  })
})
