import {Args, Command, ux} from '@oclif/core'
import {readConfig} from '../../../utils/config'
import * as Compute from '@google-cloud/compute'

export default class Stop extends Command {
  static description = 'Stop Intance'

  static examples = [
    '',
  ]

  static flags = {}

  static args = {
    instanceId: Args.string({
      name: 'instanceId',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const config = readConfig(this.config.configDir)

    const {args} = await this.parse(Stop)

    const instancesClient = new Compute.InstancesClient()

    ux.action.start('Instance stopping')
    const [response] = await instancesClient.stop({
      project: config.cloudProjectId,
      zone: config.cloudRegion,
      instance: args.instanceId,
    })

    let operation = response.latestResponse
    const operationsClient = new Compute.ZoneOperationsClient()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    while (operation.status !== 'DONE') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-await-in-loop
      [operation] = await operationsClient.wait({
        operation: operation.name,
        project: config.cloudProjectId,
        zone: config.cloudRegion,
      })
    }

    ux.action.stop('Instance stopped')
  }
}
