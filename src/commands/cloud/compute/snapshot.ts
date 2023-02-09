import {Args, Command, ux} from '@oclif/core'
import {readConfig} from '../../../utils/config'
import * as Compute from '@google-cloud/compute'
import chalk = require('chalk')

export default class Snapshot extends Command {
  static description = 'Snapshot Instance'

  static examples = [
    '',
  ]

  static flags = {}

  static args = {
    instanceId: Args.string({
      name: 'instanceId',
      required: false,
    }),
  }

  async run(): Promise<void> {
    const config = readConfig(this.config.configDir)

    const {args} = await this.parse(Snapshot)

    let instanceIds = args.instanceId
    if (!instanceIds) {
      // just prompt for input
      instanceIds = await ux.prompt('Please input instance name/s')
    }

    for (const instanceId of instanceIds.split(',')) {
      if (!instanceId) {
        continue
      }

      const snapshotsClient = new Compute.SnapshotsClient()

      let disk

      ux.action.start(`Instance [${chalk.green(instanceId)}] snapshot..`)
      try {
        const disksClient = new Compute.DisksClient();
        // eslint-disable-next-line no-await-in-loop
        [disk] = await disksClient.get({
          project: config.cloudProjectId,
          zone: config.cloudRegion,
          disk: instanceId,
        })

        const snapshotResource = {
          name: `${instanceId}-${new Date().toLocaleString('sv-SE').replace(/[\s:]/g, '-')}`,
          sourceDisk: disk.selfLink,
        }

        // eslint-disable-next-line no-await-in-loop
        const [response] = await snapshotsClient.insert({
          project: config.cloudProjectId,
          snapshotResource,
        })
        let operation = response.latestResponse
        const operationsClient = new Compute.GlobalOperationsClient()

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        while (operation.status !== 'DONE') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-await-in-loop
          [operation] = await operationsClient.wait({
            operation: operation.name,
            project: config.cloudProjectId,
          })
        }

        ux.action.stop()
        this.log(`Instance [${chalk.green(instanceId)}] successfully make a snapshot.`)
      } catch (error) {
        console.log(error)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (error?.code === 5) {
          ux.action.stop(`${chalk.red('ERROR')} instance not found`)
        }
      }
    }
  }
}
