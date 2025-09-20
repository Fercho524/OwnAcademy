import { Server } from "./presentation/server"

import { AppRoutes } from "./presentation/routes"
import { MongoDatabase } from "./infraestructure/data"
import { enviroment } from "./config"

async function main() {

  await MongoDatabase.connect({
    mongoURL:`mongodb://${enviroment.dbHost}:${enviroment.dbPort}`,
    pass: enviroment.dbPassword!,
    user:enviroment.dbUser!,
    dbName: enviroment.dbName!
  })

  const srv = new Server({
    port: enviroment.port,
    routes: AppRoutes.routes
  })
  srv.start()
}

(()=>{ main() })()