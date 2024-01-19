export const typeDefs = `#graphql
    type Contacto {
        id: ID!,
        nombre: String!,
        apellido1:  String!,
        apellido2:  String!,
        ntelefono:  String!, 
        paisres: String!,
        capital: String!
        hora:  String!
    }

    type Query {
        getContact(id:ID!): Contacto,
        getContacts():[Contacto]
    },

    type Mutation { 
        addContact(nombre:String!, apellido1: String!, 
        apellido2: String!, ntelefono: String!):String!,
        deleteContact(id:ID!):String!,
        updateContact(nombre:String, apellido1: String, 
        apellido2: String, ntelefono: String):String!
    }

`;