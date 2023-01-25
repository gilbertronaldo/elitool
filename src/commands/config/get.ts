import {readConfig} from '../../utils/config'
import {printValueMap} from '../../utils/cli'
import {Command} from '@oclif/core'

export default class Get extends Command {
  static description = 'Elitool configuration'

  static flags = {
    ...Command.flags,
  }

  requireSynced = false

  async run() {
    printValueMap(readConfig(this.config.configDir))
  }
}
