import chalk = require('chalk')

export function printValueMap(valueMap: Record<string, any>, color = chalk.yellowBright.bold) {
  console.log(
    Object.keys(valueMap)
    .map(key => color(`${key}: `) + valueMap[key])
    .join('\n'),
  )
}
