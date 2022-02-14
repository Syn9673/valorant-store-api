import { URL } from 'url'

import * as Constants from './utils/Constants'
import Http from './utils/Http'

import { RiotHeader } from './utils/Types'

export default class Auth {
  // create a new http session per auth
  public http = new Http()

  // Internal data
  public _headers: RiotHeader = {}

  public _country           = ''
  public _entitlementsToken = ''
  public _version           = ''
  public _userPuuid         = ''

  constructor(
    public username: string,
    public password: string,
    public region: string
  ) {
    if (typeof this.region === 'string')
      this.region = this.region.toLowerCase()
  }

  private async _clientCountry() {
    const payload = {
      'client_id': 'play-valorant-web-prod',
      nonce: 1,
      'redirect_uri': 'https://playvalorant.com/opt_in',
      'response_type': 'token id_token'
    }

    const { status, data } = await this.http.client.post(
      Constants.Urls.Auth,
      payload
    )

    if (status !== 200)
      return false

    this._country = data.country ?? ''
    
    return data != null
  }

  private async _accessToken() {
    const payload = {
      type: 'auth',
      username: this.username,
      password: this.password
    }

    const {
      data,
      status
    } = await this.http.client.put(
      Constants.Urls.Auth,
      payload
    )

    if (status !== 200)
      return false

    const uri = new URL(
      data.response.parameters.uri.replace(/#/g, '?')
    )
    
    const accessToken = uri.searchParams.get('access_token')
    const tokenType   = uri.searchParams.get('token_type')

    this._headers.Authorization = `${tokenType} ${accessToken}`
    
    return accessToken != null
  }

  private async _entitlements() {
    const {
      data,
      status
    } = await this.http.client.post(
      Constants.Urls.Entitlements,
      {},
      {
        headers: this._headers as any
      }
    )

    if (status !== 200)
      return false

    this._entitlementsToken                  = data.entitlements_token
    this._headers['X-Riot-Entitlements-JWT'] = this._entitlementsToken

    return this._entitlementsToken == null
  }

  private async _clientVersion() {
    const {
      data: body,
      status
    } = await this.http.client.get(Constants.Urls.Version)

    if (status !== 200)
      return false

    this._version                         = body.data.riotClientVersion
    this._headers['X-Riot-ClientVersion'] = this._version

    return body.data.riotClientVersion !== null
  }

  public async _userInfo() {
    const { status, data } = await this.http.client.post(
      Constants.Urls.UserInfo,
      {},
      {
        headers: this._headers as any
      }
    )

    if (status !== 200)
      return false

    this._userPuuid = data.sub
    return data.sub != null
  }

  public async authenticate() {
    await this._clientCountry()
    await this._accessToken()
    await this._entitlements()
    await this._clientVersion()
    await this._userInfo()
  }
}