import {Command} from '@oclif/core'

export default class Resize extends Command {
  static description = 'Resize Instance'

  static examples = [
    '',
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    this.log('cloud compute resize')
  }
}
