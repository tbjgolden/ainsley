/*! ainsley | MIT License | @tbjgolden | tom.bio */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var fs = _interopDefault(require('fs'));
var babelPluginMacros = require('babel-plugin-macros');
var JSON5 = _interopDefault(require('json5'));
var child_process = require('child_process');

const gen = (input, fn) => `
const main = async () => {
    console.log(JSON.stringify(await (${fn})(...${JSON.stringify(input)})));
}
main().catch(e => console.error(e));
`;
/**
 * doSync returns a synchronous version of certian
 * special asynchronous functions by extracting them
 * and running them as a synchronous node subprocess.
 *
 * The input and output types of the function must be serializible
 * to JSON, and the function must not reference any parent
 * scopes (i.e. file-defined variables) to function.
 */


const doSync = (fn, {
  maxBuffer = 2e9,
  ...etc
} = {} // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
) => (...ip) => {
  const proc = child_process.spawnSync('node', ['-'], {
    input: gen(ip, fn),
    maxBuffer,
    ...etc
  });
  const stderr = proc.stderr.toString('utf-8').trim();
  if (stderr) console.error(stderr);
  if (proc.error) throw proc.error;
  return JSON.parse(proc.stdout.toString('utf-8'));
};

const minifyAinsley = doSync(async (inputAinsley, dirName) => {
  const {
    flatten,
    minify // eslint-disable-next-line @typescript-eslint/no-var-requires

  } = require(dirName);

  const flatAinsley = await flatten(inputAinsley);
  return minify(flatAinsley);
});
var index = babelPluginMacros.createMacro(({
  references,
  state,
  babel
}) => {
  references.default.forEach(referencePath => {
    if (referencePath.parentPath.type === 'CallExpression') {
      try {
        if (state.file !== undefined && state.file !== null) {
          const dirPath = path.dirname(state.file.opts.filename);

          if (dirPath) {
            let args = referencePath.parentPath.get('arguments');
            if (!Array.isArray(args)) args = [args];

            if (args.length > 0) {
              const ainsley = fs.readFileSync(path.resolve(dirPath, args[0].evaluate().value), 'utf8');
              const ast = babel.parseSync(`const ainsley = ${JSON.stringify(minifyAinsley(JSON5.parse(ainsley), path.join(__dirname, '../..')))}`);

              if (ast !== null && ast.type === 'File') {
                const firstStatement = ast.program.body[0];

                if (firstStatement !== undefined) {
                  if (firstStatement.type === 'VariableDeclaration') {
                    const firstDeclaration = firstStatement.declarations[0];

                    if (firstDeclaration.init !== null) {
                      referencePath.parentPath.replaceWith(firstDeclaration.init);
                      return;
                    }
                  }
                }
              }
            }
          }
        }
      } catch (err) {
        throw err; //
      }

      throw new Error(`Error with ainsley/macro call`);
    }
  });
});

module.exports = index;
//# sourceMappingURL=index.js.map
