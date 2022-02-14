import { RiotRegions } from "./Types"

const Urls = {
  Auth: 'https://auth.riotgames.com/api/v1/authorization',
  Entitlements: 'https://entitlements.auth.riotgames.com/api/token/v1',
  UserInfo: 'https://auth.riotgames.com/userinfo',
  Version: 'https://valorant-api.com/v1/version',

  Region: (region: RiotRegions) => `https://pd.${region}.a.pvp.net/`,
  ValorantApi: 'https://valorant-api.com/v1'
}

const Currencies = {
  VP: '85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741',
  RP: 'e59aa87c-4cbf-517a-5983-6e81511be9b7'
}

export { 
  Urls,
  Currencies
}