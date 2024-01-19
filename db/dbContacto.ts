import mongoose, {InferSchemaType} from "mongoose"

const Schema = mongoose.Schema
const ContactoSchema=new Schema({
    nombre: {type:String, required: true},
    apellido1: {type:String, required: true},
    apellido2: {type:String, required: true},
    ntelefono: {type:String, required: true},
    paisres: {type:String, required: true},
    hora: {type:String, required: true},
})
ContactoSchema.path("ntelefono").validate(function(ntelefono:string){
    if(/^+[^\s@]+$/.test(ntelefono)){return true}
    throw new Error('El telefono es incorrecto')
})

export type ContactoModelType=mongoose.Document & InferSchemaType<typeof ContactoSchema>
export const ContactoModel = mongoose.model<ContactoModelType>("Contacto",ContactoSchema)