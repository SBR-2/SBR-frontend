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