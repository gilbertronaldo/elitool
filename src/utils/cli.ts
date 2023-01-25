import {CLIError} from '@oclif/errors'
import Table = require('cli-table')
import {cli} from 'cli-ux'
import chalk = require('chalk')

export function printValueMap(valueMap: Record<string, any>, color = chalk.yellowBright.bold) {
  console.log(
    Object.keys(valueMap)
    .map(key => color(`${key}: `) + valueMap[key])
    .join('\n'),
  )
}

export function printValueMap2(valueMap: Map<any, any>, color = chalk.yellowBright.bold) {
  for (const [key, value] of valueMap.entries()) console.log(color(`${key}: `) + value)
}

export function printVTable(valueMap: Record<string, any>) {
  const table = new Table()
  for (const key of Object.keys(valueMap)) {
    table.push({[key]: valueMap[key]})
  }

  console.log(table.toString())
}

export function failWith(msg: string): never {
  throw new CLIError(msg)
}

export async function binaryPrompt(promptMessage: string, defaultToNo?: boolean) {
  const resp: string = await cli.prompt(
    promptMessage + ` [y/yes, n/no${defaultToNo ? ' (default)' : ''}]`,
    {required: !defaultToNo},
  )
  return ['y', 'yes'].includes(resp.toLowerCase())
}
