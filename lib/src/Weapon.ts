import { RiotWeaponSkin } from './utils/Types'
import skinLevels from '../data/skinlevels.json'

export default class Weapon {
  constructor() {}

  public static getSkinByLevelUuid(uuid: string) {
    const item = skinLevels.data.find((skin) => skin.uuid === uuid) ?? null

    const itemInfo: RiotWeaponSkin = {
      name: item?.displayName ?? '',
      image: item?.displayIcon ?? ''
    }

    return itemInfo
  }
}