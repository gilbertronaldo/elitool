import {readConfig} from '../../utils/config'
import {printValueMap} from '../../utils/cli'
import {Command, Flags} from '@oclif/core'
import * as path from 'node:path'
import {GoogleAuth} from "google-auth-library";

export default class Login extends Command {
  static description = 'Login Cloud Provider GCP / AWS'

  static flags = {
    provider: Flags.string({
      char: 'p',
      options: ['gcp', 'aws'],
      description: 'Cloud Provider',
      required: true,
    }),
  }

  static examples = [
    `eli auth login -p gcp`,
  ]

  requireSynced = false

  async run() {
    const res = this.parse(Login)

    printValueMap(readConfig(this.config.configDir))


    const auth = new GoogleAuth({
      scopes: 'https://www.googleapis.com/auth/cloud-platform'
    });
    const client = await auth.getClient();
    const projectId = await auth.getProjectId();

    // gcloud auth application-default login
  }

}
