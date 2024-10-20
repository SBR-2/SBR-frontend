import gql from 'graphql-tag';

export const GET_FICHAS_USUARIO = gql`
  query inspector {
    fichas(skip: null, take: null, where: {}, order: null) {
      items {
        fichaId
        inspectorId
        solicitud {
          fechaCreacion
          producto {
            nombre
            usuario {
              nombre
              correo
              entidad {
                nombre
                direccion
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_INSPECTORES = gql`
  query viewInspector {
  usuarios(where: { rolId: { eq: "3" } }) {
    items {
      usuarioId
      nombre
      estado
    }
  }
}
`;