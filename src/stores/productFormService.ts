import apolloClient from "../apolloClient"; // Asegúrate de ajustar la ruta
import gql from "graphql-tag";

const CREATE_PRODUCT = gql`
  mutation producto($input: AddProductoInput!) {
    addProducto(input: $input) {
      producto {
        usuarioId
      }
    }
  }
`;

const CREATE_PRODUCT_ENTIDAD = gql`
  mutation productoEntidad($input: AddEntidadInput!) {
    addEntidad(input: $input) {
      entidad {
        entidadId
      }
    }
  }
`;





