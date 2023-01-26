import {readConfig} from '../../utils/config'
import {printValueMap} from '../../utils/cli'
import {Command} from '@oclif/core'

export default class Status extends Command {
  static description = 'Current Auth status of Elitool'

  static flags = {
    ...Command.flags,
  }

  requireSynced = false

  async run() {
    printValueMap(readConfig(this.config.configDir))
  }
}
