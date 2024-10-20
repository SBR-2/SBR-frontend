import gql from 'graphql-tag';

export const DELETE_PRODUCTO = gql`
  mutation DeleteProducto($input: DeleteProductoInput!) {
    deleteProducto(input: $input) {
      producto {
        productoId
        nombre
      }
    }
  }
`;

export const ADD_PRODUCTO = gql`
  mutation AddProducto($input: AddProductoInput!) {
    addProducto(input: $input) {
      producto {
        productoId
        nombre
        marca
        origen
        estado
        envasePrimario
        materialEmpaque
        riesgoSubcategoriaId
        estadoFisicoId
        nacional
        presentaciones
        unIngrediente
        productoEntidades {
          productoId
        }
      }
    }
  }
`;
