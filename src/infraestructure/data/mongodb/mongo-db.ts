import mongoose from "mongoose";

interface Options {
    mongoURL: string,
    dbName: string,
    pass: string,
    user: string
}

export class MongoDatabase {
    static async connect(options:Options){
        try {
            const {mongoURL,dbName,pass,user} = options;
            await mongoose.connect(mongoURL,{
                dbName: dbName,
                pass: pass,
                user: user
            })

            console.log("DB Connected")
        } catch (error) {
            console.log("DB Connection failed")
            throw error;
        }
    }
}