import jwt from "jsonwebtoken";
import { enviroment } from "../../config";


export class JwtAdapter {
    static async generateToken(payload: Object,duration:string):Promise<string|null>  {
        return new Promise((resolve)=>{
            
            jwt.sign(payload,enviroment.jwtSeed,{expiresIn: duration},(error:any,token:string)=>{
                if (error) return resolve(error)
                resolve(token)
            })          
        })
    }

    // EL poner el <T> hace que la función deba devolver forzosamente un dato de tipo t, o que deba operar con ese tipo de dato genérico
    static validateToken <T> (token:string) :Promise<T|null> {
        return new Promise((resolve)=>{
            jwt.verify(token,enviroment.jwtSeed,(err:any,decoded:any)=>{
                if (err) return  resolve(null)
                resolve(decoded as T) // Poner el as T por si acaso
            })
        })
    }
}