<template>
  <div class="container ">
      <div class="user-list-container">
          <h4 class="titulo d-flex ">Lista de Usuarios</h4>
          <!-- Barra de búsqueda -->
          <input
              type="text"
              v-model="searchTerm"
              placeholder="Buscar"
              class="search-bar"
          />
          <div class="d-flex mb-3">
              <router-link to="/crearUsuario">
                  <button class="btn btn-edit">Crear Usuario</button>
              </router-link>
                  

          </div>
          <table v-if="filteredUsers.length > 0">
              <thead>
                  <tr>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Entidad</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Fecha de Creación</th>
                      <th>Acciones</th>
                  </tr>
              </thead>
              <tbody>
                <tr v-for="usuario in filteredUsers" :key="usuario.usuarioId">
                      <td>{{ usuario.nombre }}</td>
                      <td>{{ usuario.correo }}</td>
                      <td>{{ usuario.entidad ? usuario.entidad.nombre : 'Sin entidad' }}</td>
                      <td>{{ usuario.rol ? usuario.rol.rol1 : 'Sin rol' }}</td>
                      <td>{{ usuario.estado == 'true' || usuario.estado === true ? 'activo' : 'inactivo' }}</td>
                      <td>{{ formatDate(usuario.fechaCreacion) }}</td>
                      <td class="acciones-cell">
                        <router-link :to="{name: 'editarUsuario', params: {userId: usuario.usuarioId}}">
                              <button class="btn btn-edit" >Editar</button>
                          </router-link>
                          <button class="btn btn-delete" @click="deleteUsuario(usuario)">Eliminar</button>
                      </td>
                  </tr>
              </tbody>
          </table>
          <p v-else-if="loading">Cargando...</p>
          <p v-else>No se han encontrado usuarios</p>
      </div>
      <PanelPrincipal />
  </div>
</template>

<script>
import PanelPrincipal from './panel-principal.vue';
import { ref, computed } from 'vue';
import { gql } from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { useToast } from 'vue-toastification';
import router from '../../router/router';

const GET_USUARIOS = gql`
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

const DELETE_USUARIO = gql`
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


export default {
  components: {
      PanelPrincipal,
  },
  setup() {
      const result = ref(null);
      const loading = ref(true);
      const error = ref(null);
      const toast = useToast();
      const searchTerm = ref('');

      // Fetch usuarios
      const { onResult, onError, refetch } = useQuery(GET_USUARIOS);

      onResult((response) => {
          loading.value = false;
          result.value = response.data?.usuarios || null;
      });

      onError((queryError) => {
          loading.value = false;
          error.value = queryError;
          toast.error(queryError.message || 'Error al recuperar los datos');
      });

      // Mutation para eliminar usuario
      const { mutate: deleteUsuarioMutation } = useMutation(DELETE_USUARIO);

      const deleteUsuario = (usuario) => {
          console.log(usuario);
          if (confirm(`¿Estás seguro de que deseas eliminar al usuario "${usuario.nombre}"?`)) {
              deleteUsuarioMutation({ usuarioId: usuario.usuarioId })
                  .then(() => {
                      toast.success('Usuario eliminado correctamente');
                      refetch();
                  })
                  .catch((mutationError) => {
                      toast.error(mutationError.message || 'Error al eliminar el usuario');
                  });
          }
      };

      // Función para formatear la fecha
      const formatDate = (dateString) => {
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          return new Date(dateString).toLocaleDateString('es-ES', options);
      };

      // Computed property para filtrar usuarios
      const filteredUsers = computed(() => {
          if (!result.value || !result.value.items) return [];
          if (!searchTerm.value) return result.value.items;

          const term = searchTerm.value.toLowerCase();

          return result.value.items.filter((usuario) => {
              return (
                  usuario.nombre.toLowerCase().includes(term) ||
                  usuario.correo.toLowerCase().includes(term) ||
                  (usuario.entidad && usuario.entidad.nombre.toLowerCase().includes(term)) ||
                  (usuario.rol && usuario.rol.rol1.toLowerCase().includes(term))
              );
          });
      });

      return {
          result,
          loading,
          error,
          formatDate,
          deleteUsuario,
          searchTerm,
          filteredUsers,
      };
  },
};
</script>

<style scoped>

.container {   
margin-left: 8%;
margin-top:10%;
}

.titulo {  
  margin-bottom: 20px;

}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* Estilos para la barra de búsqueda */
.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 50px;
  border: 1px  #ccc;
  border-radius: 5px;
  background-color: #d9e9f8;
  font-size: 16px;
  color: black;
}

.search-bar::placeholder {
  color: #888;
  opacity: 1; /* Asegura que el placeholder sea visible en todos los navegadores */
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

thead {
  background-color: #0069d9;
}


th {
  padding: 12px;
  border: 1px solid #ddd;
  color: white;
  text-align: left;
}

td {
  padding: 12px;
  border: 1px solid #ddd;
  vertical-align: middle;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}


p {
  text-align: center;
  font-size: 18px;
  color: #555;
}

/* Estilos para los botones */
.btn {
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.btn-edit {
  background-color: #0b5ed7;
  margin-right: 5px;
}

.btn-edit:hover {
  background-color: #0d49a3;
}

.btn-delete {
  background-color: #f44336;
}

.btn-delete:hover {
  background-color: #e53935;
}

/* Alineación de botones en la celda de acciones */
.acciones-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 600px) {
  th,
  td {
      padding: 8px;
  }

  h1 {
      font-size: 24px;
  }

  .btn {
      padding: 4px 8px;
      font-size: 12px;
  }

  .search-bar {
      padding: 8px;
      font-size: 14px;
  }
}
</style>