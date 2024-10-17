import { gql } from "graphql-tag";

export const GET_USUARIOS = gql`
  query get {
    usuarios {
      items {
        usuarioId
        nombre
        correo
        entidad {
          nombre
        }
        rol {
          rol1
        }
        estado
        fechaCreacion
      }
    }
  }
`;

export const DELETE_USUARIO = gql`
  mutation EliminarUsuario($usuarioId: Int!) {
    deleteUsuario(input: { usuarioId: $usuarioId }) {
      usuario {
        correo
        entidadId
        estado
        fechaCreacion
        hash
        nombre
        rolId
        salt
        usuarioId
      }
    }
  }
`;
