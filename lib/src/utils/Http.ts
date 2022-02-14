import axios from 'axios'
import { wrapper } from 'axios-cookiejar-support'

import { CookieJar } from 'tough-cookie'

// Axios wrapper with cookie support
// This is made only for this project.
export default class Http {
  private jar    = new CookieJar()
  public client  = wrapper(
    axios.create(
      { jar: this.jar }
    )
  )

  constructor() {}
}