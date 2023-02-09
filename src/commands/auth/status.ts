import {Command, ux} from '@oclif/core'
import {GoogleAuth} from 'google-auth-library'
import {fromSSO} from '@aws-sdk/credential-providers'
import chalk = require('chalk');

import {EC2Client, RebootInstancesCommand} from '@aws-sdk/client-ec2'

export default class Status extends Command {
  static description = 'Current Auth status of Elitool'

  static flags = {
    ...Command.flags,
  }

  requireSynced = false

  async run() {
    // printValueMap(readConfig(this.config.configDir))

    let cloudProvider = ''
    do {
      // eslint-disable-next-line no-await-in-loop
      cloudProvider = await ux.prompt('Please input provider [aws | gcp]')
    } while (cloudProvider !== 'aws' && cloudProvider !== 'gcp')

    if (cloudProvider === 'gcp') {
      try {
        const auth = new GoogleAuth({
          scopes: 'https://www.googleapis.com/auth/cloud-platform',
        })
        await auth.getClient()
        // const credentials = await client.credentials

        this.log(`${chalk.green('SUCCESS')} login on GCP`)

        // const projectId = await auth.getProjectId()
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (`${error}`.includes('Could not load the default credentials')) {
          this.log(`${chalk.red('ERROR please setup gcloud & run:')} ${chalk.green('gcloud auth application-default login')}`)
        }
      }
    } else if (cloudProvider === 'aws') {
      try {
        const client = new EC2Client({
          credentials: fromSSO({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ssoStartUrl: 'https://elitery.awsapps.com/start',
            ssoAccountId: '1234567890',
            ssoRegion: 'ap-southeast-1',
            ssoRoleName: 'SampleRole',
            ssoSession: '',
          }),
          region: 'ap-southeast-3',
        })

        const command = new RebootInstancesCommand({
          InstanceIds: ['i-0eb7dfecaa94f0ded'],
        })
        await client.send(command)

      } catch (error) {
        this.log(error as string)
      }
    } else {
      this.log(`${chalk.red('ERROR cloud provider not yet implemented!')}`)
    }
  }
}
