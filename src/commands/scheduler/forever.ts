import {Command} from '@oclif/core'

import {Agenda} from '@hokify/agenda'
import Start from "../cloud/compute/start";
import Stop from "../cloud/compute/stop";
import Snapshot from "../cloud/compute/snapshot";
import Resize from "../cloud/compute/resize";

const {ServerApiVersion} = require('mongodb')

export default class List extends Command {
  static description = 'Scheduler Forever'

  static examples = [
    '',
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    this.log('FOREVER')

    const mongoConnectionString = 'mongodb+srv://elitool-cluster.z9blta6.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority'
    const credentials = '/home/gilbert/src/elitery/elitool/X509-cert-8200828602976059425.pem'

    const agenda = new Agenda({
      db: {
        address: mongoConnectionString,
        collection: 'testDB',
        options: {
          sslKey: credentials,
          sslCert: credentials,
          serverApi: ServerApiVersion.v1,
          ssl: true,
        },
      },
    })

    agenda.define(
      'instance start',
      async job => {
        const {instanceId} = job.attrs.data
        console.log(instanceId)
        await job.remove()
      },
      {priority: 'high', concurrency: 1},
    )

    agenda.define(
      'instance start',
      async job => {
        const {instanceId} = job.attrs.data

        await Start.run([instanceId])
        await job.remove()
      },
      {priority: 'high', concurrency: 1},
    )

    agenda.define(
      'instance stop',
      async job => {
        const {instanceId} = job.attrs.data

        await Stop.run([instanceId])
        await job.remove()
      },
      {priority: 'high', concurrency: 1},
    )

    agenda.define(
      'instance snapshot',
      async job => {
        const {instanceId} = job.attrs.data

        await Snapshot.run([instanceId])
        await job.remove()
      },
      {priority: 'high', concurrency: 1},
    )

    agenda.define(
      'instance resize',
      async job => {
        const {instanceId, instanceSize} = job.attrs.data

        await Resize.run([instanceId, '-s', instanceSize])
        await job.remove()
      },
      {priority: 'high', concurrency: 1},
    )

    await agenda.start()
  }
}
