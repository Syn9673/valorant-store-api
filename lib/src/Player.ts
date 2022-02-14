import Auth from './Auth'
import { BundleData, GetStoreOptions, PlayerBalance, PlayerData, RiotRegions, RiotWeaponSkin } from './utils/Types'

import * as Constants from './utils/Constants'
import Weapon from './Weapon'

import Client from './Client'

// Player class to authenticate around the Auth class
export default class Player {
  private _client?: Client

  constructor(
    public username: string,
    public password: string,
    public region: RiotRegions,
    private _auth: Auth
  ) {}

  public setClient(client: Client) {
    this._client = client
  }

  public getClient() {
    return this._client
  }

  public async getData() {
    const uri =
      Constants.Urls.Region(this.region) +
      '/name-service/v2/players'

    const { data } = await this._auth.http.client.put(
      uri,
      `["${this._auth._userPuuid}"]`,
      { headers: this._auth._headers as any }
    )

    if (this._client?.options.rawData)
      return data

    const user = data[0]
    const playerData: PlayerData = {
      username: user.GameName,
      tag: user.TagLine,
      fullIGN: `${user.GameName}#${user.TagLine}`
    }

    return playerData
  }

  public async getBalance() {
    const uri =
      Constants.Urls.Region(this.region) +
      '/store/v1/wallet/' +
      this._auth._userPuuid

    const { data } = await this._auth.http.client.get(
      uri,
      { headers: this._auth._headers as any }
    )

    if (this._client?.options.rawData)
      return data

    const playerBalance: PlayerBalance = {
      vp: data.Balances[Constants.Currencies.VP],
      rp: data.Balances[Constants.Currencies.RP]
    }

    return playerBalance
  }

  public async getStore(
    options: GetStoreOptions = {
      mode: 'normal'
    }
  ): Promise<RiotWeaponSkin[] | BundleData> {
    if (options.mode !== 'normal' && options.mode !== 'bundle')
      options.mode = 'normal'

    const uri =
      Constants.Urls.Region(this.region) +
      '/store/v2/storefront/' +
      this._auth._userPuuid

    const { data } = await this._auth.http.client.get(
      uri,
      { headers: this._auth._headers as any }
    )

    if (this._client?.options.rawData)
      return data

    // parse the items

    if (options.mode === 'normal') {
      // return all item names + their images
      const { SkinsPanelLayout: skins } = data
      const items = skins.SingleItemOffers

      const itemInfos: RiotWeaponSkin[] = []
      for (const item of items) {
        const weapon = await Weapon.getSkinByLevelUuid(item)
        if (!weapon) continue

        itemInfos.push(weapon)
      }

      return itemInfos
    } else {
      const { data: body } = await this._auth.http.client.get(
        Constants.Urls.ValorantApi +
          '/bundles/' +
          data.FeaturedBundle.Bundle.DataAssetID
      )

      const bundle: BundleData = {
        name: body.data.displayName,
        display: body.data.displayIcon
      }

      return bundle
    }
  }

  public static async login(
    username: string,
    password: string,
    region: RiotRegions
  ) {
    const auth = new Auth(username, password, region)
    await auth.authenticate()

    return new Player(
      username,
      password,
      region,
      auth
    )
  }
}