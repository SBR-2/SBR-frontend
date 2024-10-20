import gql from 'graphql-tag';

export const GET_PRODUCTOS = gql`
  query GetProductos($skip: Int, $take: Int, $where: ProductoFilterInput, $order: [ProductoSortInput!]) {
    productos(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        productoId
        nombre
        marca
        origen
        estado
      }
    }
  }
`;

export const GET_SUBCATEGORIAS = gql`
    query bpmSubcategoria($skip: Int, $take: Int, $where: BpmSubcategoriumFilterInput, $order: [BpmSubcategoriumSortInput!]) {
        bpmSubcategoria(skip: $skip, take: $take, where: $where, order: $order) {
            items {
            bpmSubcategoriaId
            nombre
            estado
            }
        }
    }
`

export const GET_CATEGORIAS = gql`
    query bpmCategoria($skip: Int, $take: Int, $where: BpmCategoriumFilterInput, $order: [BpmCategoriumSortInput!]) {
        bpmCategoria(skip: $skip, take: $take, where: $where, order: $order) {
            items {
            bpmCategoriaId
            nombre
            estado
            }
        }
    }
`