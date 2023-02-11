<div align="center">

# elitool [![elitool][elitool]][elitool-url] [![NPM Package][npm]][npm-url] [![Build Size][build-size]][build-size-url] [![NPM Downloads][npm-downloads]][npmtrends-url] [![DeepScan][deepscan]][deepscan-url]

___

<img src="doc/elitery_logo.png" alt="elitery">

[![aws][aws]][aws-url] [![gcp][gcp]][gcp-url]


</div>

#### Elitery CLI tools
The aim of the project is to help Eliters managing compute resource in easy way.



[Usage](#usage) &mdash;
[Commands](#commands)



### Usage
___
<!-- usage -->
```sh-session
$ npm install -g elitool
$ elitool COMMAND
running command...
$ elitool (--version)
elitool/0.0.2 linux-x64 node-v18.13.0
$ elitool --help [COMMAND]
USAGE
  $ elitool COMMAND
...
```
<!-- usagestop -->

<br>

### Commands
___
<!-- commands -->
* [`elitool auth status`](#elitool-auth-status)
* [`elitool cloud compute list`](#elitool-cloud-compute-list)
* [`elitool cloud compute resize [INSTANCEID]`](#elitool-cloud-compute-resize-instanceid)
* [`elitool cloud compute snapshot [INSTANCEID]`](#elitool-cloud-compute-snapshot-instanceid)
* [`elitool cloud compute start [INSTANCEID]`](#elitool-cloud-compute-start-instanceid)
* [`elitool cloud compute stop [INSTANCEID]`](#elitool-cloud-compute-stop-instanceid)
* [`elitool cloud sql list`](#elitool-cloud-sql-list)
* [`elitool commands`](#elitool-commands)
* [`elitool config get`](#elitool-config-get)
* [`elitool config set`](#elitool-config-set)
* [`elitool help [COMMANDS]`](#elitool-help-commands)
* [`elitool scheduler add`](#elitool-scheduler-add)
* [`elitool scheduler forever`](#elitool-scheduler-forever)
* [`elitool scheduler list`](#elitool-scheduler-list)
* [`elitool scheduler remove`](#elitool-scheduler-remove)

## `elitool auth status`

Current Auth status of Elitool

```
USAGE
  $ elitool auth status

DESCRIPTION
  Current Auth status of Elitool
```

## `elitool cloud compute list`

Status Instances

```
USAGE
  $ elitool cloud compute list

DESCRIPTION
  Status Instances
```

## `elitool cloud compute resize [INSTANCEID]`

Resize Intance

```
USAGE
  $ elitool cloud compute resize [INSTANCEID] [-s <value>]

FLAGS
  -s, --instanceSize=<value>  Instance Size

DESCRIPTION
  Resize Intance
```

## `elitool cloud compute snapshot [INSTANCEID]`

Snapshot Instance

```
USAGE
  $ elitool cloud compute snapshot [INSTANCEID]

DESCRIPTION
  Snapshot Instance
```

## `elitool cloud compute start [INSTANCEID]`

Start Instance

```
USAGE
  $ elitool cloud compute start [INSTANCEID]

DESCRIPTION
  Start Instance
```

## `elitool cloud compute stop [INSTANCEID]`

Stop Intance

```
USAGE
  $ elitool cloud compute stop [INSTANCEID]

DESCRIPTION
  Stop Intance
```

## `elitool cloud sql list`

Status SQL Instances

```
USAGE
  $ elitool cloud sql list

DESCRIPTION
  Status SQL Instances
```

## `elitool commands`

list all the commands

```
USAGE
  $ elitool commands [--json] [-h] [--hidden] [--tree] [--columns <value> | -x] [--sort <value>] [--filter
    <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -h, --help         Show CLI help.
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --hidden           show hidden commands
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)
  --tree             show tree of commands

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  list all the commands
```

_See code: [@oclif/plugin-commands](https://github.com/oclif/plugin-commands/blob/v2.2.3/src/commands/commands.ts)_

## `elitool config get`

Elitool configuration

```
USAGE
  $ elitool config get

DESCRIPTION
  Elitool configuration
```

## `elitool config set`

Configure Elitool config.json

```
USAGE
  $ elitool config set [--provider <value>] [--project_id <value>] [--region <value>]

FLAGS
  --project_id=<value>
  --provider=<value>
  --region=<value>

DESCRIPTION
  Configure Elitool config.json

EXAMPLES
  set --provider {{ aws | gcp }}

  set --region {{ region }}

  set --project_id {{ PROJECT_ID }}
```

## `elitool help [COMMANDS]`

Display help for elitool.

```
USAGE
  $ elitool help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for elitool.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.1/src/commands/help.ts)_

## `elitool scheduler add`

Scheduler Add

```
USAGE
  $ elitool scheduler add

DESCRIPTION
  Scheduler Add
```

## `elitool scheduler forever`

Scheduler Forever

```
USAGE
  $ elitool scheduler forever

DESCRIPTION
  Scheduler Forever
```

## `elitool scheduler list`

Scheduler Status

```
USAGE
  $ elitool scheduler list

DESCRIPTION
  Scheduler Status
```

## `elitool scheduler remove`

Scheduler Remove

```
USAGE
  $ elitool scheduler remove

DESCRIPTION
  Scheduler Remove
```
<!-- commandsstop -->

<br/>
<br/>


[elitool]: https://img.shields.io/badge/cli-elitool-brightgreen
[elitool-url]: https://elitery.com
[aws]: https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white
[aws-url]: https://aws.amazon.com/
[gcp]: https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white
[gcp-url]: https://cloud.google.com/
[npm]: https://img.shields.io/npm/v/elitool?style=flat-square
[npm-url]: https://www.npmjs.com/package/elitool
[build-size]: https://badgen.net/bundlephobia/minzip/elitool
[build-size-url]: https://bundlephobia.com/result?p=elitool
[npm-downloads]: https://img.shields.io/jsdelivr/npm/hy/elitool
[npmtrends-url]: https://www.npmtrends.com/elitool
[deepscan]: https://deepscan.io/api/teams/20367/projects/23827/branches/727980/badge/grade.svg
[deepscan-url]: https://deepscan.io/dashboard#view=project&tid=20367&pid=23827&bid=727980
