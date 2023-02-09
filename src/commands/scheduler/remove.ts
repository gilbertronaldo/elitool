import {Command} from '@oclif/core'

import {Agenda} from '@hokify/agenda'

const {ServerApiVersion} = require('mongodb')

export default class List extends Command {
  static description = 'Scheduler Remove'

  static examples = [
    '',
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    try {
      this.log('REMOVE')

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

      agenda.on('ready', async () => {
        await agenda.cancel({
          name: 'send email report',
        })

        await agenda.stop()

        console.log('done')
        // eslint-disable-next-line no-process-exit,unicorn/no-process-exit
        process.exit(0)
      })

    } catch (error) {
      console.error(error)
    }
  }
}
