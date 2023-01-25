oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g elitool
$ elitool COMMAND
running command...
$ elitool (--version)
elitool/0.0.0 linux-x64 node-v18.13.0
$ elitool --help [COMMAND]
USAGE
  $ elitool COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`elitool hello PERSON`](#elitool-hello-person)
* [`elitool hello world`](#elitool-hello-world)
* [`elitool help [COMMANDS]`](#elitool-help-commands)
* [`elitool plugins`](#elitool-plugins)
* [`elitool plugins:install PLUGIN...`](#elitool-pluginsinstall-plugin)
* [`elitool plugins:inspect PLUGIN...`](#elitool-pluginsinspect-plugin)
* [`elitool plugins:install PLUGIN...`](#elitool-pluginsinstall-plugin-1)
* [`elitool plugins:link PLUGIN`](#elitool-pluginslink-plugin)
* [`elitool plugins:uninstall PLUGIN...`](#elitool-pluginsuninstall-plugin)
* [`elitool plugins:uninstall PLUGIN...`](#elitool-pluginsuninstall-plugin-1)
* [`elitool plugins:uninstall PLUGIN...`](#elitool-pluginsuninstall-plugin-2)
* [`elitool plugins update`](#elitool-plugins-update)

## `elitool hello PERSON`

Say hello

```
USAGE
  $ elitool hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/gilbertronaldo/elitool/blob/v0.0.0/dist/commands/hello/index.ts)_

## `elitool hello world`

Say hello world

```
USAGE
  $ elitool hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ elitool hello world
  hello world! (./src/commands/hello/world.ts)
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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.0/src/commands/help.ts)_

## `elitool plugins`

List installed plugins.

```
USAGE
  $ elitool plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ elitool plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.2.2/src/commands/plugins/index.ts)_

## `elitool plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ elitool plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ elitool plugins add

EXAMPLES
  $ elitool plugins:install myplugin 

  $ elitool plugins:install https://github.com/someuser/someplugin

  $ elitool plugins:install someuser/someplugin
```

## `elitool plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ elitool plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ elitool plugins:inspect myplugin
```

## `elitool plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ elitool plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ elitool plugins add

EXAMPLES
  $ elitool plugins:install myplugin 

  $ elitool plugins:install https://github.com/someuser/someplugin

  $ elitool plugins:install someuser/someplugin
```

## `elitool plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ elitool plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ elitool plugins:link myplugin
```

## `elitool plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ elitool plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ elitool plugins unlink
  $ elitool plugins remove
```

## `elitool plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ elitool plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ elitool plugins unlink
  $ elitool plugins remove
```

## `elitool plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ elitool plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ elitool plugins unlink
  $ elitool plugins remove
```

## `elitool plugins update`

Update installed plugins.

```
USAGE
  $ elitool plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
