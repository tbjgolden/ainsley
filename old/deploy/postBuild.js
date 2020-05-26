const fs = require('fs-extra')
const path = require('path')

const distRoot = path.join(__dirname, '../dist')

const postBuild = async () => {
  const dirs = await fs.readdir(distRoot)
  if (dirs.includes('types.d.ts')) {
    await fs.remove(path.join(distRoot, 'types.d.ts'))
  }
  if (dirs.includes('entrypoints')) {
    const entries = await fs.readdir(path.join(distRoot, 'entrypoints'))
    for (const entry of entries) {
      const input = path.join(distRoot, 'entrypoints', entry)
      const output = path.join(distRoot, entry)
      await fs.writeFile(
        output,
        (await fs.readFile(input, 'utf8')).replace(
          /export \* from "\.\.\//g,
          'export * from "./'
        )
      )
      await fs.remove(input)
    }
    await fs.remove(path.join(distRoot, 'entrypoints'))
  }
  if (dirs.includes('examples')) {
    await fs.remove(path.join(distRoot, 'examples'))
  }
  if (dirs.includes('repl')) {
    await fs.remove(path.join(distRoot, 'repl'))
  }
}

postBuild()
