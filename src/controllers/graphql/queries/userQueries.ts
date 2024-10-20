import { gql } from "graphql-tag";

export const GET_USUARIOS = gql`
  query getUsuarios($skip: Int, $take: Int) {
    usuarios(skip: $skip, take: $take) {
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

export const GET_ESTADOS_FISICOS = gql`
  query estadoFisicos {
    estadoFisicos(skip: null, take: null, where: {}, order: null) {
      items {
        estadoFisicoId
        estadoFisico1
      }
    }
  }
`;
