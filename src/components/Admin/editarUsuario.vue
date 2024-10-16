<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <h2 class="text-center">Editar Usuario</h2>
        <form @submit.prevent="submitForm" v-if="!loading">
          <div class="mb-3">
            <label for="nombre" class="form-label d-flex">Nombre*</label>
            <input type="text" class="form-control" id="nombre" v-model="formData.nombre" required>
          </div>
          

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="rol" class="form-label d-flex">Rol*</label>
              <select class="form-select" id="rol" v-model="formData.rol" required>
                <option value="Evaluador">Evaluador</option>
                <option value="Inspector">Inspector</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label for="correo" class="form-label d-flex">Correo*</label>
            <input type="email" class="form-control" id="correo" v-model="formData.correo" required>
          </div>


          <div class="text-center">
            <button type="submit" class="btn btn-primary w-50" :disabled="updateLoading">
              {{ updateLoading ? 'Actualizando...' : 'Modificar' }}
            </button>
          </div>
        </form>
        <div v-else class="text-center">
          <p>Cargando datos del usuario...</p>
        </div>
        <div v-if="message" :class="['alert', message.type === 'success' ? 'alert-success' : 'alert-danger', 'mt-3']">
          {{ message.text }}
        </div>
      </div>
    </div>
    <panel-principal />
  </div>
</template>

<script>
import { ref, onMounted, watch, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PanelPrincipal from './panel-principal.vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default {
  components: {
    PanelPrincipal,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const usuarioId = route.params.id;

    const formData = reactive({
      nombre: '',
      rol: '',
      estado: '',
      correo: '',
      empresa: ''
    });

    const message = ref(null);

    const GET_USUARIO = gql`
      query getUsuario ($userId: Int!){
    usuarios(where: { usuarioId: {eq:$userId}}) {
  items {
    correo
    entidadId
    estado
    fechaCreacion
    nombre
    rolId
    usuarioId
  }
}
}
`;

    const { onResult ,loading, error} = useQuery(GET_USUARIO, { userId: 44 } );
    onResult((response)=>{
      console.log(response.data.usuarios.items[0]);
      response.data.usuarios.items.forEach((usuario) => {
        formData.value.nombre = usuario.nombre;
        formData.value.correo = usuario.correo;
        formData.value.rol = usuario.rolId;
      });
    });
  
    
    

    const UPDATE_USUARIO = gql`
      mutation updateUsuario($usuarioId: Int!, $input: UsuarioInput!) {
        updateUsuario(usuarioId: $usuarioId, input: $input) {
          usuario {
            usuarioId
            nombre
            correo
            estado
            rolId
            entidad {
              nombre
            }
          }
        }
      }
    `;

    const { mutate: updateUsuario, loading: updateLoading, error: updateError } = useMutation(UPDATE_USUARIO);

    const submitForm = async () => {
      message.value = null;
      try {
        const result = await updateUsuario({
          variables: {
            usuarioId,
            input: {
              nombre: formData.value.nombre,
              correo: formData.value.correo,
              rolId: formData.value.rol,
              estado: formData.value.estado,
              entidadNombre: formData.value.empresa
            }
          }
        });
        console.log( result);
        message.value = { type: 'success', text: 'Usuario actualizado exitosamente' };
        // Opcional: redirigir a la lista de usuarios después de una actualización exitosa
        // router.push('/listaUsuarios');
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
        message.value = { type: 'error', text: 'Error al actualizar usuario: ' + error.message };
      }
    };

    return {
      formData,
      submitForm,
      loading,
      updateLoading,
      message
    };
  }
};
</script>


<style scoped>
.container {
  margin-left: 8%;
  margin-top:10%
}
h2 {
  font-weight: 500;
  margin-bottom: 20px;
}
.form-label {
  font-weight: 500;
  color: #333;
}
input, select {
  background-color: #f1f1f1;
}
input::placeholder {
  color: #bbb;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 5px;
}
button:hover {
  background-color: #0056b3;
}
@media (max-width: 768px) {
  .container {
      padding: 20px;
  }
}
</style>