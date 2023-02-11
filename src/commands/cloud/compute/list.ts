import {Command, ux} from '@oclif/core'
import {readConfig, writeConfig} from '../../../utils/config'
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
    const config = readConfig(this.config.configDir)

    let projectId: string = (!config.cloudProjectId || config.cloudProjectId === 'null') ? '' : config.cloudProjectId
    if (!projectId) {
      projectId = await ux.prompt('Please input project-id')
    }

    this.log(`Compute list [${chalk.green(config.cloudProvider)} - ${chalk.green(config.cloudRegion)}]`)
    this.log(`Project ${chalk.green(projectId)}`)

    const instancesClient = new Compute.InstancesClient({
      projectId: projectId,
    })

    const aggListRequest = instancesClient.aggregatedListAsync({
      project: projectId,
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
          table.push([idx, chalk.green(instance.name), instance.machineType.match(/\/([^/]+)\/?$/)[1], instance.status])
        }
      }
    }

    this.log(table.toString())

    writeConfig(this.config.configDir, {
      cloudProvider: config.cloudProvider,
      cloudRegion: config.cloudRegion,
      cloudProjectId: projectId,
    })
  }
}
