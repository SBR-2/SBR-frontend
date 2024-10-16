<template>
    <!-- Agregar un div envolvente para todo el contenido -->
    <div class="main-container">
      <div class="container">
        <div class="row justify-content-center mt-5">
          <div class="col-md-6">
            <h2 class="text-center">Crear Usuario</h2>
            <form @submit.prevent="crearUsuarioHandler">
              <div class="mb-3">
                <label for="nombre" class="form-label d-flex">Nombre*</label>
                <input type="text" class="form-control" id="nombre" v-model="userData.nombre" required>
              </div>
  
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="rol" class="form-label d-flex">Rol*</label>
                  <select class="form-select" id="rol" v-model="userData.rolId" required>
                    <option value="3">Evaluador</option>
                    <option value="2">Inspector</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="estado" class="form-label d-flex">Estado*</label>
                  <select class="form-select" id="estado" v-model="userData.estado" required>
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>
              </div>
  
              <div class="mb-3">
                <label for="correo" class="form-label d-flex">Correo*</label>
                <input type="email" class="form-control" id="correo" v-model="userData.correo" required>
              </div>
  

  
              <div class="text-center">
                <button type="submit" class="btn btn-primary w-50">Crear</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <!-- PanelPrincipal envuelto en el mismo contenedor -->
      <panel-principal />
    </div>
  </template>
  
  <script>
  import PanelPrincipal from './panel-principal.vue';
  import { ref } from 'vue';
  import { gql } from 'graphql-tag';
  import { useMutation } from '@vue/apollo-composable';
  import { useToast } from 'vue-toastification';
  import router from '../../router/router';
  
  // Mutación para crear un nuevo usuario
  const CREAR_USUARIO_MUTATION = gql`
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
  
  export default {
    components: {
      PanelPrincipal,
    },
    setup() {
      const userData = ref({
        nombre: '',
        correo: '',
        rolId: '', // Valor por defecto
      });
  
      const { mutate: crearUsuario } = useMutation(CREAR_USUARIO_MUTATION);
      const toast = useToast();
  
      const crearUsuarioHandler = () => {
      const entidadId = parseInt(userData.value.entidadId); // Convertimos a número
  

  crearUsuario({input:{
      nombre: userData.value.nombre,
      correo: userData.value.correo,
      rolId: '3', // Aseguramos que sea un númeroq
      entidadId: 1, // Solo si es válido
      password: '1234',
  }})
    .then(() => {
      toast.success('Usuario creado exitosamente');
      router.push('/listausuario.vue'); // Redirigir a la lista de usuarios
    })
    .catch((error) => {
      console.error("Error al crear usuario:", error);
      toast.error(`Error al crear usuario: ${error.message}`);
    });
};
  
      return {
        userData,
        crearUsuarioHandler,
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
      margin-left: 8%;
      margin: 10% auto;
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