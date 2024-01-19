export const typeDefs = `#graphql
    type Contacto {
        id: ID!,
        nombre: String!,
        apellido1:  String!,
        apellido2:  String!,
        ntelefono:  String!, 
        paisres:  String!,
        hora:  String!
    }
    
    type Query {
        holaMundo: String!
    },

    type Mutation { 
        holaMundo: String!
    }

`;