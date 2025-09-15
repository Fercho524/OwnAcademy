import express, { Router } from "express"


interface Options {
    port?:number,
    routes: Router
}

export class Server {
    public readonly app = express()
    public readonly port;
    public readonly routes:Router;

    constructor(options:Options){
        const {port,routes} = options;
        this.port = port;
        this.routes = routes;
    }

    async start(){ 
        // Middlewares
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))

        // Rutas
        this.app.use(this.routes)
        
        // Start
        this.app.listen(this.port,()=>{
            console.log("Running on port:" + this.port)
        })
    }
}