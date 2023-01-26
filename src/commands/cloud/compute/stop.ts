import {Command} from '@oclif/core'

export default class Stop extends Command {
  static description = 'Stop Instance'

  static examples = [
    '',
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    this.log('cloud compute stop')
  }
}
