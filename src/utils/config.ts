// tslint:disable:class-name max-classes-per-file
// TODO: investigate tslint issues
import * as fs from 'fs-extra'
import * as path from 'node:path'

export interface ElitoolConfig {
  cloudProvider: string
  cloudProjectId: string
  cloudRegion: string
}

export const defaultConfig: ElitoolConfig = {
  cloudProvider: 'gcp',
  cloudProjectId: 'null',
  cloudRegion: 'asia-southeast2-a',
}

const configFile = 'config.json'

export function configPath(configDir: string) {
  return path.join(configDir, configFile)
}

export function readConfig(configDir: string): ElitoolConfig {
  if (fs.pathExistsSync(configPath(configDir))) {
    const existingConfig = fs.readJSONSync(configPath(configDir))
    const combinedConfig = {...defaultConfig, ...existingConfig}
    // eslint-disable-next-line no-prototype-builtins
    if (combinedConfig.hasOwnProperty('nodeUrl')) {
      combinedConfig.node = combinedConfig.nodeUrl
    }

    return combinedConfig
  }

  return defaultConfig
}

export function getCloudProvider(configDir: string): string {
  return readConfig(configDir).cloudProvider
}

export function getCloudProjectId(configDir: string): string {
  return readConfig(configDir).cloudProjectId
}

export function writeConfig(configDir: string, configObj: ElitoolConfig) {
  fs.outputJSONSync(configPath(configDir), configObj)
}
