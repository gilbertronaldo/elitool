import {Command} from '@oclif/core'
import schedulerApi from '../../api/scheduler-api'

export default class Add extends Command {
  static description = 'Scheduler Add'

  static examples = [
    '',
  ]

  static flags = {}

  static args = {}

  async run(): Promise<void> {
    // this.log('scheduler add')
    //
    // const {args} = await this.parse(Add)
    // const todo = args.todo
    // if (todo) {
    //   schedulerApi.add(todo)
    //   // this.log(`${chalk.green('[Success]')} Added new todo: ${todo}`)
    // } else {
    //   // this.error(chalk.red('please specify the new todo'))
    // }
  }
}
