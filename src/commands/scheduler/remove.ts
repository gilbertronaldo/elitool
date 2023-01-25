import {Command} from '@oclif/core'

export default class Remove extends Command {
  static description = 'Scheduler Remove'

  static examples = [
    '',
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    this.log('scheduler remove')
  }
}
