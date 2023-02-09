import {Args, Command, Flags, ux} from '@oclif/core'
import {readConfig} from '../../../utils/config'
import * as Compute from '@google-cloud/compute'
import Listr = require('listr');
import chalk = require('chalk');
import {table} from '@oclif/core/lib/cli-ux/styled/table'

export default class Resize extends Command {
  static description = 'Resize Intance'

  static examples = [
    '',
  ]

  static flags = {
    instanceSize: Flags.string({
      char: 's',
      description: 'Instance Size',
      required: false,
    }),
  }

  static args = {
    instanceId: Args.string({
      name: 'instanceId',
      required: false,
    }),
  }

  async run(): Promise<void> {
    const config = readConfig(this.config.configDir)

    const {args, flags} = await this.parse(Resize)

    let disk

    let instanceId = args.instanceId
    if (!instanceId) {
      // just prompt for input
      instanceId = await ux.prompt('Please input instance name')
    }

    let instanceSize = flags.instanceSize
    if (!instanceSize) {
      // just prompt for input
      instanceSize = await ux.prompt('Please input instance size')
    }

    const instancesClient = new Compute.InstancesClient()

    const tasks = new Listr([
      {
        title: 'Instance stopping',
        task: async (ctx, task) => {
          try {
            const [response] = await instancesClient.stop({
              project: config.cloudProjectId,
              zone: config.cloudRegion,
              instance: instanceId,
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

            task.output = `Instance [${chalk.green(instanceId)}] successfully stopped.`
          } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (error?.code === 5) {
              ctx.instanceNotFound = true

              throw new Error(`${chalk.red('ERROR')} instance not found`)
            }
          }
        },
      },
      {
        title: 'Instance Snapshot',
        skip: ctx => ctx.instanceNotFound === true,
        task: async (ctx, task) => {
          try {
            const snapshotsClient = new Compute.SnapshotsClient()

            const disksClient = new Compute.DisksClient();
            [disk] = await disksClient.get({
              project: config.cloudProjectId,
              zone: config.cloudRegion,
              disk: instanceId,
            })

            const snapshotResource = {
              name: `${instanceId}-${new Date().toLocaleString('sv-SE').replace(/[\s:]/g, '-')}`,
              sourceDisk: disk.selfLink,
            }

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

            task.output = `Instance [${chalk.green(instanceId)}] successfully make a snapshot.`
          } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.log(error)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            throw error
          }
        },
      },
      {
        title: 'Instance Resizing',
        skip: ctx => ctx.instanceNotFound === true,
        task: async (ctx, task) => {
          try {
            const [response] = await instancesClient.setMachineType({
              project: config.cloudProjectId,
              zone: config.cloudRegion,
              instance: instanceId,
              instancesSetMachineTypeRequestResource: {
                machineType: `zones/${config.cloudRegion}/machineTypes/${instanceSize}`,
              },
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

            task.output = `Instance [${chalk.green(instanceId)}] successfully resized.`
          } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.log(error)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            throw error
          }
        },
      },
      {
        title: 'Instance Starting',
        skip: ctx => ctx.instanceNotFound === true,
        task: async (ctx, task) => {
          try {
            const [response] = await instancesClient.start({
              project: config.cloudProjectId,
              zone: config.cloudRegion,
              instance: instanceId,
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

            task.output = `Instance [${chalk.green(instanceId)}] successfully started.`
          } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.log(error)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            throw error
          }
        },
      },
    ])

    await tasks.run()

    this.log('Instance successfully resized.')
  }
}
