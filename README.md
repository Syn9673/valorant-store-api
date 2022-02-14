# Valorant Store API
A simple promised-based API for the Valorant Store.

## Usage
```ts
import { Client } from 'valorant-store-api'

const client = new Client({
  username: 'user',
  password: 'pass123',
  region: 'AP'
})

client.login()
.then(async () => {
  console.log(await client.getStore()) // get our store data
  console.log(await client.getStore({ mode: 'bundle' })) // get the featured bundle
})
```

## Support Server
If you need help with the module, you can visit our support server [here](https://discord.gg/YpnfDxG5Vr)