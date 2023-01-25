import * as fs from 'node:fs'
import * as path from 'node:path'
import * as os from 'node:os'

const dir = './config/elitool/'

const schedulerFile = path.join(os.homedir(), dir, 'scheduler.json')

interface Scheduler {
  done: boolean;
  todo: string;
}

class SchedulerApi {
  private todos : Scheduler[] = []

  constructor() {
    this.todos = JSON.parse(fs.readFileSync(schedulerFile, {encoding: 'utf-8'}))
  }

  private saveTodos() {
    // make folder for the first run
    if (!fs.existsSync(path.dirname(schedulerFile))) {
      fs.mkdirSync(path.dirname(schedulerFile))
    }

    const data = JSON.stringify(this.todos)
    fs.writeFileSync(schedulerFile, data, {encoding: 'utf-8'})
  }

  add(todo : string) {
    const newTodo : Scheduler = {done: false, todo}
    this.todos.push(newTodo)
    this.saveTodos()
  }

  remove(index : number) {
    this.todos.splice(index, 1)
    this.saveTodos()
  }

  list() {
    return this.todos
  }

  get(index : number) : Scheduler {
    return this.todos[index]
  }

  done(index : number) {
    this.todos[index].done = true
    this.saveTodos()
  }

  undone(index : number) {
    this.todos[index].done = false
    this.saveTodos()
  }
}

const api = new SchedulerApi()
export default api
