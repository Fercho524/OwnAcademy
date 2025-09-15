import { Server } from "./presentation/server"
import { envs } from "./config"

import { AppRoutes } from "./presentation/routes"
import { MongoDatabase } from "./data"

async function main() {

  await MongoDatabase.connect({
    mongoURL:`mongodb://${envs.DB_HOST}:${envs.DB_PORT}`,
    pass: envs.DB_PASSWORD!,
    user:envs.DB_USER!,
    dbName: envs.DB_NAME!
  })

  const srv = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
  })
  srv.start()
}

(()=>{ main() })()