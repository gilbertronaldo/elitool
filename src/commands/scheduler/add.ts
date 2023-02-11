import {Command, ux} from '@oclif/core'

import {Agenda} from '@hokify/agenda'

const {ServerApiVersion} = require('mongodb')

export default class List extends Command {
  static description = 'Scheduler Add'

  static examples = [
    '',
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    this.log('Scheduler Add')

    const jobNames = new Set(['instance stop', 'instance start', 'instance resize', 'instance snapshot'])
    let jobName = ''
    do {
      // eslint-disable-next-line no-await-in-loop
      jobName = await ux.prompt('Please input job name (instance [start|stop|resize|snapshot])')
    } while (!jobNames.has(jobName))

    const instanceId = await ux.prompt('Please input instance name')

    const scheduleAt = await ux.prompt('Please input schedule time')

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
    //

    agenda.on('ready', async () => {
      await agenda.schedule(scheduleAt, jobName, {instanceId: instanceId})
      // await agenda.every('2 seconds', 'send email report', {to: 'every 2 second@elitery.com'})

      await agenda.stop()

      console.log('done')
      // eslint-disable-next-line no-process-exit,unicorn/no-process-exit
      process.exit(0)
    })
  }
}
