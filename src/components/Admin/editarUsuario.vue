<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <h2 class="text-center">Editar Usuario</h2>
        <!-- Form to edit the user -->
        <form @submit.prevent="submitForm">
          <!-- Name Input -->
          <div class="mb-3">
            <label for="nombre" class="form-label d-flex">Nombre*</label>
            <input
              type="text"
              class="form-control"
              id="nombre"
              v-model="formData.nombre"
              required
            />
          </div>

          <!-- Role Selection -->
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="rol" class="form-label d-flex">Rol*</label>
              <select
                class="form-select"
                id="rol"
                v-model="formData.rol"
                required
              >
                <option value="3">Inspector</option>
                <option value="4">Evaluador</option>
                <!-- Ensure the roles match your backend's rolId values (1, 2, etc.) -->
              </select>
            </div>
          </div>

          <!-- Email Input -->
          <div class="mb-3">
            <label for="correo" class="form-label d-flex">Correo*</label>
            <input
              type="email"
              class="form-control"
              id="correo"
              v-model="formData.correo"
              required
            />
          </div>

          <!-- Submit Button -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary w-50">
              Modificar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Including panel-principal component -->
    <panel-principal />
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import PanelPrincipal from "./panel-principal.vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useToast } from "vue-toastification";

const GET_USUARIO = gql`
  query getUsuario($userId: Int!) {
    usuarios(where: { usuarioId: { eq: $userId } }) {
      items {
        correo
        entidadId
        estado
        nombre
        rolId
        usuarioId
      }
    }
  }
`;

const UPDATE_USUARIO = gql`
  mutation editarUsuario($usuarioId: Int!, $input: UpdateUsuarioInput!) {
    updateUsuario(usuarioId: $usuarioId, input: $input) {
      usuario {
        usuarioId
        nombre
        correo
        rolId
        estado
      }
    }
  }
`;

export default {
  components: {
    PanelPrincipal,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const usuarioId = ref(null);

    const formData = reactive({
      nombre: "",
      rol: "",
      correo: "",
    });

    const message = ref(null);
    let loading, error, updateLoading, updateError, onResult;

    onMounted(() => {
      usuarioId.value = parseInt(route.params.userId);

      const queryResult = useQuery(GET_USUARIO, { userId: usuarioId.value });
      onResult = queryResult.onResult;
      loading = queryResult.loading;
      error = queryResult.error;

      onResult((response) => {
        if (
          !loading.value &&
          response.data &&
          response.data.usuarios &&
          response.data.usuarios.items.length > 0
        ) {
          const usuario = response.data.usuarios.items[0];
          if (usuario) {
            formData.nombre = usuario.nombre;
            formData.correo = usuario.correo;
            formData.rol = usuario.rolId;
          }
        } else if (loading.value) {
          console.log("Cargando data...");
        } else {
          console.error("Falló la carga de datos:", error.value);
        }
      });
    });

    const { mutate: editarUsuario } = useMutation(UPDATE_USUARIO);
    const toast = useToast();
    const submitForm = () => {
      // Depuración: Verifica si el usuarioId es correcto antes de enviar la mutación
      console.log("Enviando mutación con usuarioId:", usuarioId.value);

      editarUsuario({
        usuarioId: usuarioId.value,  // Asegúrate de que este valor se envía correctamente
        input: {
          nombre: formData.nombre,
          correo: formData.correo,
          rolId: formData.rol,
          password: "1234", // Contraseña por defecto o dinámica
          estado: "true", // Esto puede ser dinámico dependiendo de tu lógica
        },
      })
        .then(() => {
          toast.success("Usuario Modificado exitosamente");
          router.push("/listaUsuarios");
        })
        .catch((error) => {
          console.error(
            "Error al modificar usuario:",
            error.networkError ? error.networkError.result.errors : error
          );
          // Mostrar error completo para depuración
          console.log(JSON.stringify(error, null, 2));
          toast.error("Error al modificar usuario: ${error.message}");
        });
    };

    return {
      formData,
      submitForm,
      loading,
      updateLoading,
      message,
      editarUsuario,
    };
  },

};
</script>

<style scoped>
.container {
  margin-left: 8%;
  margin-top: 10%;
}
h2 {
  font-weight: 500;
  margin-bottom: 20px;
}
.form-label {
  font-weight: 500;
  color: #333;
}
input,
select {
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