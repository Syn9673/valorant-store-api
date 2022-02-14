interface RiotHeader {
  Authorization?: string
  'X-Riot-Entitlements-JWT'?: string
  'X-Riot-ClientVersion'?: string
}

type RiotRegions = 'NA' | 'EU' | 'AP' | 'KO'

interface RiotWeaponSkin {
  name: string
  image: string
}

interface ClientOptions {
  username: string
  password: string
  region: RiotRegions

  // If true, this would return raw data from apis
  rawData?: boolean
}

interface GetStoreOptions {
  mode: 'bundle' | 'normal'
}

interface BundleData {
  name: string
  display: string
}

interface PlayerData {
  username: string
  tag: string
  fullIGN: string
}

interface PlayerBalance {
  vp: number
  rp: number
}

export {
  RiotHeader,
  RiotRegions,
  RiotWeaponSkin,
  
  ClientOptions,
  GetStoreOptions,

  BundleData,
  PlayerData,

  PlayerBalance
}