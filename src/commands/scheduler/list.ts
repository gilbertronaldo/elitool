import {Command} from '@oclif/core'

import chalk = require('chalk')
import Table = require('cli-table');
import {Agenda} from '@hokify/agenda'
import {ServerApiVersion} from 'mongodb'

export default class List extends Command {
  static description = 'Scheduler Status'

  static examples = [
    '',
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    this.log('scheduler status.ts')

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
      const jobs = await agenda.jobs()

      await agenda.stop()

      const table = new Table({
        head: [
          chalk.blueBright('index'),
          chalk.blueBright('name'),
          chalk.blueBright('service'),
          chalk.blueBright('projectId'),
          chalk.blueBright('instanceName'),
        ],
      })

      for (const [i, jobAgenda] of jobs.entries()) {
        const job = jobAgenda.toJson()
        table.push([i + 1, job.name, (job.data as any)?.to || '-', 'test', chalk.green('test')])
      }

      // console.log(table);

      this.log(table.toString())

      console.log('done')
      // eslint-disable-next-line no-process-exit,unicorn/no-process-exit
      process.exit(0)
    })
  }
}
