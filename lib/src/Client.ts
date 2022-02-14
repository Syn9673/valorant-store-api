import Auth from './Auth'
import Player from './Player'

import { ClientOptions } from './utils/Types'

export default class Client {
  public player?: Player
  public auth?: Auth

  constructor(public options: ClientOptions) {}

  public async login() {
    this.player = await Player.login(
      this.options.username,
      this.options.password,
      this.options.region
    )

    this.player.setClient(this)
  }
}