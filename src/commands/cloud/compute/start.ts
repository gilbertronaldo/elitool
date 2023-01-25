import {Command} from '@oclif/core'

export default class Start extends Command {
  static description = 'cloud compute start'

  static examples = [
    '',
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    this.log('cloud compute start')
  }
}
