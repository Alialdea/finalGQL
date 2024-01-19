import {Contacto} from "../types.ts"
import {ContactoModelType,ContactoModel } from "../db/dbContacto.ts"
import { GraphQLError } from "graphql";

export const Query = {
    getContact:async (_:unknown, args:{id:string}):Promise<ContactoModelType> => {
        
        const contacto = await ContactoModel.findById(args.id).exec()
        if (!contacto) throw new GraphQLError("nse ha encontrao a nadie con esa id")
        return contacto
    },
    getContacts:async (): Promise<Array<ContactoModelType>> => {
        const contactos=await ContactoModel.find({}).exec()
        return contactos
    }
};