<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-6">
                <h2 class="text-center">Agregar Producto</h2>

                <!-- Form to add the product -->
                <form @submit.prevent="submitForm">
                    <!-- Nombre Input -->
                    <div class="mb-3">
                        <label for="nombre" class="form-label d-flex">Nombre</label>
                        <input type="text" class="form-control" id="nombre" v-model="formData.nombre" required />
                    </div>

                    <!-- Marca Input -->
                    <div class="mb-3">
                        <label for="marca" class="form-label d-flex">Marca</label>
                        <input type="text" class="form-control" id="marca" v-model="formData.marca" required />
                    </div>

                    <!-- Origen Input -->
                    <div class="mb-3">
                        <label for="origen" class="form-label d-flex">Origen</label>
                        <input type="text" class="form-control" id="origen" v-model="formData.origen" required />
                    </div>

                    <!-- Envase Primario Input -->
                    <div class="mb-3">
                        <label for="envasePrimario" class="form-label d-flex">Envase Primario</label>
                        <input type="text" class="form-control" id="envasePrimario" v-model="formData.envasePrimario" required />
                    </div>

                    <!-- Material Envase Input -->
                    <div class="mb-3">
                        <label for="materialEnvase" class="form-label d-flex">Material de Envase</label>
                        <input type="text" class="form-control" id="materialEnvase" v-model="formData.materialEnvase" required />
                    </div>

                    <!-- Estado Selection with v-select -->
                    <div class="mb-3">
                        <label for="estado" class="form-label d-flex">Estado</label>
                        <v-select
                            :options="estadoOptions"
                            v-model="formData.estado"
                            label="label"
                            :reduce="estado => estado.value"
                            placeholder="Seleccione un estado"
                        ></v-select>
                    </div>

                    <!-- Riesgo Categoria Selection with v-select -->
                    <div class="mb-3">
                        <label for="riesgoCategoriaId" class="form-label d-flex">Riesgo Categoría</label>
                        <v-select
                            :options="categorias"
                            v-model="formData.riesgoCategoriaId"
                            label="nombre"
                            :reduce="categoria => categoria.bpmCategoriaId"
                            placeholder="Seleccione una categoría"
                        ></v-select>
                    </div>

                    <!-- Riesgo Subcategoria Selection with v-select -->
                    <div class="mb-3">
                        <label for="riesgoSubCategoriaId" class="form-label d-flex">Riesgo Subcategoría</label>
                        <v-select
                            :options="subcategorias"
                            v-model="formData.riesgoSubCategoriaId"
                            label="nombre"
                            :reduce="subcategoria => subcategoria.bpmSubcategoriaId"
                            placeholder="Seleccione una subcategoría"
                        ></v-select>
                    </div>

                    <!-- Nacional checkbox -->
                    <div class="mb-3 form-check" style="display: flex; justify-content: left; gap: 10px">
                        <input type="checkbox" class="form-check-input" id="nacional" v-model="formData.nacional" />
                        <label class="form-check-label" for="nacional">Nacional</label>
                    </div>

                    <!-- Un ingrediente checkbox -->
                    <div class="mb-3 form-check" style="display: flex; justify-content: left; gap: 10px">
                        <input type="checkbox" class="form-check-input" id="unIngrediente" v-model="formData.unIngrediente" />
                        <label class="form-check-label" for="unIngrediente">Un Ingrediente</label>
                    </div>

                    <!-- Submit Button -->
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary w-50">Agregar Producto</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Including panel-solicitante component -->
        <panelSolicitante />
    </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_CATEGORIAS, GET_SUBCATEGORIAS } from '../../controllers/graphql/queries/solicitanteQueries';
import { ADD_PRODUCTO } from '../../controllers/graphql/mutations/solicitante/solicitanteMutations';
import { useToast } from 'vue-toastification';
import panelSolicitante from './panelSolicitante.vue';
import router from '../../router/router';
import { useAuthStore } from '../../stores/authStore';

export default {
    components: {
        panelSolicitante,
    },
    setup() {
        const authStore = useAuthStore();
        const formData = ref({
            nombre: '',
            marca: '',
            origen: '',
            estado: 'Activo',
            envasePrimario: '',
            materialEnvase: '',
            riesgoCategoriaId: null,
            riesgoSubCategoriaId: null,
            nacional: false,
            usuarioId: null,
            estadoFisicoId: 0,
            presentaciones: "",
            unIngrediente: false,
            productoEntidades: [],
        });

        const estadoOptions = [
            { label: 'Activo', value: 'Activo' },
            { label: 'Inactivo', value: 'Inactivo' }
        ];

        onMounted(() => {
            formData.value.usuarioId = authStore.userId;
        });

        const toast = useToast();
        const subcategorias = ref([]);
        const categorias = ref([]);

        // Fetch risk subcategories
        const { result: subcategoriasResult, loading: loadingSubcategorias } = useQuery(GET_SUBCATEGORIAS, {
            skip: 0,
            take: 50,
        });
        watch(
            () => subcategoriasResult.value,
            (newValue) => {
                if (newValue && newValue.bpmSubcategoria && newValue.bpmSubcategoria.items) {
                    subcategorias.value = newValue.bpmSubcategoria.items;
                }
            },
            { immediate: true }
        );

        // Fetch Categories
        const { result: categoriasResult, loading: loadingCategorias } = useQuery(GET_CATEGORIAS, {
            skip: 0,
            take: 50,
        });
        watch(
            () => categoriasResult.value,
            (newValue) => {
                if (newValue && newValue.bpmCategoria && newValue.bpmCategoria.items) {
                    categorias.value = newValue.bpmCategoria.items;
                }
            },
            { immediate: true }
        );

        // TODO: Query estados fisicos

        // Mutation to add a product
        const { mutate: addProductoMutation } = useMutation(ADD_PRODUCTO);
        const submitForm = async () => {
            try {
                const response = await addProductoMutation({
                    input: { ...formData.value },
                });
                if (response.data.addProducto.producto) {
                    toast.success('Producto agregado exitosamente');
                    router.push('/solicitante/lista-productos');
                } else {
                    toast.error('Error al agregar el producto');
                }
            } catch (error) {
                toast.error('Error al agregar el producto');
                console.error('Error adding product:', error);
            }
        };

        return {
            formData,
            submitForm,
            subcategorias,
            categorias,
            loadingSubcategorias,
            estadoOptions,  // Added estado options for v-select
        };
    },
};
</script>

<style scoped>
.container {
    margin-top: 50px;
}

h2 {
    margin-bottom: 20px;
}

.form-label {
    font-weight: bold;
}

.text-center {
    margin-top: 20px;
}

.btn {
    padding: 10px 20px;
    font-size: 16px;
}
</style>
