import {Command} from '@oclif/core'

export default class Stop extends Command {
  static description = 'cloud compute stop'

  static examples = [
    '',
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    this.log('cloud compute stop')
  }
}
