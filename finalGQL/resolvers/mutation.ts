//import { argsToArgsConfig } from "graphql";
import { HostAddress } from "../../../AppData/Local/deno/npm/registry.npmjs.org/mongodb/6.2.0/mongodb.d.ts";
import {ContactoModelType,ContactoModel } from "../db/dbContacto.ts"
import { GraphQLError } from "graphql";

export const Mutation = {
    addContact:async(_:unknown,args:{nombre:string, apellido1:string, apellido2:string, ntelefono:string}):
    Promise<ContactoModelType>=>{
        const contacto= new ContactoModel({
            nombre: args.nombre,
            apellido1: args.apellido1,
            apellido2: args.apellido2,
            ntelefono:args.ntelefono,
            paisres:async(parent: ContactoModelType):Promise<string>=>{
                const BASE_URL= "https://api.api-ninjas.com/v1/validatephone?number="
                const API_KEY:any=Deno.env.get('API_KEY')
                
                const url=`$(BASE_URL)$(parent.ntelefono)`
                const data = await fetch(url,{
                    headers: { 'X-Api-Key': API_KEY},
                })
                const json=await data.json()
                return json.country
            },
            capital:async(parent: ContactoModelType):Promise<string>=>{
                const BASE_URL= "https://api.api-ninjas.com/v1/country?name="
                const API_KEY:any=Deno.env.get('API_KEY')
                
                const url=`$(BASE_URL)$(parent.paisres)`
                const data = await fetch(url,{
                    headers: { 'X-Api-Key': API_KEY},
                })
                const json=await data.json()
                return json.capital
            },
            hora:async(parent: ContactoModelType):Promise<string>=>{
                const BASE_URL= "https://api.api-ninjas.com/v1/worldtime?city="
                const API_KEY:any=Deno.env.get('API_KEY')
                
                const url=`$(BASE_URL)$(parent.capital)`
                const data = await fetch(url,{
                    headers: { 'X-Api-Key': API_KEY},
                })
                const json=await data.json()
                return json.datetime
            }
        
        })
        await contacto.save()
        return contacto
    },
    deleteContact:async(_:unknown,args:{id:string;}):Promise<string> => {
        
        const contactoborrado= await ContactoModel.findByIdAndDelete(args.id).exec()
        if(!contactoborrado){throw new GraphQLError("no se encuentra contacto kon ese id")}
        return "Contacto nottado con exito"
        
    },
    updateContact:async(_:unknown,args:{id:string, nombre:string, apellido1:string, apellido2:string, ntelefono:string}):
    Promise<ContactoModelType>=>{
        const contactoactualizar = await ContactoModel.findById(args.id).exec()
        if(!contactoactualizar){
            throw new Error ("no hay con esa id")
        }
        if (args.nombre) contactoactualizar.nombre=args.nombre
        if (args.apellido1) contactoactualizar.nombre=args.apellido1
        if (args.apellido2) contactoactualizar.nombre=args.apellido2
        if (args.ntelefono) contactoactualizar.nombre=args.ntelefono

        await contactoactualizar.save()
        return contactoactualizar
    }
};