import gql from 'graphql-tag';

export const UPDATE_FICHA = gql`
mutation updateFicha($input: UpdateFichaInput!) {
  updateFicha(input: $input) {
    ficha {
      estado
      fichaId
      inspectorId
      inspector {
        estado
        nombre
      }
    }
  }
}
`;

export const CREAR_USUARIO_MUTATION = gql`
    mutation crearUsuario($input: AddUsuarioInput!) {
      addUsuario(input: $input) {
        usuario {
          usuarioId
          nombre
          correo
          entidadId
          estado
          rolId
          fechaCreacion
        }
      }
    }
  `;