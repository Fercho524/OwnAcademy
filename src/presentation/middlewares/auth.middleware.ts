import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";

export class AuthMiddleWare {
    static async validateJWT(req:Request,res:Response,next:NextFunction){
        const authorization = req.header("Authorization")

        if (!authorization) {return res.status(401).json({error:"No token provider"})}
        if (!authorization.startsWith("Bearer ")) {return res.status(401).json({error:"Incorrect token format"})}

        const token = authorization.split(" ").at(1) || '';
        const payload = await JwtAdapter.validateToken <{id:string}> (token)

        if (!payload) {return res.status(401).json({error:"Invalid token"})}


        try {
            // Todo lode los tipos genéricos sólo es para que podamos manejarlo más fácil
            console.log(payload.id)

            // Todo : Cambiar la búsqueda de usuario al repositorio, no usar directamente el userModel
            const user = await UserModel.findById(payload.id)

            if (!user) return res.status(401).json({error: "User not found"})

            if (!req.body) req.body={}
            req.body.token = token;
            req.body.payload = payload;
            req.body.user = user;

            next()
        } catch (error) {
            console.log(error)
            res.status(500).json({error:"Internal server error"})
        }    
    }

    
}