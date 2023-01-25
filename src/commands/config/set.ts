import {Command, Flags} from '@oclif/core'
import {readConfig, writeConfig} from "../../utils/config";

export default class Set extends Command {
  static description = 'Configure Elitool config.json'

  static flags = {
    provider: Flags.string(),
    project_id: Flags.string(),
  }

  static examples = [
    'set --provider {{ aws | gcp }}',
    'set --project_id {{ PROJECT_ID }}',
  ]

  requireSynced = false

  async run() {
    const res = await this.parse(Set)
    const curr = readConfig(this.config.configDir)
    const cloudProvider = res.flags.provider ?? curr.cloudProvider
    const cloudProjectId = res.flags.project_id ?
      res.flags.project_id :
      curr.cloudProjectId
    writeConfig(this.config.configDir, {
      cloudProvider,
      cloudProjectId,
    })
  }
}
