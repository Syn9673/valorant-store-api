// This js file is used to copy the skinlevels.json files properly

const {
  writeFileSync,
  existsSync,
  mkdirSync
} = require('fs')

const skinLevels = JSON.stringify(
  require('../lib/data/skinlevels.json')
)

const dir = `${process.cwd()}/dist/data`
if (!existsSync(dir))
  mkdirSync(dir, { recursive: true })

console.log(dir)

writeFileSync(
  `${dir}/skinlevels.json`,
  skinLevels,
  {

  }
)