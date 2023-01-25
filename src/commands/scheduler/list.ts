import {Command} from '@oclif/core'

import chalk = require('chalk')
import Table = require('cli-table');

export default class List extends Command {
  static description = 'Scheduler List'

  static examples = [
    '',
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    this.log('scheduler list')

    const table = new Table({
      head: [
        chalk.blueBright('index'),
        chalk.blueBright('cloud'),
        chalk.blueBright('service'),
        chalk.blueBright('projectId'),
        chalk.blueBright('instanceName'),
      ],
    })
    const schedulerList = [
      {
        cloud: 'gcp',
        service: 'compute',
        projectId: '1234',
        instanceName: 'instance-10',
      },
    ]
    for (const [i, schedule] of schedulerList.entries()) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      table.push([i + 1, schedule.cloud, schedule.service, schedule.projectId, chalk.green(schedule.projectId)])
    }

    this.log(table.toString())
  }
}
