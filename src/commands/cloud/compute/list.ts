import {Command} from '@oclif/core'
import {readConfig} from '../../../utils/config'
import Table = require('cli-table');
import chalk = require('chalk')

const Compute = require('@google-cloud/compute')

export default class List extends Command {
  static description = 'Status Instances'

  static examples = [
    '',
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    this.log('cloud compute list')
    const config = readConfig(this.config.configDir)

    const instancesClient = new Compute.InstancesClient({
      projectId: config.cloudProjectId,
    })

    const aggListRequest = instancesClient.aggregatedListAsync({
      project: config.cloudProjectId,
      maxResults: 10,
    })

    const table = new Table({
      head: [
        chalk.blueBright('no'),
        chalk.blueBright('name'),
        chalk.blueBright('type'),
        chalk.blueBright('status'),
      ],
    })

    let idx = 0
    for await (const aggListRequestElement of aggListRequest) {
      const instances = aggListRequestElement[1].instances

      if (instances && instances.length > 0) {
        for (const instance of instances) {
          idx++
          table.push([idx, instance.name, instance.machineType.match(/\/([^/]+)\/?$/)[1], instance.status])
        }
      }
    }

    this.log(table.toString())
  }
}
